import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { brotliDecompressSync } from "node:zlib";
import * as prettier from "prettier";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "recovered");
const source =
  process.argv.slice(2).find((arg) => arg.toLowerCase().endsWith(".exe")) ??
  String.raw`D:\Program Files (x86)\Steam\steamapps\common\Immortal Zenith Idle to Ascension\immortal-zenith.exe`;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

function readAssets(binary) {
  if (binary.length < 64 || binary.toString("ascii", 0, 2) !== "MZ") {
    throw new Error("Input is not a Windows executable.");
  }
  const pe = binary.readUInt32LE(60);
  if (binary.toString("ascii", pe, pe + 4) !== "PE\0\0") {
    throw new Error("Invalid PE signature.");
  }
  const optional = pe + 24;
  if (binary.readUInt16LE(optional) !== 0x20b) {
    throw new Error("Only 64-bit PE images are supported.");
  }
  const base = binary.readBigUInt64LE(optional + 24);
  const sections = [];
  const table = optional + binary.readUInt16LE(pe + 20);
  for (let i = 0; i < binary.readUInt16LE(pe + 6); i++) {
    const position = table + i * 40;
    sections.push({
      rva: binary.readUInt32LE(position + 12),
      offset: binary.readUInt32LE(position + 20),
      size: binary.readUInt32LE(position + 16),
    });
  }
  function offset(address, length) {
    const rva = address - base;
    for (const section of sections) {
      const relative = rva - BigInt(section.rva);
      if (relative >= 0n && relative + BigInt(length) <= BigInt(section.size)) {
        const result = section.offset + Number(relative);
        if (result + length <= binary.length) return result;
      }
    }
    return -1;
  }

  const assets = new Map();
  // Rust's PHF entries contain two adjacent (pointer, length) slices.
  for (let position = 0; position + 32 <= binary.length; position += 8) {
    const keyLength = binary.readBigUInt64LE(position + 8);
    if (keyLength < 2n || keyLength > 512n) continue;
    const keyOffset = offset(
      binary.readBigUInt64LE(position),
      Number(keyLength),
    );
    if (keyOffset < 0 || binary[keyOffset] !== 47) continue;
    const key = binary
      .subarray(keyOffset, keyOffset + Number(keyLength))
      .toString("utf8");
    if (!/^\/[A-Za-z0-9_./@-]+\.[A-Za-z0-9]+$/.test(key)) continue;
    if (key.split("/").some((part) => part === ".." || part === ".")) {
      throw new Error(`Unsafe embedded path: ${key}`);
    }
    const compressedLength = binary.readBigUInt64LE(position + 24);
    if (compressedLength < 1n || compressedLength > BigInt(binary.length)) {
      continue;
    }
    const dataOffset = offset(
      binary.readBigUInt64LE(position + 16),
      Number(compressedLength),
    );
    if (dataOffset < 0) continue;
    let bytes;
    try {
      bytes = brotliDecompressSync(
        binary.subarray(dataOffset, dataOffset + Number(compressedLength)),
        { maxOutputLength: 128 * 1024 * 1024 },
      );
    } catch (cause) {
      throw new Error(
        `Cannot decode ${key} at table offset ${position.toString(16)}`,
        { cause },
      );
    }
    const asset = {
      path: key,
      tableOffset: position,
      dataOffset,
      compressedBytes: Number(compressedLength),
      bytes: bytes.length,
      sha256: sha256(bytes),
    };
    if (assets.has(key)) {
      throw new Error(`Duplicate embedded asset: ${key}`);
    }
    assets.set(key, { asset, bytes });
  }
  if (!assets.has("/index.html")) {
    throw new Error("No embedded Tauri index.html found.");
  }
  return [...assets.values()].sort((a, b) =>
    a.asset.path.localeCompare(b.asset.path),
  );
}

async function readableBytes(bytes, filepath) {
  const info = await prettier.getFileInfo(filepath);
  if (!info.inferredParser) return bytes;
  let text = bytes.toString("utf8");
  // Large minified expressions may need a second pass to reach stable layout.
  for (let pass = 0; pass < 4; pass++) {
    const formatted = await prettier.format(text, { filepath });
    if (formatted === text) return Buffer.from(formatted);
    text = formatted;
  }
  throw new Error(`Formatting did not stabilize: ${filepath}`);
}

async function main() {
  const binary = await fs.readFile(source);
  const assets = readAssets(binary);
  const sourceHash = sha256(binary);
  if (process.argv.includes("--verify")) {
    const manifest = JSON.parse(
      await fs.readFile(path.join(output, "manifest.json"), "utf8"),
    );
    if (manifest.source.sha256 !== sourceHash) {
      throw new Error("Installed executable has changed since extraction.");
    }
    if (
      JSON.stringify(manifest.assets) !==
      JSON.stringify(assets.map(({ asset }) => asset))
    ) {
      throw new Error("Manifest differs from the executable's asset table.");
    }
    for (const { asset } of assets) {
      const raw = await fs.readFile(
        path.join(output, "raw", ...asset.path.slice(1).split("/")),
      );
      if (sha256(raw) !== asset.sha256) {
        throw new Error(`Raw asset hash mismatch: ${asset.path}`);
      }
      const readablePath = path.join(
        output,
        "readable",
        ...asset.path.slice(1).split("/"),
      );
      const readable = await fs.readFile(readablePath);
      const expected = await readableBytes(raw, readablePath);
      if (!readable.equals(expected)) {
        throw new Error(
          `Readable asset differs from formatting: ${asset.path}`,
        );
      }
    }
    console.log(
      `Verified ${assets.length} raw and readable assets against the installed executable.`,
    );
    return;
  }

  // Never overwrite an earlier recovery; it may contain subsequent analysis.
  await fs.mkdir(output);
  for (const { asset, bytes } of assets) {
    const relative = asset.path.slice(1).split("/");
    const rawPath = path.join(output, "raw", ...relative);
    const readablePath = path.join(output, "readable", ...relative);
    await fs.mkdir(path.dirname(rawPath), { recursive: true });
    await fs.mkdir(path.dirname(readablePath), { recursive: true });
    await fs.writeFile(rawPath, bytes, { flag: "wx" });
    const readable = await readableBytes(bytes, readablePath);
    await fs.writeFile(readablePath, readable, { flag: "wx" });
  }
  await fs.writeFile(
    path.join(output, "manifest.json"),
    JSON.stringify(
      {
        extractedAt: new Date().toISOString(),
        method: "PE64 Rust PHF asset slices; Brotli decompression",
        source: { path: source, bytes: binary.length, sha256: sourceHash },
        assets: assets.map(({ asset }) => asset),
      },
      null,
      2,
    ) + "\n",
    { flag: "wx" },
  );
  console.log(
    `Recovered ${assets.length} assets (${assets.reduce((sum, { asset }) => sum + asset.bytes, 0)} bytes) into ${output}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
