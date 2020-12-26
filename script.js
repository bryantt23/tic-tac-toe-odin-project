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

  function markPosition(row, col, marker) {
    gameBoard[row][col] = marker;
  }

  function hasWinner() {
    return horizontalWinner() || verticalWinner() || diagonalWinner();
  }

  function horizontalWinner() {
    for (let i = 0; i < size; i++) {
      let ct = 0;
      for (let j = 0; j < size; j++) {
        if (gameBoard[i][j] == 'X') {
          ct++;
        } else if (gameBoard[i][j] === 'O') {
          ct--;
        }
      }
      if (ct === 3 || ct === -3) {
        return true;
      }
    }
    return false;
  }

  function verticalWinner() {
    for (let j = 0; j < size; j++) {
      let ct = 0;
      for (let i = 0; i < size; i++) {
        if (gameBoard[i][j] == 'X') {
          ct++;
        } else if (gameBoard[i][j] === 'O') {
          ct--;
        }
      }
      if (ct === 3 || ct === -3) {
        return true;
      }
    }
    return false;
  }

  function diagonalWinner() {
    let ct = 0;
    for (let i = 0; i < size; i++) {
      if (gameBoard[i][i] == 'X') {
        ct++;
      } else if (gameBoard[i][i] === 'O') {
        ct--;
      }
    }
    if (ct === 3 || ct === -3) {
      return true;
    }

    ct = 0;
    for (let i = 0; i < size; i++) {
      if (gameBoard[i][size - i - 1] == 'X') {
        ct++;
      } else if (gameBoard[i][size - i - 1] === 'O') {
        ct--;
      }
    }
    if (ct === 3 || ct === -3) {
      return true;
    }
  }

  return {
    buildGameBoard,
    getGameBoard,
    isValidMove,
    markPosition,
    hasWinner
  };
}

function View() {
  function renderBoard(arr) {
    const gameBoardElement = document.querySelector('#game-board');

    if (gameBoardElement.hasChildNodes()) {
      while (gameBoardElement.firstChild) {
        gameBoardElement.removeChild(gameBoardElement.firstChild);
      }
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
      //   console.log(e);
      //   console.log(e.srcElement.attributes[1].nodeValue);
      const [row, col] = e.srcElement.attributes[1].nodeValue.split(',');
      //verify if move is possible,
      //if it is mark the board,
      // check for win,
      // set next player turn
      if (gameBoard.isValidMove(Number(row), Number(col))) {
        console.log('valid');
        const marker = gameManager.whichPlayerTurn();
        gameBoard.markPosition(Number(row), Number(col), marker);
        gameManager.nextPlayerTurn();
      } else {
        console.log('invalid');
      }
    });
  }

  function showMessage(message = '') {
    if (message === '') {
      const playerTurn = gameManager.whichPlayerTurn();
      message = `It is ${playerTurn}'s turn`;
    } else {
    }
    const playerTurnDiv = document.querySelector('#player-turn');
    const h3 = document.createElement('h3');
    h3.textContent = message;
    if (playerTurnDiv.hasChildNodes()) {
      playerTurnDiv.removeChild(playerTurnDiv.firstChild);
    }
    playerTurnDiv.appendChild(h3);
  }

  return {
    renderBoard,
    showMessage
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
    return playerTurn % 2 == 0 ? 'X' : 'O';
  }

  function nextPlayerTurn() {
    view.renderBoard(gameBoard.getGameBoard());
    let message;
    if (gameBoard.hasWinner()) {
      message = whichPlayerTurn() + ' has won!';
      view.showMessage(message);
    } else {
      playerTurn++;
      message = `It is ${playerTurn}'s turn`;
      view.showMessage();
    }
  }

  function startGame() {
    view.renderBoard(gameBoard.buildGameBoard());
    view.showMessage();
  }

  return {
    whichPlayerTurn,
    nextPlayerTurn,
    startGame
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
// gameBoard.buildGameBoard();
