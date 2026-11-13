# Dust Law — Design Requirements

This document lists what the software must do and the constraints it must follow. It does not prescribe how to build each part.

- `RULES.md` is the source of truth for gameplay.
- `TILES.md` is the source of truth for the tile model and tile generation.
- Where this document disagrees with either of those on a rule, the other document wins.

## Purpose

Build a playable, networked, browser-based version of Dust Law for 2 to 5 players. Each player plays from their own browser.

The game is a scenario for practicing issue-driven development with coding agents. It only needs to be good enough for a small group to play and test. Clarity and correctness matter more than polish.

## Goals

- Every rule in `RULES.md` is implemented.
- Tiles are generated as described in `TILES.md`.
- 2 to 5 players can play one game together, each from their own browser, over a network.
- The game logic is deterministic and fully unit-tested, separate from the server and the UI.

## Non-Goals

- No computer opponents.
- No matchmaking. Players join a game they've been invited to.
- No art assets or animation beyond tiles drawn in code.
- No mobile app. A desktop browser is the target.

## Tech Stack

- **TypeScript in strict mode** everywhere: engine, server, and client.
- **React** for the client UI.
- **Vite** to build the client. **Vitest** for tests.
- **Node** for the server.
- Use common, well-maintained libraries. Avoid obscure or abandoned packages.
- Draw tiles in code (SVG or CSS). No image files.

## Architecture

The code has three parts.

1. **Engine.** All game rules and game state live here. It has no network code, no DOM, and no React. Given a game state and an action, it either rejects the action or returns the new state. It uses no randomness except through a seeded random number generator that is passed in. It includes the tile generator.
2. **Server.** Runs the engine and holds the one true copy of each game's state. It receives actions from players, checks them with the engine, and sends each player the updated state.
3. **Client.** The React app in each player's browser. It shows the game and sends the player's actions to the server. It holds no rules logic of its own beyond what it needs to show options, such as highlighting where a tile fits.

The engine is shared code. The server uses it to run the game. The client may use it to show legal moves, but the server always has the final say.

### Server requirements

- **The server is in charge.** Every action is checked by the engine on the server. A modified client can't make an illegal move.
- **The server generates tiles.** A client never decides what a player draws.
- **Hidden information stays hidden.** Each player receives their own hand and nobody else's. Other players only see how many tiles each player holds. The server must filter state per player before sending it, not rely on the client to hide it.
- **Everyone sees changes right away.** When any player acts, every player in the game sees the result without refreshing.
- **Several games at once.** The server can run more than one game at the same time, each fully separate.

### Transport: Socket.IO

The server and browsers talk over WebSockets, using the **Socket.IO** library.

- **Why WebSockets:** a WebSocket stays open, so the server can push a new game state to every player the moment anyone moves. That is what "everyone sees changes right away" needs.
- **Why Socket.IO on top:** it has rooms and automatic reconnecting built in. Each game maps to a room, which covers running several games at once. Automatic reconnecting is the base for rejoining a game after a dropped connection.
- **Options we passed on:** plain WebSockets would mean writing rooms and reconnecting ourselves. Regular web requests plus Server-Sent Events (a one-way update stream) are simple, but handle two-way messages less naturally and are less common for games.

## Starting and Joining a Game

- A player creates a game and becomes the host. The host picks the game length (tiles per player, default 20).
- The host shares a way for others to join, such as a link or a short code.
- How players are identified is still to be decided (see *Open Questions*).
- The host starts the game once 2 to 5 players have joined.

## Determinism

- All randomness flows through one seeded random number generator per game. That covers turn order, bounty selection, and tile generation.
- Given the seed and the list of moves in order, a game can be replayed exactly.
- The seed is set when the game starts and is kept with the game, so tests and bug reports can reproduce a game.
- **The server keeps each game as its seed plus its list of moves.** The current state is what you get by replaying those moves through the engine. This is because it makes a game easy to reproduce, test, and debug. It also means saving a game, if we decide to, only needs that list.

## UI Requirements

- A board you can pan and zoom, with the start tile in the center.
- Your hand of three tiles, visible only to you. You can choose a tile and rotate it.
- When you pick a tile, the board shows where it fits. Illegal spots can't be chosen.
- After placing a tile, you can place an enforcer on a legal feature of that tile, or skip.
- A garrison prompt when a bastion you have a judge in is finished.
- A clear message when your hand is stuck, letting you choose a tile to discard.
- A score panel showing every player's score, enforcers left, and tiles in hand, plus whose turn it is.
- The three bounties in play, and who has claimed them.
- Clear feedback when a feature is finished and scored, including garrison bonuses and bounties.
- An end screen with each player's points by category and the winner, including shared wins.

## Testing

Engine tests (Vitest) must cover at least:

- **Placement.** Edge matching, including outpost edges and the rule that outposts can't touch. Rejection of illegal placements.
- **Features.** Joining features across tiles. Finishing bastions, roads, and outposts, including roads that end at outposts, gates, and junctions.
- **Enforcers.** The rule against deploying onto a feature that already has an enforcer, checked across the whole joined feature. Hostiles not blocking deployment.
- **Control and scoring.** Split ties, hostiles as a neutral side, hostiles winning outright, and outpost scoring with bastion neighbors.
- **Garrisons.** Leaving a garrison whoever won, the road bonus including same-turn roads, and cancelling a hostile.
- **Bounties.** Each bounty's condition, and splitting a bounty met by two players on the same turn.
- **Stuck hands and the end of the game.** Discarding when stuck, finishing the last round, and wasteland scoring.
- **Tile generation.** The tests listed in `TILES.md`.
- **A full game.** A fixed seed and a fixed set of moves play to the end with no illegal states and correct final scores.

The server also needs tests showing that it rejects illegal actions and never sends a player another player's hand.

## Definition of Done

- `tsc` passes in strict mode, all tests pass, and the client and server both build.
- Two or more people, each in their own browser, can create a game, join it, and play to the end, with a winner declared.
- Every rule in `RULES.md` works as written.

## Open Questions

These are still to be decided. They will be settled as development gets underway.

- **Player identity and rejoining.** How players are identified, and how they resume or rejoin a game after closing their tab or losing connection. To be decided.
- **Persistence.** Whether games live only in server memory or are saved so they survive a restart, and if saved, where. To be decided.
- **Hosting.** How the game is packaged and deployed, and where it runs for playtesting. To be decided.
