# Atomic Accelerator Coding Challenge
 My solution is a relatively simple reflex agent. It rates moves based on the strategic value of each tile that move would flip. I determined the strategic values for each tile using the following heuristics:
 - Edges are good, and corners are best, because there are fewer ways to outflank them.
 - Corners are valued really high so they will almost always be played ASAP.
 - The tiles adjacent to edges/corners aren't great since they set up your opponent to play on the edges/corner.
 - The diagonals are more valuable because controlling them cam make it easier to get the corners.

It works great against a random opponent, but I can definitely see flaws in the way it plays. I expect that the values of each tile could be optimized with more testing, but if I were to spend time making it more robust I would probably just implement alpha-beta pruning.

## Instructions
Make sure you have the required npm package(s) installed: `npm install`
To run the client: `node client.js [optional port] [optional hostname]`

## Recommended Software
* Node 8.12.0
* NPM 6.8.0
