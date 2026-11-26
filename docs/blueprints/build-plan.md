---
status: active
retired:
---

# Build plan

A blueprint, written to build from before the code exists. Once the code is built, it's retired,
and the status above says so.

The sequence to build the game in, phase by phase. Each phase names the spec items it builds, the
tests it adds, and what shows it's done. The engine comes first and is finished and tested before
the server and client use it (AD-6, AD-7, TR-1). Each phase builds only on the phases before it.

## Phase 1. Project setup

Set up one npm workspace with three packages, engine, server and client (AD-6, AD-10), all in
TypeScript strict mode (AD-1). Put them in `packages/engine`, `packages/server` and
`packages/client`, where the lint config expects them. Each package's tsconfig extends
`tsconfig.base.json`, and only the client's adds the browser's types. Add Vitest (AD-4), Vite for
the client (AD-3), React (AD-2) and Node for the server (AD-5).

Add a root `tsconfig.json` that references the three packages, and add `tsc -b` and Vitest to
`make check`.

Done when `tsc` passes, an empty Vitest test passes in each part, and the client and server both
build.

## Phase 2. Tile model and shape catalog

Write the tile type and the data file from the shape catalog blueprint (TD-5), and have the
engine load it. Write rotation (FR-27) from the rotation table in that blueprint.

Add tests for:

- Every shape follows FR-23, FR-24, FR-25, TR-5 and TR-6.
- Every shape weight is greater than zero (TR-7), and the weights add up to 100 (TR-8).
- Rotating any shape four times gives back the original, and one rotation moves edges, segments,
  border positions and hostiles together.

Done when these tests pass.

## Phase 3. Board and placement

Build the board with no boundary (FR-44), the check that a space has an adjacent tile (FR-41), edge
matching (FR-42), outpost spacing (FR-43), and a fit check that finds every empty space and
rotation where a tile can be laid.

Add tests for:

- Edge matching, including outpost edges against road, wasteland, bastion and outpost.
- An outpost in any of the eight surrounding spaces of another outpost, corners included, is
  rejected.
- A bastion in a space diagonal to an outpost is allowed (the scenario under FR-43).
- A space with no adjacent tile, or touching only at a corner, is rejected.

Done when these tests pass.

## Phase 4. Tile generator

Build the tile generator with the random number generator passed in (TD-2): pick only shapes that
fit (FR-32), weight the pick (FR-33), roll for a hostile (FR-34), pick its kind (FR-35) and its
segment (FR-36), and hand the tile over in its reference orientation (FR-37). The fit check ignores
hostiles, since no rule in F-SEC-6 looks at them. Say so in a comment on the fit check.

Add tests for:

- On a range of boards, every drawn tile has at least one legal placement.
- On a board built so only a few shapes fit, every draw is one of them.
- On an open board, a large number of draws comes out close to the shape weights.
- An outpost never gets a hostile.
- The same seed and the same actions give the same tiles (TR-2).

Done when these tests pass.

## Phase 5. Features

Join segments into features as tiles are laid (FR-28, FR-29, FR-30), with wasteland segments
joined by the facing table in the shape catalog blueprint. Carry hostiles with their feature
(FR-31), detect finished bastions, roads and outposts (FR-56, FR-57, FR-58), and count tiles
(FR-62, FR-63).

Add tests for:

- Bastions, roads and wastelands joining across several tiles, and two segments on one tile
  staying apart.
- A finished bastion, including one with a tile that's all bastion.
- A finished road for each kind of end: a junction, a gate, an outpost, and a loop.
- A finished outpost, including one finished by a tile at its corner.
- A road that ends at an outpost leaves the outpost's tile out of its count.

Done when these tests pass and the shape catalog blueprint is retired.

## Phase 6. Enforcers, control and points

Build deploying (FR-52, FR-53, FR-54, FR-55), scoring what a tile finished (FR-59, FR-60), the
points table (FR-61), control (FR-64, FR-65, FR-66, FR-67, FR-68) and returning enforcers (FR-69).

Add tests for:

- Deploying onto a feature that has an enforcer anywhere along it is rejected, after the new tile
  joins it.
- A hostile doesn't block deploying, including one on the tile just laid.
- Ties split and round down, with the hostile side as one side and its share lost.
- The hostile side winning alone gives no one points.
- Outpost points with bastion segments on some of its surrounding tiles.
- An enforcer deployed, scored and returned in the same turn.

Done when these tests pass.

## Phase 7. Garrisons

Build garrison choices (FR-70, FR-71, FR-72, FR-73), garrisons as judges (FR-74), garrisons
staying on the board (FR-75), garrison bonuses (FR-76, FR-77) and cancelling hostiles (FR-78).

