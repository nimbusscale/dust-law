# The tile model, the shape catalog, the tile generator and the check command

A blueprint, written to build from before the code exists. Once the code is built, it's retired:
see `references/blueprint.md` in the writing-project-docs skill.

It covers four pieces of the first build:

- the engine's tile model, the types every tile and shape is made of
- the shape catalog, the data file the engine loads (TD-4)
- the tile generator, the engine code that creates each tile it deals (FR-23, TR-2)
- the check command that says work is done

The terms are the ones in the functional spec (F-SEC-1) and the technical spec (T-SEC-1).

## Where each part goes when the code is built

| Part of this blueprint | Its home once built |
|---|---|
| The tile model | Comments on the tile and shape types |
| The shape catalog and the hostile chance | The data file the engine loads (TD-4) |
| The catalog rules | Tests on the catalog, each citing its rule's reason where it isn't obvious |
| Creating a tile, and the start tile | A comment on the generator function |
| The check command | A pointer in a Commands section of the technical spec |

## The tile model

### Edges

Each tile has four edges: north, east, south and west. Each edge is one of:

- bastion
- road
- wasteland
- outpost, found only on the outpost shape, which is outpost on all four edges

Which edges match is FR-29. When a road edge touches an outpost edge, the road ends at the
outpost. When a wasteland edge touches an outpost edge, the wasteland stops there.

### Pieces of a feature inside a tile

A tile lists the separate pieces of each feature on it. A piece is a **segment**.

- **Bastion segments.** Each has an id (`b0`, `b1`, ...) and the edges it covers. Two bastion
  segments on the same tile aren't connected to each other.
- **Road segments.** Each lists the edges it touches.
  - A road segment with two edges runs through the tile, either straight or around a bend.
  - A road segment with one edge ends inside the tile. It must say where it ends: at the tile's
    junction, or at one named bastion segment. A road never just stops in the middle of nothing.
- **Wasteland regions.** Each is a list of positions in the eight-position model below. Each region
  also lists the bastion segments it borders, which wasteland scoring (FR-74) and garrisons
  (FR-64) need.
- **Outpost.** A flag. The outpost shape has no other features.

### The eight-position model

Each edge is split into two halves, at the point where a road would cross it. That gives eight
border positions, going clockwise from the top left:

```
        NW   NE
     +---------+
  WN |         | EN
     |         |
  WS |         | ES
     +---------+
        SW   SE
```

- Positions on a bastion edge are never part of a wasteland region.
- Every position on a wasteland edge or a road edge belongs to exactly one region on its tile.
- Regions on two tiles that share an edge join where their positions face each other across that
  edge. For example, a tile's NE position faces the SE position of the tile above it, and its NW
  faces that tile's SW.

### Hostiles

A tile carries at most one hostile (FR-24). It sits in one segment:

- a gang stronghold in a bastion segment
- a raider camp on a road segment
- a mutant warren in a wasteland region

### Rotation

Shapes are written in one reference rotation, with north at the top. A tile can be rotated by 90°,
180° or 270°. Rotating moves everything together: edges, segments, regions, positions and any
hostile. Rotating a shape four times gives back the original.

## The shape catalog

All shapes are shown with north at the top. The weights add up to 100, so each one reads as a
rough percentage of the tiles created.

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

### The hostile chance

The hostile chance starts at 15%. Like the weights, it's a starting value that playtesting is
expected to change (TD-4).

## Catalog rules

The catalog must always follow these rules. They're what make creating a tile safe. Each becomes a
test on the catalog.

1. **Every edge type has a shape.** At least one shape has a bastion edge, one has a road edge, and
   one has a wasteland edge.

   *Why:* this is what makes FR-23 always possible. Some empty space always touches only one tile,
   such as the space just above the topmost tile on the board (FR-21). A tile there needs only one
   matching edge. That edge is a bastion, road, wasteland or outpost edge, and a wasteland edge
   also matches an outpost edge. So some shape always fits, and the list of shapes that fit is never
   empty.
2. **No dead-end roads.** Every one-edge road segment ends at a junction or a bastion segment on the
   same tile.
3. **Wasteland positions are complete.** Every position on a road edge or a wasteland edge belongs
   to exactly one wasteland region.
4. **Outposts stand alone.** The outpost shape has no other features, and no other shape has an
   outpost.
5. **Weights are positive and add up to 100.**

## Creating a tile

When the engine deals a tile, the generator does this:

1. **Find the shapes that fit.** A shape fits if there's at least one empty space next to the board,
   and at least one rotation, where F-SEC-5 lets it be laid.
2. **Pick a shape** at random from the ones that fit, by their weights. A shape that doesn't fit
   right now has no chance of being picked.
3. **Roll for a hostile,** at the hostile chance.
   - If the tile gets one, pick a hostile type at random from the types the shape can hold. A gang
     stronghold needs a bastion segment, a raider camp a road segment, and a mutant warren a
     wasteland region. Each type the shape can hold is equally likely.
   - Then pick one segment of that kind at random.
   - The outpost shape has nowhere to put a hostile, so it never gets one.
4. **Hand it over** in the reference rotation. The player picks the rotation when they lay it.

A hostile never changes whether a tile fits, so the fit check looks only at shapes.

Every random choice here comes from the game's seeded random number generator (TD-2). A tile also
depends on the board, because of the fit check, so the same seed gives the same tiles only if the
players take the same actions.

### The start tile

The start tile (FR-14) is the `open` shape with no hostile. The engine lays it before any player's
turn. It doesn't come from the tile supply and doesn't use the generator.

## The check command

One command says work is done. It runs `tsc` in strict mode and all the tests, and builds both the
client and the server. Once it exists, the technical spec gets a Commands section that names it.
