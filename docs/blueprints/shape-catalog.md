---
status: active
retired:
---

# Shape catalog data

A blueprint, written to build from before the code exists. Once the code is built, it's retired,
and the status above says so.

This is the content of the data file that TD-5 calls for: every shape, its segments, its weight,
and the hostile chance. It also holds what the tile type records, how a shape rotates, and which
border positions face each other across a shared edge. Building the data file, the tile type, the
rotation code and the code that joins wasteland segments retires this blueprint. From then on
those are the only home of these facts.

## How to read the tables

- Each shape is written in its reference orientation, with north at the top.
- Edge types: `B` bastion, `R` road, `W` wasteland, `O` outpost.
- Border positions are named as in the technical spec's Terms: NW, NE, EN, ES, SE, SW, WS, WN.
- A road segment written `N–S` runs through the tile between those two edges. One written
  `S → b0` touches one edge and ends at bastion segment `b0` (a gate). One written `E → J` ends at
  the tile's junction.
- Each wasteland segment is a list of border positions, followed by the bastion segments it
  borders, if any.

## The tile type

A tile records the edge type of each of its four edges, and its segments:

- A bastion segment has an id and the edges it covers.
- A road segment lists the edges it touches. A road segment with one edge also names the junction
  or the bastion segment it ends at.
- A wasteland segment lists its border positions and the bastion segments it borders.
- An outpost is a flag on the tile.

## Settings

| Setting | Value |
|---|---|
| Hostile chance | 15% |

## Open shapes

| Id | N | E | S | W | Bastion segments | Road segments | Wasteland segments | Weight |
|---|---|---|---|---|---|---|---|---|
| `open` | W | W | W | W | none | none | {NW, NE, EN, ES, SE, SW, WS, WN} | 8 |
| `outpost` | O | O | O | O | none (outpost flag) | none | none | 7 |

## Road shapes

| Id | N | E | S | W | Bastion segments | Road segments | Wasteland segments | Weight |
|---|---|---|---|---|---|---|---|---|
| `road-straight` | R | W | R | W | none | N–S | {NE, EN, ES, SE}; {SW, WS, WN, NW} | 11 |
| `road-bend` | R | R | W | W | none | N–E | {NE, EN}; {ES, SE, SW, WS, WN, NW} | 9 |
| `road-junction` | R | R | R | W | none | N → J; E → J; S → J | {NE, EN}; {ES, SE}; {SW, WS, WN, NW} | 5 |
| `road-crossroads` | R | R | R | R | none | N → J; E → J; S → J; W → J | {NE, EN}; {ES, SE}; {SW, WS}; {WN, NW} | 2 |

## Bastion shapes

| Id | N | E | S | W | Bastion segments | Road segments | Wasteland segments | Weight |
|---|---|---|---|---|---|---|---|---|
| `wall` | B | W | W | W | b0: N | none | {EN, ES, SE, SW, WS, WN} borders b0 | 7 |
| `wall-road` | B | R | W | R | b0: N | E–W | {EN, WN} borders b0; {ES, SE, SW, WS} | 5 |
| `wall-bend` | B | R | R | W | b0: N | E–S | {ES, SE}; {EN, SW, WS, WN} borders b0 | 4 |
| `wall-gate` | B | W | R | W | b0: N | S → b0 | {SW, WS, WN} borders b0; {SE, ES, EN} borders b0 | 5 |
| `wall-junction` | B | R | R | R | b0: N | E → J; S → J; W → J | {EN, WN} borders b0; {ES, SE}; {SW, WS} | 3 |
| `corner` | B | B | W | W | b0: N, E | none | {SE, SW, WS, WN} borders b0 | 7 |
| `corner-bend` | B | B | R | R | b0: N, E | S–W | {SW, WS}; {SE, WN} borders b0 | 4 |
| `corner-gate` | B | B | R | W | b0: N, E | S → b0 | {SE} borders b0; {SW, WS, WN} borders b0 | 3 |
| `wide` | B | B | W | B | b0: N, E, W | none | {SE, SW} borders b0 | 4 |
| `wide-gate` | B | B | R | B | b0: N, E, W | S → b0 | {SW} borders b0; {SE} borders b0 | 3 |
| `full` | B | B | B | B | b0: N, E, S, W | none | none | 1 |
| `band` | B | W | B | W | b0: N, S | none | {EN, ES} borders b0; {WS, WN} borders b0 | 4 |
| `gatehouse` | B | R | B | R | b0: N, S | E → b0; W → b0 | {EN}, {ES}, {WS}, {WN}, each borders b0 | 2 |
| `twin-walls` | B | W | B | W | b0: N; b1: S | none | {EN, ES, WS, WN} borders b0 and b1 | 3 |
| `twin-corner` | B | B | W | W | b0: N; b1: E | none | {SE, SW, WS, WN} borders b0 and b1 | 3 |

The open shapes total 15, the road shapes 27 and the bastion shapes 58, for 100 in all (TR-8).

## Rotating a shape

A 90° clockwise rotation moves each edge and each border position as this table shows. Apply it
two or three times for 180° and 270°.

| From | N | E | S | W | NW | NE | EN | ES | SE | SW | WS | WN |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| To | E | S | W | N | EN | ES | SE | SW | WS | WN | NW | NE |

## Facing border positions

Wasteland segments on adjacent tiles join where their border positions face each other across the
shared edge (FR-29). This follows from how the technical spec's Terms name the border positions.

| Shared edge | Facing pairs |
|---|---|
| A tile's north edge and the south edge of the tile north of it | NE faces SE, NW faces SW |
| A tile's east edge and the west edge of the tile east of it | EN faces WN, ES faces WS |

## Retiring this blueprint

- Write the data file from the tables above, and have the engine load it (TD-5).
- Move the reading notes above into a comment at the top of the data file, or into the type that
  describes its format.
- Put the rotation table in the engine's rotation code, with a test that four rotations give back
  the original shape.
- Write the tile type from "The tile type" above.
- Put the facing table in the code that joins wasteland segments, with a test for each pair.
- Archive this doc with its date and a line saying it isn't kept up to date.
