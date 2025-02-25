const gameBoard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const clear = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = 0;
      }
    }
  };

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
    clear,
  };
})();

const displayBoard = function (screenBoard) {
  let numberMapper = { 0: "", 1: "❌", 2: "⭕" };
  let board = gameBoard.getBoard();

  screenBoard.querySelectorAll(".row").forEach((row, i) => {
    row.querySelectorAll("div").forEach((cell, j) => {
      cell.textContent = numberMapper[board[i][j]];
    });
  });
};

const Player = function (val, symbol) {
  const getValue = function () {
    return val;
  };
  const getSymbol = function () {
    return symbol;
  };
  return {
    getValue,
    getSymbol,
  };
};

const game = (function () {
  const screenBoard = document.querySelector(".board");

  let currentPlayers = { 0: Player(1, "❌"), 1: Player(2, "⭕") };
  let turn = 0;
  let playing = true;
  let playerWon;
  const player = document.querySelector("#player");
  const symbol = document.querySelector("#symbol");

  const doOneRound = function (currentTurn, playerValue, row, col) {
    if (gameBoard.place(playerValue, row, col)) {
      return [
        !gameBoard.check() && !gameBoard.isFull(),
        1 - currentTurn,
        gameBoard.check(),
      ];
    }
    alert("Invalid move");
    return [true, currentTurn, false];
  };

  screenBoard.querySelectorAll(".row").forEach((row, i) => {
    row.querySelectorAll("div").forEach((cell, j) => {
      cell.addEventListener("click", function () {
        [playing, turn, playerWon] = doOneRound(
          turn,
          currentPlayers[turn].getValue(),
          i,
          j,
        );

        displayBoard(screenBoard);

        setTimeout(() => {
          if (!playing) {
            if (playerWon) {
              alert(
                "Congratulations! Player " +
                  currentPlayers[1 - turn].getValue() +
                  ", you won!",
              );
            } else {
              alert("Game Over! It's a draw!");
            }

            playing = true;
            turn = 0;
            player.textContent = currentPlayers[turn].getValue();
            symbol.textContent = currentPlayers[turn].getSymbol();
            gameBoard.clear();
            displayBoard(screenBoard);
          }
        }, 100);

        player.textContent = currentPlayers[turn].getValue();
        symbol.textContent = currentPlayers[turn].getSymbol();
      });
    });
  });
})();