Add tests for:

- A player can leave a garrison whoever wins the bastion, including when the hostile side wins.
- Choices are asked in turn order from the current player, one player at a time, across several
  bastions finished by one tile.
- A garrison bonus for a road scored by the same tile that finished the bastion, and none for a
  road scored before the garrison was left.
- A road that loops back to a bastion with a garrison pays once and cancels one hostile.
- A road between two bastions that each hold a garrison cancels two hostiles.
- A garrison whose owner has no enforcer on the feature cancels nothing.

Done when these tests pass.

## Phase 8. Bounties

Build the bounty table (FR-80) and the bounty step (FR-79, FR-81, FR-82, FR-83, FR-84, FR-85,
FR-86).

Add tests for:

- Each bounty's condition, met and not met.
- A bounty met by two players in the same bounty step is split.
- All Hands is checked only for the current player.
- A garrison bonus doesn't count as points from a road.
- A cancelled raider camp still counts for Clear the Road.

Done when these tests pass.

## Phase 9. Setup, turns and the end of the game

Build the engine's entry point (TD-1): starting a game (FR-14, FR-15, FR-16, FR-17, FR-18, FR-19,
FR-20, FR-21), turns (FR-40, FR-45, FR-51), stuck hands (FR-46, FR-47, FR-48, FR-49, FR-50), the
draw step and the empty tile supply (FR-38), the end of the game (FR-87, FR-88), final
scoring (FR-89, FR-90) and winners (FR-91).

Add tests for:

- A stuck hand discards, draws a replacement and ends the turn.
- After the tile supply runs out, players play out their hands, every player gets the same number
  of turns, and the game ends when every hand is empty.
- Wasteland points at the end, including a bastion that the hostile side took and one bastion
  counting for two wastelands.
- Shared wins.
- A full game: a fixed seed and a fixed set of actions play to the end with no illegal state and
  the right final points totals, and replaying them gives the same state (TR-3).

Done when these tests pass and the engine has a test for every rule it carries out (CS-2).

## Phase 10. Server

Build the server on Socket.IO (AD-8), with one room per game (TD-7). Keep each game in memory
(AD-11) as its game record (AD-9, TR-4).

When the host starts a game, take its game setup from the host's browser (TD-12), check it (FR-11,
FR-13, FR-105, FR-106, FR-126), and start holding the game. Give the host the game's player links
once (FR-109), and no controls after that (FR-110). Build player links (FR-111, FR-112, FR-113,
TR-13, TR-14). Check every action with the engine (TR-9), make every draw on the server (TR-10), and
send each player a filtered player view after every action (TR-11, TR-12, TD-8). Wait for each
choice with no time limit (FR-115). Remove games when their game lifetime passes (FR-116, FR-117,
FR-131, TD-11).

Add tests for:

- The server rejects an illegal action.
- A connection opened with one player's link can't act for another player (TR-14).
- No player view holds another player's hand, the seed or the random number generator's state.
- Two games on one server stay separate (FR-2).
- Opening a player link a second time moves the game to the newest connection.
- A game is removed once its game lifetime passes, and its player links then get the
  no-longer-available message.

Done when these tests pass and a script can set up a game, open two of its player links on
separate connections and play a turn.

## Phase 11. Client

Build the setup screen, which keeps the game setup in the host's browser until start (TD-12) (FR-5,
FR-123, FR-104, FR-124, FR-125, FR-107, FR-12), labeling the host's own row "You". Build the game
screen (FR-92, FR-93, FR-94, FR-95, FR-97, FR-98, FR-99, FR-100, FR-101, FR-102, FR-103, FR-118,
FR-119, FR-127, FR-128) with tiles rendered as SVG (TD-10). Show the host the way any other player
is shown (FR-130). Show the player their options through the engine (TD-9). End each turn on its
own, with no undo (FR-120, FR-121). Show the rejection message when the server rejects an action
(FR-129).

Use these player colors (FR-107):

| Color | Hex |
|---|---|
| Red | `#d62728` |
| Blue | `#1f77b4` |
| Green | `#2ca02c` |
| Orange | `#ff7f0e` |
| Purple | `#9467bd` |
| Teal | `#17becf` |
| Pink | `#e377c2` |
| Brown | `#8c564b` |

Done when two people, each in their own desktop browser, can set up a game, open their player
links, and play to the end with the winners and the final board shown.

## Phase 12. Container

Have the server serve the built client (AD-13). Write the container build, build the image and run
it (AD-12).

Done when two people, each in their own desktop browser, play a game to the end through the
running container.

## Retiring this blueprint

Retire it when every phase is done: archive this doc with its date and a line saying it isn't kept
up to date. The tests the phases list live in the code from then on.
