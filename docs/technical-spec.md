# Technical spec

The technical spec: what the system must achieve that a user wouldn't see (`TR`, in GEARS), the
architecture (`AD`) and design (`TD`) decisions, each with its reason, and the code standards
(`CS`), that new code could follow or break from anywhere. Decisions carried out in one place in
the code are comments there instead.

## T-SEC-1. Terms

- **Action.** One choice a player sends that changes a game, such as laying a tile, deploying an
  enforcer or deciding on a garrison.
- **Action log.** A game's actions, in the sequence they were applied.
- **Border position.** One of the eight half-edges of a tile where wasteland can reach the tile's
  border: NW, NE, EN, ES, SE, SW, WS and WN, clockwise from the top-left. The first letter names
  the edge and the second names the half.
- **Client.** The part of the code that runs in each player's browser. It shows the game and sends
  the player's actions.
- **Link code.** The random code in a player link that says which game and player it opens.
- **Engine.** The part of the code that holds the game rules and the game state.
- **Player view.** The copy of a game's state that the server sends to one player.
- **Random number generator.** The seeded source of random numbers for one game.
- **Seed.** The number a game's random number generator starts from.
- **Server.** The part of the code that runs games and talks to the players' clients.
- **Tile generator.** The part of the engine that creates each drawn tile.

## T-SEC-2. Architecture decisions

**AD-1.** TypeScript in strict mode for the engine, the server and the client.

**AD-2.** React for the client.

**AD-3.** Vite builds the client.

**AD-4.** Vitest runs the tests.

**AD-5.** Node runs the server.

**AD-6.** The code is split into three parts: the engine, the server and the client.

*Why:* it keeps the game logic apart from the network and the UI, so it can be tested on its own
(TR-1).

**AD-7.** The engine holds all game rules and the game state, including the tile generator, and
has no network code, no DOM and no React.

*Why:* the game logic must run and be tested without the server or the client (TR-1).

**AD-8.** The server and the clients talk through Socket.IO, over WebSockets.

*Why:* a WebSocket stays open, so the server can push a new player view the moment anyone acts
(FR-4). Socket.IO adds rooms and automatic reconnecting. Rooms keep each game separate (FR-2), and
plain WebSockets would mean writing both ourselves.

**AD-9.** The server keeps each game as its seed plus its action log, and gets the current state
by replaying the log through the engine.

*Why:* it makes any game easy to reproduce, test and debug. Saving a game only needs that list.

**AD-10.** The code is one npm workspace with three packages: engine, server and client.

*Why:* the server and the client both import the engine (TD-9).

**AD-11.** Games live only in the server's memory.

## T-SEC-3. Code standards

**CS-1.** Use common, well-maintained libraries, never obscure or abandoned packages.

**CS-2.** Every rule the engine carries out has a unit test.

## T-SEC-4. Engine

**TR-1.** The engine shall run and be tested on its own, without the server or the client.

**TR-2.** The engine shall take every random choice in a game from that game's one random number
generator, including the turn order, the bounty picks and every choice the tile generator makes.

**TR-3.** When the engine replays a game's seed and action log, the engine shall produce the same
game state every time.

**TR-4.** When a game starts, the server shall pick the game's seed.

**TD-1.** The engine takes a game state and an action, and either rejects the action or returns
the resulting game state. It meets TR-1 and TR-3.

**TD-2.** The random number generator is passed into the engine, which uses no other source of
randomness. It meets TR-2 and TR-3.

## T-SEC-5. Tile model and shape catalog

**TD-3.** A tile records the edge type of each of its four edges and its segments. A bastion
segment has an id and the edges it covers. A road segment lists the edges it touches, and a road
segment with one edge also names the junction or the bastion segment it ends at. A wasteland
segment lists its border positions and the bastion segments it borders. An outpost is a flag on
the tile. It meets FR-22, FR-25 and FR-28.

**TD-4.** Wasteland segments on adjacent tiles join where their border positions face each other
across the shared edge: NE faces SE and NW faces SW across a north edge, and EN faces WN and ES
faces WS across an east edge. It meets FR-29.

**TR-5.** The shape catalog shall put each border position on a road edge or a wasteland edge in
exactly one wasteland segment of its shape, and no border position on a bastion edge in any.

**TR-6.** The shape catalog shall include at least one shape with a bastion edge, one with a road
edge and one with a wasteland edge.

*Why:* an empty space with only one adjacent tile needs a shape with one matching edge. FR-44
makes sure such a space always exists, and a wasteland edge also matches an outpost, so this is
what lets FR-32 always find a shape that fits.

**TR-7.** The shape catalog shall give each shape a weight greater than zero.

**TR-8.** The shape weights in the shape catalog shall add up to 100.

*Why:* each weight then reads as a rough percentage of draws.

**TD-5.** The shape catalog, the shape weights and the hostile chance are kept in a data file that
the engine loads, not in code. It meets FR-22, FR-33 and FR-34.

*Why:* the weights and the hostile chance are expected to change after playtesting, and this lets
them change without touching game logic.

**TD-6.** The tile generator's fit check looks only at shapes, never at hostiles. It meets FR-32.

*Why:* a hostile never changes whether a tile fits.

## T-SEC-6. Server

**TR-9.** When the server receives an action, the server shall apply it only if the rules in
F-SEC-3, F-SEC-6, F-SEC-7, F-SEC-8 and F-SEC-11 allow it.

*Why:* a client someone has changed must not be able to make an illegal move.

**TR-10.** The server shall make every draw itself, never letting a client decide what a player
draws.

**TR-11.** The server shall never send a client a game's seed or the state of its random number
generator.

*Why:* anyone who has either could predict every draw.

**TR-12.** The server shall put in each player view only the hand contents that FR-95 lets that
player see.

**TR-13.** The server shall give each player link a random link code long enough that no one can
open a player's game by guessing or changing a link.

**TR-14.** The server shall apply an action only for the player whose player link opened the
connection it came on.

**TD-11.** The game lifetime is a server setting, 24 hours by default. It meets FR-116.

*Why:* it can then be changed after playtesting without a code change.

**TD-7.** Each game is its own Socket.IO room. It meets FR-2.

*Why:* a room sends each update only to the players in that game, which keeps games separate.

**TD-8.** After the server applies an action, it sends a new player view to every player in the
game. It meets FR-4.

## T-SEC-7. Client

**TD-9.** The client imports the engine and uses it to highlight where a tile fits and to offer
only legal choices, with no rules logic of its own. The server's check under TR-9 always has the
final say. It meets FR-97 and FR-99.

**TR-15.** When the server rejects an action, the client shall tell the player the move wasn't
legal and return them to that choice.

**TD-10.** Tiles are drawn as SVG in code, with no image files. It meets FR-92.
