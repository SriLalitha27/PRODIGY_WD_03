const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function handleClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        render();
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            status.textContent = `Player ${currentPlayer} wins!`;
            return true;
        }
    }

    if (!gameBoard.includes("")) {
        status.textContent = "It's a draw!";
        return true;
    }

    return false;
}

function render() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleClick(index));
        board.appendChild(cellElement);
    });
}

resetButton.addEventListener("click", () => {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    status.textContent = `Player ${currentPlayer}'s turn`;
    render();
});

render();
