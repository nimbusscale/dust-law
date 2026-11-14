# Technical spec

The technical spec for Dust Law: what the system must achieve that a player wouldn't see (`TR`, in
GEARS), and the architecture (`AD`) and design (`TD`) decisions that new code could follow or break
from anywhere, each with its reason. Decisions carried out in one place in the code are comments
there instead.

## T-SEC-1. Terms

- **Engine.** The code that holds all game rules and game state.
- **Server.** The program that runs the engine and holds each game's state.
- **Client.** The React app in each player's browser.
- **Action.** One thing a player asks the game to do, such as lay a tile, deploy an enforcer,
  choose a garrison or discard.
- **Move log.** A game's actions, in the order the engine accepted them.
- **Seed.** The number a game's random number generator starts from.
- **Shape.** A complete tile layout: what's on each edge, and how things connect inside the tile.
- **Catalog.** The full list of shapes, each with a weight that sets how often it's drawn.
- **Segment.** One separate piece of a bastion or road inside a tile.
- **Position.** One of a tile's eight border positions. Each edge is split into two halves, where a
  road would cross it.
- **Region.** One wasteland inside a tile, given as the positions it covers and the bastion
  segments it borders.
- **Reference orientation.** The rotation a shape is written in, with north at the top.

## T-SEC-2. Architecture decisions

**AD-1.** TypeScript in strict mode for the engine, the server and the client.

*Why:* unknown. Ask the owner.

**AD-2.** The code has three parts: the engine, the server and the client.

*Why:* the game logic is meant to be deterministic and fully unit-tested, separate from the
server and the UI.

**AD-3.** The engine has no network code, no DOM and no React.

*Why:* the game logic is meant to be deterministic and fully unit-tested, separate from the
server and the UI.

**AD-4.** The engine is a function from a game state and an action to either a rejection or a new
game state.

*Why:* unknown. Ask the owner.

**AD-5.** The server holds the one true copy of each game's state, and checks every action with the
engine before applying it.

*Why:* a modified client can then never make an illegal move or change the state on its own.

**AD-6.** The server and the browsers talk over WebSockets, using Socket.IO.

*Why:* a WebSocket stays open, so the server can push new state to every player the moment anyone
acts (FR-72). Socket.IO adds rooms, which keep games apart (FR-73), and automatic reconnecting.

**AD-7.** React for the client.

*Why:* unknown. Ask the owner.

**AD-8.** Node for the server.

*Why:* unknown. Ask the owner.

## T-SEC-3. Engine

**TR-1.** When a game is replayed from its seed and its move log, the game shall reach the same
state after every action.

*Why:* a game can then be reproduced exactly for tests and bug reports.

**TD-1.** All of a game's randomness comes from one seeded random number generator, which is
passed in to the engine. That covers turn order, bounty choice and tile generation.

*Why:* TR-1 needs every random choice to depend only on the seed and the moves.

**TD-2.** The seed is set when a game starts, and kept with the game.

*Why:* without it, a game can't be replayed.

**TD-3.** The tile generator is part of the engine.

*Why:* unknown. Ask the owner.

**TD-4.** The catalog lives in a data file that the engine loads.

*Why:* shapes are data, and are expected to change after playtesting without changes to game logic.

**TD-5.** The shape weights, the chance a tile gets a hostile, and the number of random tries
before the generator falls back to only fitting shapes are settings, not values in code.

*Why:* they're starting values, expected to change after playtesting.

**TR-2.** The catalog shall hold at least one shape with a bastion edge, one with a road edge, and
one with a wasteland edge.

*Why:* there is always an empty space with only one neighbor, such as the space above the topmost
tile. Some shape can then fill such a space against any neighbor: one with a bastion edge, one
with a road edge, or one with a wasteland edge, which also matches an outpost. That is what lets every draw fit (FR-14).

**TR-3.** Where a road segment touches only one edge, the segment shall end at a junction or at a
bastion segment on the same tile.

*Why:* a road can never just stop in the middle of nothing.

**TR-4.** Where a position is on a road or wasteland edge, the position shall belong to exactly one
region on its tile.

**TR-5.** The outpost shape shall hold no other feature.

**TR-10.** Where a shape isn't the outpost shape, the shape shall hold no outpost.

**TR-6.** The weight of each shape shall be positive.

**TR-11.** The weights in the catalog shall add up to 100.

*Why:* each weight then reads as a rough percentage of draws.

## T-SEC-4. Server

**TR-7.** The game shall reject every illegal action, whatever a client sends.

*Scenario:* Given it's Ana's turn, when a modified client sends an action that lays a tile on a
space where it doesn't fit, then the server rejects it and the state doesn't change.

**TR-8.** The browser of each player shall receive no hand but that player's own.

*Scenario:* Given Ana and Ben in a game, when the server sends Ben any update, then it holds Ben's
tiles and only a count of Ana's.

**TR-9.** The client shall never decide what tile a player draws.

*Why:* unknown. Ask the owner.

**TD-6.** The server filters each game's state for each player before sending it.

*Why:* TR-8 can't rest on the client hiding what it was sent.

**TD-7.** Each game is one Socket.IO room.

*Why:* rooms keep each game's messages apart, which covers running several games at once (FR-73).

**TD-8.** The server stores each game as its seed and its move log. The current state is what the
engine gives when it replays that log.

*Why:* a game is then easy to reproduce, test and debug. Saving a game, if games are ever saved,
needs only that log.

## T-SEC-5. Client

**TD-9.** The client holds no rules logic of its own beyond what it needs to show options. It may
call the shared engine to show legal moves. The server's answer always wins.

*Why:* unknown. Ask the owner.

**TD-10.** Tiles are drawn in code, as SVG or CSS. There are no image files.

*Why:* the game has no art assets (F-SEC-2).

**TD-11.** Vite builds the client.

*Why:* unknown. Ask the owner.

## T-SEC-6. Code standards

**TD-12.** Vitest for all tests.

*Why:* unknown. Ask the owner.

**TD-13.** The engine has unit tests for every rule in the functional spec that it carries out.
Each such requirement's scenarios are among its cases.

*Why:* the game logic is meant to be fully unit-tested, and correctness matters more than
polish for this game.

**TD-14.** One engine test plays a full game from a fixed seed and a fixed list of moves to the end,
and checks that no state on the way is illegal and that the final scores are right.

*Why:* unknown. Ask the owner.

**TD-15.** The server has tests for TR-7 and TR-8.

*Why:* unknown. Ask the owner.

**TD-16.** Use common, well-maintained libraries. Avoid obscure or abandoned packages.

*Why:* unknown. Ask the owner.

## T-SEC-7. Commands

Work is done when the strict type check passes, every test passes, and the client and the server
both build.
