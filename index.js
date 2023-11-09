const board = (function createBoard() {
  const boardCells = [];
  const BOARD_SIZE = 8;

  for (let i = 0; i < BOARD_SIZE; i += 1) {
    boardCells.push([]);

    for (let j = 0; j < BOARD_SIZE; j += 1) {
      boardCells[i].push([i, j]);
    }
  }

  function checkMove(move) {
    if (move[0] >= BOARD_SIZE || move[1] >= BOARD_SIZE) {
      return false;
    } else {
      return true;
    }
  }

  function getPossibleMoves(from, moveAmount) {
    const result = [];

    for (let i = 0; i < moveAmount.length; i += 1) {
      const move = [from[0] + moveAmount[i][0], from[1] + moveAmount[i][1]];
      if (checkMove(move)) {
        result.push(move);
      }
    }

    return result;
  }

  return { checkMove, getPossibleMoves };
})();

function createKnight(newBoard = board) {
  const KNIGHT_MOVES = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];

  function createTravelNode(value) {
    return {
      value,
      fromNode: null,
    };
  }

  function travail(start, finish) {
    const visitedMoves = {};
    visitedMoves[`${start[0]}-${start[1]}`] = 1;
    const queue = [createTravelNode(start)];
    while (queue.length > 0) {
      currentNode = queue.shift();
      const newMoves = newBoard.getPossibleMoves(
        currentNode.value,
        KNIGHT_MOVES
      );
      for (let i = 0; i < newMoves.length; i += 1) {
        if (visitedMoves[`${newMoves[i][0]}-${newMoves[i][1]}`] === 1) {
          continue;
        }
        const newMoveNode = createTravelNode(newMoves[i]);
        newMoveNode.fromNode = currentNode;
        queue.push(newMoveNode);
        visitedMoves[`${newMoves[i][0]}-${newMoves[i][1]}`] = 1;
        if (newMoves[i][0] === finish[0] && newMoves[i][1] === finish[1]) {
          return extractPath(newMoveNode);
        }
      }
    }
    return "Can't find path from the start position";
  }

  function extractPath(finishNode) {
    let currentNode = finishNode;
    let pathArray = [];
    while (currentNode !== null) {
      pathArray.unshift(currentNode.value);
      currentNode = currentNode.fromNode;
    }
    return pathArray;
  }

  return { travail };
}

const knight = createKnight();
const path = knight.travail([0, 0], [7, 7]);
console.log("Path length is", path.length);
for (let i = 0; i < path.length; i += 1) {
  console.log(path[i]);
}
