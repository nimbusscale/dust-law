# Functional spec

The functional spec: what the app should do, in the user's terms. Requirements are in GEARS, with
`FR` IDs. It never links to other docs. Other docs, prompts and code point to its IDs.

## F-SEC-1. Terms

The terms a user would recognize, each defined once in plain language.

**Bastion.** A walled settlement. One bastion can spread across many tiles.

**Board.** The grid of spaces where tiles are laid.

**Border.** A wasteland borders a bastion when the two touch on the same tile.

**Bounty.** A goal that any player can race to meet for points (F-SEC-11).

**Control.** Which side or sides get a scored feature's points (F-SEC-9).

**Deploy.** To put an enforcer from an enforcer supply onto a feature.

**Edge.** One of a tile's four sides: north, east, south or west. Each edge is a bastion edge, a
road edge, a wasteland edge or an outpost edge, after the feature that reaches it.

**Enforcer.** One of a player's pieces, which they deploy onto features to claim them. Its role
comes from the feature it's on: judge, rider, warden or ranger.

**Enforcer supply.** A player's enforcers that aren't on the board.

**Feature.** A bastion, road, outpost or wasteland, taken as a whole across every tile it spans.

**Finished.** A bastion, road or outpost that F-SEC-8 counts as finished.

**Fit.** A tile fits a space when F-SEC-5 lets it be laid there in at least one rotation. A tile
fits the board when it fits at least one space.

**Game.** One play of Dust Law, from its setup until the app declares a winner.

**Gang stronghold.** A hostile in a bastion.

**Garrison.** A judge that its owner leaves behind in a finished bastion (F-SEC-10).

**Hand.** The tiles a player holds, ready to lay.

**Host.** The player in charge of a game's setup.

**Hostile.** A gang stronghold, a raider camp or a mutant warren: a neutral marker that sits in
one feature of a tile.

**Hostile side.** The neutral side made up of the hostiles on a feature, when the app works out
control of it.

**Judge.** An enforcer in a bastion.

**Junction.** The point in the middle of a tile where three or four roads end.

**Mutant warren.** A hostile in a wasteland.

**Outpost.** A lone station that fills its whole tile, with an outpost edge on every side.

**Player.** A person taking part in a game.

**Raider camp.** A hostile on a road.

**Ranger.** An enforcer in a wasteland.

**Rider.** An enforcer on a road.

**Road.** A route across the wastes. One road can run across many tiles.

**Rotation.** One of the four directions a tile can face on the board.

**Round.** One turn for each player, in turn order.

**Score points from a feature.** Get at least 1 point from that feature's own scoring.

**Side.** A player, or the hostile side, when the app works out control of a feature.

**Space.** One square of the board, which can hold one tile.

**Start tile.** The tile the app lays on the board before any player's turn.

**Stuck hand.** A hand in which no tile fits the board.

**Surrounding spaces.** The eight spaces around a tile's space: the four that share an edge with
it and the four that touch it only at a corner.

**Tile.** A square of the wastes, with an edge on each side and one or more features on it.

**Tile supply.** The number of tiles a game still has left to deal.

**Tiles per player.** A game's length, as a number of tiles for each player.

**Turn.** One player's go.

**Turn order.** The order in which players take their turns.

**Warden.** An enforcer on an outpost.

**Wasteland.** Open ground between the other features. Roads, outposts and bastions divide it
into separate wastelands.

## F-SEC-2. The app and its players

Who plays, where they play from, and how the app keeps them in step.

**FR-1.** The app shall seat only people, each playing from their own browser over a network, not
computer opponents.

**FR-2.** The app shall be designed and tested only for desktop web browsers, not as a mobile app
and not for phone browsers.

**FR-3.** When a player opens a game in a phone browser, the app shall let them play it.

**FR-4.** The app shall run several games at the same time, with nothing done in one game changing
another.

**FR-5.** When a player acts in a game, the app shall show the result to every player in that game
without them refreshing the page.

## F-SEC-3. Setting up a game

Creating a game, joining it, and what the app does when the host starts it.

**FR-6.** When a player creates a game, the app shall make them its host.

