# Technical spec

The technical spec: what the system must achieve that a user wouldn't see (`TR`, in GEARS), and the
architecture (`AD`) and design (`TD`) decisions that new code could follow or break from anywhere,
each with its reason. Decisions carried out in one place in the code are comments there instead.

## T-SEC-1. Terms

The internal terms, the ones a user wouldn't recognize.

**Action.** One choice a player sends to the server, such as laying a tile, deploying an enforcer,
making a garrison choice or discarding a tile.

**Client.** The part of the code that runs in each player's browser.

**Engine.** The part of the code that holds the game rules and game state (AD-3).

**Hostile chance.** The chance that a newly created tile carries a hostile.

**Seed.** The value that starts a game's random number generator.

**Server.** The program the players' browsers connect to, which runs every game (AD-6).

**Shape.** One tile layout: the edge on each side and the features inside. Every tile is a shape
in one of its four rotations, with or without a hostile.

**Shape catalog.** The list of every shape the engine can create a tile from, each with its weight.

**Weight.** How likely the engine is to pick a shape, among the shapes that fit, when it creates a
tile.

## T-SEC-2. Architecture decisions

**AD-1.** TypeScript for all the code: the engine, the server and the client.

**AD-2.** The code has three parts: the engine, the server and the client.

**AD-3.** All game rules and game state live in the engine, the creation of tiles included.

**AD-4.** The engine has no network code, no DOM and no React.

**AD-5.** The engine takes a game state and an action, and either rejects the action or returns the
new game state.

**AD-6.** The server holds the one true copy of each game. It takes each action from the players,
checks it with the engine, and sends each player the updated state.

*Why:* with the engine on the server checking every action, a changed client can't take an action
the rules forbid (TR-1).

## T-SEC-3. Trust between the server and the browsers

What the server keeps from the browsers, and what it never takes from them.

**TR-1.** When the server receives an action, the server shall apply it only if the engine finds it
allowed by the rules in F-SEC-3, F-SEC-5, F-SEC-6, F-SEC-7 and F-SEC-10.

**TR-2.** The server shall create every tile it deals under FR-23, taking no part of it from a
browser.

**TR-3.** The server shall send a game's seed to no browser.

*Why:* anyone with the seed could work out every tile the game will deal.

**TR-4.** The server shall send each player's browser only the hand that FR-76 lets that player
see.

**TD-1.** The client gets any rules logic it needs to show a player their options, such as where a
tile fits (FR-32), from the engine, and has none of its own.

## T-SEC-4. Randomness and replays

How a game's random choices are made, so that any game can be played back.

**TR-5.** When the engine is given a game's seed and its actions in order, the engine shall rebuild
exactly that game's state.

*Why:* tests and bug reports can then reproduce any game.

**TD-2.** All randomness in a game, including the turn order, the bounties picked and the tiles
created, comes from one seeded random number generator per game, which is passed into the engine.

*Why:* a game can be rebuilt from its seed and actions (TR-5) only if every random choice follows
from the seed.

**TD-3.** The server keeps each game as its seed, set when the game starts, and its list of actions
in order. The game's current state is what replaying those actions through the engine gives.

*Why:* it makes a game easy to reproduce, test and debug. Saving a game would also need only that
seed and list.

**TD-4.** The shape catalog, with its weights, and the hostile chance are data that the engine
loads, not values written in its code.

*Why:* the weights and the hostile chance are starting values, expected to change after
playtesting. As data, they can change without touching the game logic.

## T-SEC-5. Server and transport

How the server runs, and how it talks to the browsers.

**TD-5.** Node runs the server.

**TD-6.** The server and the browsers talk over WebSockets.

*Why:* a WebSocket stays open, so the server can push a new game state to every player the moment
anyone acts, as FR-5 needs. Regular web requests with Server-Sent Events, a one-way stream of
updates, handle two-way messages less naturally and are less common for games.

**TD-7.** Socket.IO for the WebSocket connection.

*Why:* it has rooms and automatic reconnecting built in. Each game maps to a room, which covers
running several games at once (FR-4). Automatic reconnecting is the base for rejoining a game after
a dropped connection. Plain WebSockets would mean writing rooms and reconnecting ourselves.

## T-SEC-6. Client

How the client is built and how it shows the game.

**TD-8.** React for the client.

**TD-9.** Vite builds the client.

**TD-10.** The client renders tiles in code, as SVG or CSS, with no image files.

## T-SEC-7. Code standards

Design decisions about how all code is written.

**TD-11.** TypeScript in strict mode, in all the code.

**TD-12.** Common, well-maintained libraries only, not obscure or abandoned packages.

**TD-13.** Vitest for all tests.

**TD-14.** Every rule the engine holds is covered by unit tests on the engine.
