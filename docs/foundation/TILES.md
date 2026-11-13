# Dust Law — Tile Generation

This document describes what a tile is and how the game creates one each time a player draws. `RULES.md` covers how tiles are played. Where the two disagree on a rule, `RULES.md` wins.

## Summary

There is no fixed deck. Each draw works like this:

1. Pick a **shape** from the shape catalog at random, using each shape's weight.
2. Maybe add a **hostile** to one of the tile's features.
3. Check that the tile **fits** somewhere on the board right now. If it doesn't, throw it away and start over.

A shape is a complete tile layout: what's on each edge and how things connect inside the tile. The catalog below is the full list of shapes. Every tile in the game is one of these shapes, in one of four rotations, with or without a hostile.

## The Tile Model

### Edges

Each tile has four edges: north, east, south, and west. Each edge is one of:

- **bastion**
- **road**
- **wasteland**
- **outpost** (only on the outpost tile, which is outpost on all four edges)

Two tiles side by side must have matching edges where they touch:

| This edge | Can touch |
|---|---|
| bastion | bastion |
| road | road, outpost |
| wasteland | wasteland, outpost |
| outpost | road, wasteland |

When a road edge touches an outpost, that road ends at the outpost. When a wasteland edge touches an outpost, the wasteland stops there.

### Features inside a tile

A tile lists the separate pieces of each feature it contains. A piece is called a **segment**.

- **Bastion segments.** Each has an id (`b0`, `b1`, ...) and the edges it covers. Two bastion segments on the same tile are not connected to each other.
- **Road segments.** Each lists the edges it touches.
  - A road segment with **two edges** runs through the tile, either straight or around a bend.
  - A road segment with **one edge** ends inside the tile. It must say where it ends: at a **junction**, or at a specific **bastion segment** (a gate). A road can never just stop in the middle of nothing.
- **Wasteland regions.** Described with the eight-position model below. Each region also lists which bastion segments it borders. Ranger scoring needs that.
- **Outpost.** A flag. The outpost tile has no other features.

A **junction** is the point where three or four road segments meet in the middle of a tile. Each of those segments ends there. The rules call this a crossroads.

### The eight-position model

Each edge is split into two halves, where a road would cross it. That gives eight border positions, going clockwise from the top-left:

```
        NW   NE
     +---------+
  WN |         | EN
     |         |
  WS |         | ES
     +---------+
        SW   SE
```

A wasteland region is a list of these positions. Positions on a bastion edge are never part of a wasteland region. Every position on a wasteland or road edge belongs to exactly one region on its tile.

Regions on two neighboring tiles join when their positions face each other across a shared edge. For example, the NE position of one tile faces the SE position of the tile above it, and NW faces SW.

### Hostiles

A tile can carry at most one hostile. It sits in one segment:

- A **gang stronghold** sits in a bastion segment.
- A **raider camp** sits on a road segment.
- A **mutant warren** sits in a wasteland region.

### Rotation

Shapes are written in one reference orientation. A player can rotate a tile by 90°, 180°, or 270°. Rotation moves everything together: edges, segments, regions, positions, and any hostile.

## The Shape Catalog

All shapes are shown with north at the top. Weights add up to 100, so each one reads as a rough percentage of draws.

### Open shapes

| Id | Name | N | E | S | W | Inside | Weight |
|---|---|---|---|---|---|---|---|
| `open` | Open ground | wasteland | wasteland | wasteland | wasteland | One wasteland region covering all eight positions. | 8 |
| `outpost` | Outpost | outpost | outpost | outpost | outpost | The outpost fills the tile. No other features. | 7 |

### Road shapes

| Id | Name | N | E | S | W | Inside | Weight |
|---|---|---|---|---|---|---|---|
| `road-straight` | Straight road | road | wasteland | road | wasteland | Road runs north to south. Two wasteland regions: east side and west side. | 11 |
| `road-bend` | Bend | road | road | wasteland | wasteland | Road bends from north to east. Two regions: the small corner inside the bend (NE, EN) and everything else. | 9 |
| `road-junction` | Junction | road | road | road | wasteland | Three roads end at a junction. Three regions: NE corner, SE corner, and the west side. | 5 |
| `road-crossroads` | Crossroads | road | road | road | road | Four roads end at a junction. Four corner regions. | 2 |

### Bastion shapes