**FR-7.** While a game hasn't started, the app shall let its host set tiles per player to any whole
number from 10 to 40, starting at 20.

**FR-8.** When a player creates a game, the app shall give the host an invitation they can share
with the people they want to join it.

**FR-9.** The app shall let a player join a game only through an invitation its host shared, not
through matchmaking.

**FR-10.** The app shall let a player join a game only while it has fewer than 5 players.

**FR-11.** The app shall let a player join a game only before it starts.

**FR-12.** When the app stops a player from joining a game, the app shall tell them why.

**FR-13.** While a game that hasn't started has at least 2 players, the app shall let its host
start it.

**FR-14.** When the host starts a game, the app shall lay a start tile that is all wasteland and
holds no hostile.

**FR-15.** When the host starts a game, the app shall set the tile supply to tiles per player
times the number of players, not counting the start tile.

**FR-16.** When the host starts a game, the app shall give each player 7 enforcers.

**FR-17.** When the host starts a game, the app shall set each player's score to 0.

**FR-18.** When the host starts a game, the app shall pick 3 of the bounties in FR-65 at random to
be in play for that game.

**FR-19.** When the host starts a game, the app shall deal each player 3 tiles from the tile
supply as their hand.

**FR-20.** When the host starts a game, the app shall pick a turn order at random and keep it for
the rest of the game.

## F-SEC-4. Tiles and the board

What a tile is when it's dealt, how the board grows, and how features join across tiles.

**FR-21.** The board shall have no boundary and no fixed size, growing in every direction as tiles
are laid.

*Why:* a dealt tile is only sure to fit the board (FR-23) because the space just above the topmost
tile is always empty and touches only one tile.

**FR-22.** The app shall let each player pan and zoom the board, starting centered on the start
tile.

**FR-23.** When the app deals a tile, the app shall create it at that moment as a tile that fits
the board.

**FR-24.** The app shall put at most one hostile on a tile.

**FR-25.** When a tile is laid, the app shall join each bastion, road and wasteland on it to the
bastion, road or wasteland facing it across each edge the tile shares with another tile.

**FR-26.** When a tile with a hostile is laid, the app shall count the hostile as on the whole
feature it sits in, across every tile that feature spans.

## F-SEC-5. Laying a tile

Where a player may lay a tile. These are the only rules that decide whether a tile fits.

**FR-27.** When a player lays a tile, the app shall let them choose any tile in their hand and any
of its four rotations.

**FR-28.** The app shall let a player lay a tile only in an empty space that shares an edge with a
laid tile, not in one that touches laid tiles only at a corner.

**FR-29.** The app shall let a player lay a tile only where every edge it shares with another tile
matches that tile's edge, as this table shows.

| Edge | Matches |
|---|---|
| Bastion edge | Bastion edge |
| Road edge | Road edge, outpost edge |
| Wasteland edge | Wasteland edge, outpost edge |
| Outpost edge | Road edge, wasteland edge |

**FR-30.** The app shall let a player lay an outpost only where none of its surrounding spaces
holds an outpost.

## F-SEC-6. Turns

The steps of a turn, stuck hands, and dealing tiles.

**FR-31.** The app shall run each turn as the steps in this table, in this order.

| Step | Who acts | What happens |
|---|---|---|
| Lay step | The player | Lays a tile from their hand (F-SEC-5). |
| Deploy step | The player | May deploy an enforcer on the tile just laid (F-SEC-7). |
| Scoring step | The app | Takes garrison choices, then scores every feature the tile finished (F-SEC-8). |
| Bounty step | The app | Checks the bounties in play (F-SEC-11). |
| Draw step | The app | Deals the player a tile (FR-36). |

**FR-32.** While a player has a tile from their hand picked, the app shall highlight each space
where F-SEC-5 lets them lay it in its current rotation.

**FR-33.** While a player's hand is stuck, when their turn starts, the app shall tell them so and
ask them to choose a tile in it to discard.

**FR-34.** When a player discards a tile, the app shall show that tile to every player.

**FR-35.** When a player discards a tile, the app shall take them straight to that turn's draw
step (FR-31), skipping the lay, deploy, scoring and bounty steps.

