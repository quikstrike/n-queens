/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  for (var i = 0; i < n; i++){
    var row = [];
    for (var j = 0; j < n; j++){
      if (j === i){
        row.push(1);
      }
      else {
        row.push(0);
      }
    }
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(size) {
  var solutionCount = 0;
  if (size === 0){
    return 1;
  }

  var recurse = function(board, row, count){
    for (var column = 0; column < size; column++){
      board.togglePiece(row,column);
      if (!board.hasAnyRooksConflicts()){
        if (row === size-1){
          solutionCount++;
        } else {
          recurse(new Board(board.rows()),row+1,count);
        }
      }
      board.togglePiece(row, column);
    }
  }
  recurse(new Board({n:size}),0,0)

  console.log('Number of solutions for ' + size + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(size) {
  if ( size === 0 ){
    return [];
  }
  var solution = new Board({n:size})
  var recurse = function(board, row){
    for (var column = 0; column < size; column++){
      board.togglePiece(row,column);
      if (!board.hasAnyQueensConflicts()){
        if (row === size-1){
          return board;
        } else {
          var retBoard = recurse(board,row+1);
          if (retBoard){
            return retBoard;
          }
        }
      }
      board.togglePiece(row, column);
    }

  }
  solution = recurse(solution, 0);
  if (!solution){
    solution = new Board({n:size});
  }

  console.log('Single solution for ' + size + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(size) {
  var solutionCount = 0;
  if (size === 0){
    return 1;
  }

  var recurse = function(board, row, count){
    for (var column = 0; column < size; column++){
      board.togglePiece(row,column);
      if (!board.hasAnyQueensConflicts()){
        if (row === size-1){
          solutionCount++;
        } else {
          recurse(new Board(board.rows()),row+1,count);
        }
      }
      board.togglePiece(row, column);
    }
  }
  recurse(new Board({n:size}),0,0)

  console.log('Number of solutions for ' + size + ' queens:', solutionCount);
  return solutionCount;
};
