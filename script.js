const gameBoard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const getBoard = function () {
    return board;
  };

  const place = function (val, row, col) {
    if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] != 0)
      return false;

    board[row][col] = val;
    return true;
  };

  const check = function () {
    // cheking rows
    for (let i = 0; i < 3; i++) {
      let curr = board[i][0];
      if (curr == 0) continue;

      let count = 0;
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == curr) {
          count++;
        }
      }

      if (count == 3) return true;
    }

    //checking columns
    for (let j = 0; j < 3; j++) {
      let curr = board[0][j];
      if (curr == 0) continue;

      let count = 0;
      for (let i = 0; i < 3; i++) {
        if (board[i][j] == curr) {
          count++;
        }
      }
      if (count == 3) return true;
    }

    // checking diagonals
    let i = 0,
      j = 0;
    let curr = board[i][j];

    if (curr != 0) {
      let count = 0;
      while (i < 3 && j < 3) {
        if (board[i][j] == curr) {
          count++;
        }
        i++;
        j++;
      }
      if (count == 3) return true;
    }

    (i = 0), (j = 2);
    curr = board[i][j];
    if (curr != 0) {
      let count = 0;
      while (i < 3 && j > -1) {
        if (board[i][j] == curr) {
          count++;
        }
        i++;
        j--;
      }
      if (count == 3) return true;
    }

    return false;
  };

  const isFull = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == 0) return false;
      }
    }
    return true;
  };

  return {
    place,
    check,
    isFull,
    getBoard,
  };
})();

const displayBoard = function () {
  let numberMapper = { 0: "⬜", 1: "❌", 2: "⭕" };
  let board = gameBoard.getBoard();

  let decoratedBoard = board.map((row) => {
    return row.map((val) => {
      return numberMapper[val];
    });
  });

  decoratedBoard.forEach((row) => {
    console.log(row.join(" "));
  });
};

const Player = function (val) {
  const getValue = function () {
    return val;
  };
  return {
    getValue,
  };
};

const game = (function () {
  let currentPlayers = { 0: Player(1), 1: Player(2) };

  const getInput = function () {
    let row = prompt("Enter row");
    let col = prompt("Enter col");
    row = parseInt(row);
    col = parseInt(col);

    if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
      alert("Invalid move");
      return getInput();
    }
    return [row, col];
  };

  const doOneRound = function (currentTurn, playerValue, row, col) {
    if (gameBoard.place(playerValue, row, col)) {
      if (gameBoard.check()) {
        alert("Congratulations, You have won, Player " + playerValue);
        return [false, 1 - currentTurn];
      } else if (gameBoard.isFull()) {
        alert("Game Over, It's draw");
        return [false, 1 - currentTurn];
      }
      return [true, 1 - currentTurn];
    }
    alert("Invalid move");
    return [true, currentTurn];
  };

  const play = function () {
    displayBoard();
    let turn = 0;
    let playing = true;
    while (playing) {
      let [row, col] = getInput();
      [playing, turn] = doOneRound(
        turn,
        currentPlayers[turn].getValue(),
        row,
        col,
      );
      displayBoard();
    }
  };

  return {
    play,
  };
})();

const playButton = document.querySelector("button");
playButton.addEventListener("click", game.play);