**FR-36.** While the tile supply isn't empty, when a player's turn reaches the draw step (FR-31),
the app shall deal them one tile from the tile supply.

## F-SEC-7. Enforcers

Deploying enforcers, and when they come back.

**FR-37.** While a player's enforcer supply isn't empty, when their turn reaches the deploy step
(FR-31), the app shall let them deploy one enforcer onto one feature of the tile they just laid, or
skip the step.

**FR-38.** While a player's enforcer supply is empty, the app shall skip their deploy step (FR-31).

**FR-39.** The app shall let a player deploy an enforcer only onto a feature that holds no
enforcer of any player, counting the whole feature once FR-25 has joined the tile just laid to
it, and whether or not the feature holds a hostile.

*Scenario:* Given two separate roads, one holding your rider and one holding a rival's rider, when
a tile joins them into one road, then that road holds both riders, and no player can deploy onto it.

**FR-40.** The app shall keep each enforcer where it was deployed until its feature is scored, with
no way for its owner to pick it up earlier.

**FR-41.** When the app scores a feature, the app shall return each enforcer on it to its owner's
enforcer supply, except a garrison.

## F-SEC-8. Finishing and scoring features

When a bastion, road or outpost is finished, and what it's worth.

**FR-42.** When every bastion edge of a bastion faces another tile, the app shall count the
bastion as finished.

**FR-43.** When each end of a road stops at a junction, a bastion or an outpost, or the road closes
into a loop with no ends, the app shall count the road as finished.

**FR-44.** When every one of an outpost's surrounding spaces holds a tile, the app shall count the
outpost as finished.

**FR-45.** When a player's turn reaches the scoring step (FR-31), the app shall score every bastion,
road and outpost that the tile laid that turn finished, including an outpost whose last empty
surrounding space the tile filled.

**FR-46.** When a player's turn reaches the scoring step (FR-31), the app shall take every garrison
choice that FR-58 allows before it scores any feature.

**FR-47.** When the app scores a bastion, the app shall value it at 2 points for each tile in it.

**FR-48.** The app shall count an outpost that a road ends at as not part of the road.

**FR-49.** When the app scores a road, the app shall value it at 1 point for each tile in it.

**FR-50.** When the app scores an outpost, the app shall value it at 1 point for each tile with no
bastion on it, among the outpost's tile and the tiles in its surrounding spaces.

**FR-51.** When the app counts the tiles in a feature, the app shall count each tile once, even
when it holds two separate parts of that feature.

**FR-52.** The app shall score wastelands only at the end of the game (FR-74), not during play.

## F-SEC-9. Control

Which side gets a scored feature's points.

**FR-53.** When the app works out control of a feature, the app shall give each side a control
count: for a player, the number of their enforcers on the feature, and for the hostile side, the
number of hostiles on it, leaving out any hostile that FR-64 cancels.

**FR-54.** When the app works out control of a feature, the app shall count as sides only the
hostile side and the players with at least one enforcer on the feature.

**FR-55.** When one side has a higher control count on a scored feature than any other side, the
app shall give that side the feature's points.

**FR-56.** When two or more sides tie for the highest control count on a scored feature, the app
shall split the feature's points evenly among them, rounded down.

*Scenario:* Given a finished bastion worth 10 points that holds your judge, a rival's judge and one
gang stronghold, when it's scored, then you and the rival each get 3 points, and the hostile side's
share is lost.

**FR-57.** The app shall give no player the points that FR-55 or FR-56 gives the hostile side.

## F-SEC-10. Garrisons

Leaving a judge behind in a finished bastion, and what the garrison does for the rest of the game.

**FR-58.** When a tile finishes a bastion, the app shall let each player with a judge in it leave
one of those judges there as a garrison, whichever side wins the bastion.

**FR-59.** When players have garrison choices (FR-58) to make, the app shall ask them in turn
order, starting with the player whose turn it is, with each player deciding on every bastion they
can garrison before the next player is asked.

**FR-60.** When a player makes a garrison choice (FR-58), the app shall show it to every player
before the next choice is made.

