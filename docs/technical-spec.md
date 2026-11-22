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
- **Game record.** A game's game setup, seed and action log.
- **Engine.** The part of the code that holds the game rules and the game state.
- **Player view.** The copy of a game's state that the server sends to one player.
- **Random number generator.** The seeded source of random numbers for one game.
- **Seed.** The number a game's random number generator starts from.
- **Server.** The part of the code that runs games and talks to the players' clients.
- **Tile generator.** The part of the engine that creates each drawn tile.

## T-SEC-2. Architecture decisions

**AD-1.** TypeScript in strict mode for the engine, the server and the client.

*Why:* agents write the code, so it should leave them as few options and as little to interpret as
possible. Strict static types do that. One language also lets the server and the client share the
engine and its types.

**AD-2.** React for the client.

*Why:* it's common and well known, so agents and people can work on the client easily.

**AD-3.** Vite builds the client.

*Why:* it's the usual build tool for React and TypeScript, and needs little setup.

**AD-4.** Vitest runs the tests.

*Why:* it works with Vite and TypeScript with little setup.

**AD-5.** Node runs the server.

*Why:* the server then runs the same TypeScript engine as the client.

**AD-6.** The code is split into three parts: the engine, the server and the client.

*Why:* it keeps the game logic apart from the network and the UI, so it can be tested on its own
(TR-1).

**AD-7.** The engine holds all game rules and the game state, including the tile generator, and
has no network code, no DOM and no React.

*Why:* the game logic must run and be tested without the server or the client (TR-1).

**AD-8.** The server and the clients talk through Socket.IO, over WebSockets.

*Why:* a WebSocket stays open, so the server can push a new player view the moment anyone acts
(FR-4). Socket.IO adds rooms, which keep each game separate (FR-2), and automatic reconnecting,
which helps a player get back into their game (FR-112).

**AD-9.** The server keeps each game as its game record, and gets the current state by replaying
the game record through the engine.

*Why:* it makes any game easy to reproduce, test and debug. Saving a game only needs its game record.

**AD-10.** The code is one npm workspace with three packages: engine, server and client.

*Why:* the server and the client both import the engine.

**AD-11.** Games live only in the server's memory.

*Why:* it's the simplest option, and a game is kept only for its game lifetime.

**AD-12.** The game ships as one container image.

*Why:* it can then run anywhere, such as on a desktop or a cloud server.

**AD-13.** One Node server process serves both the built client and the Socket.IO connections.

*Why:* there's then one thing to start and one port to open.

## T-SEC-3. Code standards

**CS-1.** Use common, well-maintained libraries, never obscure or abandoned packages.

**CS-2.** Every rule the engine carries out has a unit test.

## T-SEC-4. Engine

**TR-1.** The engine shall run and be tested on its own, without the server or the client.

**TR-2.** The engine shall take every random choice in a game from that game's one random number
generator, including the turn order, the bounty picks and every choice the tile generator makes.

**TR-3.** When the engine replays a game record, the engine shall produce the same game state every
time.

**TD-1.** The engine takes a game state and an action, and either rejects the action or returns
the resulting game state. It meets TR-1 and TR-3.

*Why:* a function like this is easy to test, and replaying an action log is just applying each
action in turn.

**TD-2.** The random number generator is passed into the engine, which uses no other source of
randomness. It meets TR-2 and TR-3.

*Why:* tests can pass in a generator with a fixed seed and get the same game every time.

## T-SEC-5. Tile model and shape catalog

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

## T-SEC-6. Server

**TR-9.** When the server receives an action, the server shall apply it only if the rules in
F-SEC-3, F-SEC-6, F-SEC-7, F-SEC-8 and F-SEC-11 allow it.

*Why:* a client someone has changed must not be able to make an illegal action.

**TR-10.** The server shall make every draw itself, never letting a client decide what a player
draws.

**TR-11.** The server shall never send a client a game's seed or the state of its random number
generator.

*Why:* anyone who has either could predict every draw.

**TR-12.** The server shall put in each player view only the hand contents that FR-95 lets that
player see.

**TR-4.** When a game starts, the server shall pick the game's seed.

**TR-13.** The server shall make each link code from at least 128 bits taken from a
cryptographically secure random source.

*Why:* no one can then open a player's game by guessing or changing a link.

**TR-14.** The server shall apply an action only for the player whose player link opened the
connection it came on.

**TD-11.** The game lifetime is a server setting, with FR-131's 24 hours as its default. It meets
FR-116 and FR-131.

*Why:* it can then be adjusted later without a code change.

**TD-12.** A game setup stays in the host's browser until the host starts the game, and the server
starts holding the game only then. It meets FR-116.

*Why:* the server then holds only started games, so the game lifetime covers every game it holds.

**TD-7.** Each game is its own Socket.IO room. It meets FR-2.

*Why:* a room sends each update only to the players in that game, which keeps games separate.

**TD-8.** After the server applies an action, it sends a new player view to every player in the
game. It meets FR-4.

*Why:* sending the whole player view is simpler than sending only what changed, and a game's
state is small.

## T-SEC-7. Client

**TD-9.** The client imports the engine and uses it to highlight where a tile can be laid and to
offer only legal choices, with no rules logic of its own. The server's check under TR-9 always has
the final say. It meets FR-97 and FR-99.

*Why:* the highlights then always match what the server allows, since both use the same rules.

**TD-10.** Tiles are rendered as SVG in code, with no image files. It meets FR-92.

*Why:* SVG stays sharp at any size, so tiles look right as players zoom the board (FR-93).