| Id | Name | N | E | S | W | Inside | Weight |
|---|---|---|---|---|---|---|---|
| `wall` | Wall | bastion | wasteland | wasteland | wasteland | One bastion segment. One wasteland region (east, south, west), bordering the bastion. | 7 |
| `wall-road` | Wall and road | bastion | road | wasteland | road | Road runs east to west below the bastion. Two regions: the strip between bastion and road (borders the bastion), and the south side. | 5 |
| `wall-bend` | Wall and bend | bastion | road | road | wasteland | Road bends from east to south. Two regions: the SE corner inside the bend, and the rest, which borders the bastion. | 4 |
| `wall-gate` | Gate | bastion | wasteland | road | wasteland | Road enters from the south and ends at the bastion. Two regions, west and east of the road, both bordering the bastion. | 5 |
| `wall-junction` | Wall and junction | bastion | road | road | road | Three roads end at a junction below the bastion. Three regions: the north strip (borders the bastion), the SE corner, and the SW corner. | 3 |
| `corner` | Corner bastion | bastion | bastion | wasteland | wasteland | One bastion segment covering north and east. One region (south, west), bordering the bastion. | 7 |
| `corner-bend` | Corner and bend | bastion | bastion | road | road | Road bends from south to west. Two regions: the SW corner inside the bend, and the outer strip, which borders the bastion. | 4 |
| `corner-gate` | Corner gate | bastion | bastion | road | wasteland | Road enters from the south and ends at the bastion. Two regions: SE (between road and bastion) and the west side. Both border the bastion. | 3 |
| `wide` | Wide bastion | bastion | bastion | wasteland | bastion | One bastion segment covering north, east, and west. One region on the south edge, bordering the bastion. | 4 |
| `wide-gate` | Wide gate | bastion | bastion | road | bastion | Road enters from the south and ends at the bastion. Two regions, SW and SE, both bordering the bastion. | 3 |
| `full` | Full bastion | bastion | bastion | bastion | bastion | One bastion segment covering all four edges. No wasteland. | 1 |
| `band` | Bastion band | bastion | wasteland | bastion | wasteland | One bastion segment running north to south through the middle. Two regions, east and west, both bordering the bastion. | 4 |
| `gatehouse` | Gatehouse | bastion | road | bastion | road | Bastion runs north to south. Roads enter from east and west, and each ends at the bastion. Four regions (EN, ES, WS, WN), all bordering the bastion. | 2 |
| `twin-walls` | Twin walls | bastion | wasteland | bastion | wasteland | Two separate bastion segments, north and south. One region running east to west between them, bordering both. | 3 |
| `twin-corner` | Corner walls | bastion | bastion | wasteland | wasteland | Two separate bastion segments, north and east. One region (south, west, and the middle), bordering both. | 3 |

The road shapes total 27, the open shapes 15, and the bastion shapes 58.

### Catalog rules

The catalog must always follow these rules. They are what make generation safe.

1. **Every edge type has a shape.** At least one shape has a bastion edge, one has a road edge, and one has a wasteland edge. See *Why a tile always fits* for why this matters.
2. **No dead-end roads.** Every one-edge road segment ends at a junction or a bastion segment on the same tile.
3. **Wasteland positions are complete.** Every position on a road or wasteland edge belongs to exactly one wasteland region.
4. **Outposts stand alone.** The outpost shape has no other features, and no other shape has an outpost.

## Generating a Tile

When a player draws, the game does this:

1. **Pick a shape** at random, using the weights.
2. **Roll for a hostile.** Each tile has a **15%** chance of a hostile.
   - If it gets one, pick a hostile type at random from the types the shape can hold. A gang stronghold needs a bastion segment, a raider camp needs a road segment, and a mutant warren needs a wasteland region. Each allowed type is equally likely.
   - Then pick one segment of that kind at random.
   - The outpost has nowhere to put a hostile, so it never gets one.
3. **Check the fit.** The tile fits if there is at least one empty space next to the board, and at least one rotation, where the placement is legal under `RULES.md`. That includes the edge-matching table above and the rule that outposts can't touch each other.
4. **If it fits,** the player gets it, in the reference orientation. The player picks the rotation when they play it.
5. **If it doesn't fit,** throw it away and go back to step 1. A tile that's thrown away here doesn't count against the tile supply.

After **50** tries in a row with no fit, stop rolling at random. Instead, pick at random among only the shapes that fit, using their weights. This keeps a draw from looping forever on an awkward board.

### Why a tile always fits

There is always some empty space with only one neighbor. For example, the space directly above the topmost tile on the board. Nothing is above it, so its east and west neighbors are empty too. That space only needs a tile with one matching edge.

The edge it needs to match is a bastion, road, wasteland, or outpost edge. Catalog rule 1 guarantees a shape with a bastion, road, or wasteland edge. A wasteland edge also matches an outpost. So some shape always fits, and the fallback in step 5 always finds one.

### The start tile

The start tile is the `open` shape with no hostile. The game places it at the center of the board before anyone draws. It does not come out of the tile supply and does not use the generator.

## Randomness and Replays

All randomness comes from the game's single seeded random number generator. That covers shapes, hostiles, and the fallback pick.

A draw also depends on the board, because of the fit check. So the same seed gives the same tiles only if players make the same moves. A replay needs the seed plus every move in order.

In a networked game, the server runs the generator. A player's own browser never decides what they draw.

## Tuning

The weights, the 15% hostile chance, and the 50-try limit are starting values. They are expected to change after playtesting. Keep them in data or config, not hardcoded, so they can be changed without touching game logic.

The catalog itself should live in a data file that the engine loads. This document is the source for that file. When the two disagree, update one to match the other.

## Testing

The generator needs tests that cover at least:

- **Catalog checks.** Every shape follows the four catalog rules. Every shape's weight is positive, and the weights add up to 100.
- **Rotation.** Rotating a shape four times gets back the original. Edges, segments, regions, and hostiles all move together.
- **Every draw fits.** On a range of boards, every generated tile has at least one legal placement.
- **The fallback works.** On a board built so that random picks keep failing, a draw still returns a tile that fits.
- **Weights hold.** On an open board where everything fits, a large number of draws comes out close to the weights.
- **Determinism.** The same seed and the same moves give the same tiles.
