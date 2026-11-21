# Immortal Zenith Farm Bot (lokal, AutoHotkey)

Automatisiert deinen beschriebenen Ablauf:

1. Im Hauptbildschirm HP prüfen (`>= 90%`).
2. `Combat` -> `Fight Beasts`.
3. Gewähltes Tier + Monster anklicken.
4. Kampf mit `Basic Attack` oder `Technique`.
5. Nach Attacke HP prüfen:
   - Wenn HP `>= 30%` und Siegbildschirm sichtbar: `Again`.
   - Wenn HP `< 30%`: nach Sieg `Return`, dann auf Regeneration warten, danach neu starten.

## Voraussetzungen

- Windows
- [AutoHotkey v2](https://www.autohotkey.com/)
- Spiel in **fenster-/borderless-Modus** mit stabiler Auflösung/UI-Scale

## Dateien

- [farm-bot.ahk](C:/Immortal Zenith Guide/bot/farm-bot.ahk): Bot-Logik
- [farm-bot.ini](C:/Immortal Zenith Guide/bot/farm-bot.ini): Konfiguration
- Optional: `bot/templates/*.png` für robustes Image-Matching

## Start

1. [farm-bot.ini](C:/Immortal Zenith Guide/bot/farm-bot.ini) anpassen (siehe Kalibrierung).
2. Doppelklick auf [farm-bot.ahk](C:/Immortal Zenith Guide/bot/farm-bot.ahk).
3. Hotkeys:
   - `F8`: Start/Pause
   - `F9`: Stop
   - `F10`: Mausposition + Pixel-Farbe anzeigen (zum Kalibrieren)

## Kalibrierung (wichtig)

Ohne Kalibrierung funktionieren HP-Erkennung und Klicks nicht zuverlässig.

### 1) HP-Balken-Rechtecke setzen

In [farm-bot.ini](C:/Immortal Zenith Guide/bot/farm-bot.ini):

- `HomeHpBarX/Y/W/H`
- `CombatHpBarX/Y/W/H`

Nutze `F10`, um Koordinaten/Farben zu ermitteln.

### 2) HP-Füllfarbe setzen

- `HpFillColor` auf die tatsächliche Balkenfüllfarbe setzen (RGB Hex).
- `ColorTolerance` bei Bedarf erhöhen/verringern.

### 3) Buttons konfigurieren

Du hast zwei Wege:

- **Koordinaten-Fallback**: `CombatTabX/Y`, `FightBeastsX/Y`, `TierButtonX/Y`, `MonsterButtonX/Y`, `BasicAttackButtonX/Y`, `TechniqueButtonX/Y`, `AgainButtonX/Y`, `ReturnButtonX/Y`
- **Template-Matching (empfohlen)**: kleine PNG-Snippets in `bot/templates/` ablegen und `*Template`-Felder setzen.

### 4) Wenn sich Monster-Buttons vertikal verschieben

Nutze diese Werte in [farm-bot.ini](C:/Immortal Zenith Guide/bot/farm-bot.ini):

- `MonsterScrollSteps` (wie weit die Liste nach unten gescrollt wird)
- `MonsterYOffsetScan` (zusätzliche vertikale Offsets, die der Bot beim Monster-Klick ausprobiert)
- `MonsterClickCheckDelayMs` (kurze Wartezeit nach jedem Klick-Versuch)

Damit bleibt die Auswahl stabil, auch wenn sich durch UI/Drop-Panel die Y-Position leicht verschiebt.

### 5) Attack-Frequenz

Für schnellere Angriffe:

- `AttackDelayMs` senken (z. B. 180–260)
- `MinActionGapMs` senken (z. B. 70–120)

## Hinweise

- Fokus sollte auf dem Spiel liegen, damit Eingaben sicher landen.
- Bei UI-Änderungen (Patch, Auflösung, Scale) neu kalibrieren.
- Nutze zuerst kurze Tests mit konservativen Werten (`AttackMode=basic`, hohe `UiDelayMs`).