**FR-61.** The app shall count a garrison as a judge when its own bastion is scored.

**FR-62.** The app shall keep a garrison on the board, out of its owner's enforcer supply, for the
rest of the game.

**FR-63.** While a bastion holds one or more garrisons, when a road that ends at that bastion is
finished, the app shall give the owner of each garrison there 2 bonus points, once per garrison
however many of the road's ends are at that bastion, whichever side wins the road, and even when no
player has a rider on it.

*Scenario:* Given a tile that finishes both a bastion holding your judge and a road that ends at
that bastion, when you leave a garrison in the bastion, then you get the 2 bonus points for that
road, and the garrison can cancel a hostile on it.

**FR-64.** When the app works out control of a road or a wasteland, the app shall leave out of
the hostile side's control count one hostile for each garrison whose bastion the road ends at or
the wasteland borders, as long as that garrison's owner has an enforcer on the road or in the
wasteland.

## F-SEC-11. Bounties

The bounties, and how players claim them.

**FR-65.** The app's bounties shall be the ones in this table, each with its condition and points.

| Bounty | Condition | Points |
|---|---|---|
| Big Walls | The player scores points from a bastion of 6 or more tiles. | 6 |
| Long Haul | The player scores points from a road of 6 or more tiles. | 5 |
| Clean Sweep | The player scores points from a bastion that holds a gang stronghold. | 5 |
| Clear the Road | The player scores points from a road that holds a raider camp. | 4 |
| Frontier | Over the game, the player scores points from two outposts. | 5 |
| Full Patrol | Over the game, the player scores points from at least one bastion, one road and one outpost. | 6 |
| Lockdown | The player has two garrisons of their own on the board. | 5 |
| All Hands | All of the player's enforcers are on the board, garrisons included. | 4 |

**FR-66.** When a player's turn reaches the bounty step (FR-31), the app shall check every player
against each unclaimed bounty in play, counting every feature scored that turn, except that it
checks All Hands only for the player whose turn it is.

**FR-67.** When exactly one player meets an unclaimed bounty in a bounty step, the app shall give
them its points and mark it claimed.

**FR-68.** When two or more players meet the same unclaimed bounty in one bounty step, the app
shall split its points evenly among them, rounded down, and mark it claimed.

**FR-69.** When the app checks a bounty, the app shall count only one player's own results toward
it, never the results of several players together.

**FR-70.** The app shall count a garrison's road bonus (FR-63) as points from the garrison, not as
points from the road.

**FR-71.** When the app checks Clear the Road, the app shall count a raider camp that a garrison
cancelled (FR-64) as still on its road.

## F-SEC-12. End of the game

When the game ends, and the final scoring.

**FR-72.** When every player's hand is empty, the app shall end the game.

*Scenario:* Given 3 players and 20 tiles per player, when the game ends, then each player has taken
exactly 20 turns, and every hand ran out in the 20th round.

**FR-73.** When the game ends, the app shall give no points for any unfinished bastion, road or
outpost.

**FR-74.** When the game ends, the app shall score each wasteland that holds at least one ranger,
valued at 3 points for each finished bastion it borders, whichever side won that bastion, and
whether or not that bastion holds a garrison or also counts for another wasteland.

**FR-75.** When the game ends, the app shall declare the player with the most points the winner,
with tied players sharing the win.

## F-SEC-13. What players see

The panels and screens around the board.

**FR-76.** The app shall show the tiles in a player's hand only to that player.

**FR-77.** The app shall show every player a score panel with each player's score, enforcers left
in their enforcer supply and number of tiles in hand, and whose turn it is.

**FR-78.** The app shall show every player the bounties in play and who has claimed each one.

**FR-79.** When the app scores a feature, a garrison's road bonus (FR-63) or a bounty, the app shall
show every player what was scored and the points each player got from it.

**FR-80.** When the game ends, the app shall show every player an end screen with the winners and
each player's points in each of these categories: bastions, roads, outposts, garrison bonuses,
bounties and wastelands.

**FR-81.** The app shall show the game with no art beyond the tile pictures it makes itself, and
with no animation.
