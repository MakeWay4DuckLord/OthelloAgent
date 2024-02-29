//helper methods!

//get array of neighbors to a tile, x is row, y is column
function getNeighbors(x, y) {
  let neighbors = [
    {'x': x, 'y': y+1},
    {'x': x, 'y': y-1},
    {'x': x+1, 'y': y},
    {'x': x+1, 'y': y+1},
    {'x': x+1, 'y': y-1},
    {'x': x-1, 'y': y+1},
    {'x': x-1, 'y': y-1},
    {'x': x-1, 'y': y}
  ];
  return neighbors;
}

//check if a tile is in bounds
function inBounds(move) {
    return (move.x <= 7 && move.x >= 0 && move.y <= 7 && move.y >= 0);
}


/**
 * My solution is a relatively simple reflex agent.
 * It rates moves based on the strategic value of each tile it would flip.
 */
function getMove(player, board) {
  let opponent = 1;
  if(player == 1) {
    opponent = 2;
  }

  /**
   * matrix of strategic value for each tile, based on the following heuristics:
   *  - Edges are good, and corners are best, because there a fewer ways to outflank them.
   *  - Corners are valued really high so they will almost always be played ASAP.
   *  - The tiles adjacent to edges/corners aren't great since they set up your opponent to play on the edges/corner.
   *  - The diagonals are more valuable because controlling them makes it easier to get the corners.
   */
  let strategicValue = [
    [16, 1, 4, 4, 4, 4, 1, 16],
    [ 1, 0, 1, 1, 1, 1, 0, 1 ],
    [ 4, 1, 3, 2, 2, 3, 1, 4 ],
    [ 4, 1, 2, 3, 3, 2, 1, 4 ],
    [ 4, 1, 2, 3, 3, 2, 1, 4 ],
    [ 4, 1, 3, 2, 2, 3, 1, 4 ],
    [ 1, 0, 1, 1, 1, 1, 0, 1 ],
    [16, 1, 4, 4, 4, 4, 1, 16],
  ];

  /**
   * matrix to track possible moves:
   *  - 0 means playing there is invalid
   *  - otherwise will contain the sum of the strategic value of
   *    each piece that will be flipped if that move is played
   */
  let moves = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]
  
  //iterate through all tiles on the current board, x for row, y for column.
  for (let x = 0; x < 8; x++) {
    for(let y = 0; y < 8; y++) {

      //iterate through the neighbors of each blank tile
      if(board[x][y] == 0) {
        let neighbors = getNeighbors(x, y);
        for(let i = 0; i < 8; i++) {
          let n = neighbors[i];


          //iterate in the direction if this neighbor
          let dx = n.x - x;
          let dy = n.y - y;
          let points = 0;
          while(inBounds(n) && (board[n.x][n.y] == opponent)) {
            points += strategicValue[n.x][n.y]; //add the strategic value for controlling this tile 
            n.y += dy;
            n.x += dx;
            if(inBounds(n)) {
              //if we find one of our pieces its a valid move!
              if(board[n.x][n.y] == player) {
                if(moves[x][y] == 0) { //if this is the first direction we've found to be outflanking
                  moves[x][y] += strategicValue[x][y]; //flip the sign of this tiles value
                }
                moves[x][y] += points; //add points from all the pieces this move will flip
              }
              
              //reset points to 0 before considering the next neighbor/direction
              if(board[n.x][n.y] != opponent) {
                points = 0;
              }
            }
          } //end while loop
        } //end neighbors loop
      }
    } 
  } //close board loop

  //find the move with the most points
  let best_move = [0, 0];
  for(let x = 0; x < 8; x++) {
    for(let y = 0; y < 8; y++) {
      if(moves[x][y] > moves[best_move[0]][best_move[1]]) {
        best_move = [x, y];
      }
    }
  }

  //thats the move we play
  return best_move
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = {getMove, prepareResponse};
