export function validateTree(entries) {
  if (!Array.isArray(entries) || !entries.length)
    throw new Error("Soul Tree data contains no nodes.");
  const nodes = new Map();
  for (const node of entries) {
    if (
      typeof node.id !== "string" ||
      nodes.has(node.id) ||
      !["cultivation", "combat", "exploration", "crafting"].includes(
        node.tree,
      ) ||
      !Number.isInteger(node.tier) ||
      node.tier < 0 ||
      !Number.isFinite(node.col) ||
      !Number.isInteger(node.maxRanks) ||
      node.maxRanks < 0 ||
      !Number.isSafeInteger(node.baseCost) ||
      node.baseCost <= 0 ||
      !Number.isSafeInteger(node.costStep ?? 0) ||
      (node.costStep ?? 0) < 0 ||
      typeof node.name !== "string" ||
      typeof node.description !== "string" ||
      !/^\/assets\/soul-tree\/[a-zA-Z0-9._-]+\.webp$/.test(node.localImage)
    )
      throw new Error(`Invalid Soul Tree node: ${node.id ?? "(unknown)"}`);
    nodes.set(node.id, node);
  }
  for (const node of entries) {
    if (!Array.isArray(node.prereqs ?? []))
      throw new Error(`Invalid prerequisites: ${node.name}`);
    for (const req of node.prereqs ?? []) {
      const parent = nodes.get(req.nodeId);
      if (
        !parent ||
        parent.tree !== node.tree ||
        parent.tier > node.tier ||
        !Number.isInteger(req.ranks) ||
        req.ranks < 1
      )
        throw new Error(`Invalid prerequisite for ${node.name}`);
    }
  }
  return nodes;
}

export function missingPrerequisites(node, ranks, nodes) {
  return (node.prereqs ?? [])
    .filter((req) => (ranks[req.nodeId] ?? 0) < req.ranks)
    .map((req) => ({ ...req, name: nodes.get(req.nodeId).name }));
}

export function nextCost(node, rank) {
  const cost = node.baseCost + (node.costStep ?? 0) * rank;
  if (!Number.isSafeInteger(cost))
    throw new RangeError("Plan cost exceeds the supported range.");
  return cost;
}

export function fitTreeScale(availableWidth, canvasWidth, zoomFactor = 1) {
  if (
    !Number.isFinite(availableWidth) ||
    availableWidth <= 0 ||
    !Number.isFinite(canvasWidth) ||
    canvasWidth <= 0 ||
    !Number.isFinite(zoomFactor) ||
    zoomFactor <= 0 ||
    zoomFactor > 1.5
  )
    throw new RangeError("Invalid Soul Tree dimensions or zoom factor.");
  return Math.min(1.35, (availableWidth / canvasWidth) * zoomFactor);
}

export function validatePlan(ranks, nodes) {
  if (!ranks || typeof ranks !== "object" || Array.isArray(ranks))
    throw new Error("Saved Soul Tree plan has an invalid format.");
  for (const [id, rank] of Object.entries(ranks)) {
    const node = nodes.get(id);
    if (
      !node ||
      !Number.isSafeInteger(rank) ||
      rank < 0 ||
      (node.maxRanks !== 0 && rank > node.maxRanks)
    )
      throw new Error(`Invalid saved rank for ${id}.`);
    nextCost(node, rank);
    if (rank && missingPrerequisites(node, ranks, nodes).length)
      throw new Error(`Saved plan is missing a prerequisite for ${node.name}.`);
  }
  planCost(ranks, nodes);
}

export function planCost(ranks, nodes) {
  let total = 0;
  for (const [id, rank] of Object.entries(ranks)) {
    const node = nodes.get(id);
    total +=
      rank * node.baseCost + ((node.costStep ?? 0) * rank * (rank - 1)) / 2;
    if (!Number.isSafeInteger(total))
      throw new RangeError("Plan cost exceeds the supported range.");
  }
  return total;
}

export function canRemoveRank(node, ranks, nodes) {
  const rank = ranks[node.id] ?? 0;
  if (!rank) return false;
  return ![...nodes.values()].some(
    (child) =>
      (ranks[child.id] ?? 0) > 0 &&
      (child.prereqs ?? []).some(
        (req) => req.nodeId === node.id && rank - 1 < req.ranks,
      ),
  );
}
