function GameBoard() {
  let gameBoard = [];
  let size = 3;
  function buildGameBoard() {
    for (let i = 0; i < size; i++) {
      gameBoard.push([]);
      for (let j = 0; j < size; j++) {
        gameBoard[i].push('_');
      }
    }
    return gameBoard;
  }

  function getGameBoard() {
    return gameBoard;
  }

  function isValidMove(row, col) {
    return gameBoard[row][col] === '_';
  }

  return {
    buildGameBoard,
    getGameBoard,
    isValidMove
  };
}

function View() {
  function renderBoard(arr) {
    const gameBoardElement = document.querySelector('#game-board');

    if (gameBoardElement.hasChildNodes()) {
      gameBoardElement.removeChild(gameBoardElement.firstChild);
    }
    const size = arr.length;

    for (let i = 0; i < size; i++) {
      const div = document.createElement('div');
      for (let j = 0; j < size; j++) {
        const span = document.createElement('span');
        span.textContent = arr[i][j];
        span.className = 'box';
        span.setAttribute('data-index', i + ',' + j);
        div.appendChild(span);
      }
      gameBoardElement.appendChild(div);
    }

    gameBoardElement.addEventListener('click', e => {
      console.log(e);
      console.log(e.srcElement.attributes[1].nodeValue);
      const [row, col] = e.srcElement.attributes[1].nodeValue.split(',');
      //verify if move is possible,
      //if it is mark the board,
      // check for win,
      // set next player turn
      if (gameBoard.isValidMove(Number(row), Number(col))) {
      }
    });
  }

  return {
    renderBoard
  };
}

function player(sign) {
  return { sign };
}

//start game
//keep track of turn
function GameManager() {
  let playerTurn = 0;
  function whichPlayerTurn() {
    return playerTurn % 2 == 0 ? 'x' : 'o';
  }

  function nextPlayerTurn() {
    playerTurn++;
    view.renderBoard();
  }

  function startGame() {
    view.renderBoard(gameBoard.buildGameBoard());
  }

  function isGameOver() {}

  return {
    whichPlayerTurn,
    nextPlayerTurn,
    startGame,
    isGameOver
  };
}

// console.log(GameBoard().getGameBoard());

const view = new View();
const gameBoard = new GameBoard();
const gameManager = new GameManager();
gameManager.startGame();

// view.renderBoard([
//   ['x', '_', 'o'],
//   ['x', '_', 'o'],
//   ['o', '_', 'x']
// ]);
// const gameManager = GameManager();
gameBoard.buildGameBoard();
