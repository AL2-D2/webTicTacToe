const cellBoxesList = document.querySelectorAll(".box");
const cellBoxes = Array.from(cellBoxesList);
const startButton = document.querySelector("#start-game-btn");
const restartButton = document.querySelector(".restart-button");

function Player(gameMarkSelection) {
    const playerMark = gameMarkSelection;

    const markCell = (box) => {
        if (box.target.innerText === "") {
            box.target.innerText = playerMark;
            return true;
        }
        return false;
    }

    const getPlayerMark = () => {
        return playerMark;
    };
    return { markCell, getPlayerMark };
}

function Board() {
    let boardCells = cellBoxes.reduce((acc, _, index) => {
        let chunkSize = 3;
        if (index % chunkSize === 0) {
            acc.push(cellBoxes.slice(index, index + chunkSize));
        }
        return acc;
    }, []);

    const clearBoard = () => {
        cellBoxes.forEach(cell => cell.innerText = "");
    };

    return { boardCells, clearBoard };
}

const DataHolder = () => {
    let playerXName = "X";
    let playerOName = "O";
    let playerXScore = 0;
    let playerOScore = 0;

    function getNamesFromInputAreas() {
        playerXName = document.querySelector("#player-x-name").value;
        playerOName = document.querySelector("#player-o-name").value;        
    };

    function changeUserNames() {
        getNamesFromInputAreas();
        document.querySelector(".player-x-score-name").innerText = playerXName + ": ";
        document.querySelector(".player-o-score-name").innerText = playerOName + ": ";
    }


    let getUserXName = () => playerXName;
    let getUserOName = () => playerOName;

    return { changeUserNames }
};

const Game = (() => {

    const board = Board();
    const dataHolder = DataHolder();
    const player1 = Player("X");
    const player2 = Player("O");

    let currentPlayer = player1;
    let gameActive = false;

    const play = () => {
        board.clearBoard();
        dataHolder.changeUserNames();
        currentPlayer = player1;
        gameActive = true;
    }

    const checkWinConditionAndReturnWinner = () => {
        for (let i = 0; i < 3; i++) {
            // horizontal checks
            if ((board.boardCells[i][0].innerText === board.boardCells[i][1].innerText && board.boardCells[i][1].innerText === board.boardCells[i][2].innerText) && board.boardCells[i][0].innerText != "") {
                if (board.boardCells[i][0].innerText === player1.getPlayerMark()) {
                    return player1;
                }
                else {
                    return player2;
                }
            }
        }

        for (let i = 0; i < 3; i++) {
            // vertical checks
            if ((board.boardCells[0][i].innerText === board.boardCells[1][i].innerText && board.boardCells[1][i].innerText === board.boardCells[2][i].innerText && board.boardCells[0][i].innerText != "")) {
                if (board.boardCells[0][i].innerText === player1.getPlayerMark()) {
                    return player1;
                }
                else {
                    return player2;
                }
            }
        }
        // left diagonal check
        if ((board.boardCells[0][0].innerText === board.boardCells[1][1].innerText && board.boardCells[1][1].innerText === board.boardCells[2][2].innerText) && board.boardCells[0][0].innerText != "") {
            if (board.boardCells[0][0].innerText === player1.getPlayerMark()) {
                return player1;
            }
            else {
                return player2;
            }
        }
        // right diagonal check
        if ((board.boardCells[0][2].innerText === board.boardCells[1][1].innerText && board.boardCells[1][1].innerText === board.boardCells[2][0].innerText) && board.boardCells[0][2].innerText != "") {
            if (board.boardCells[0][2].innerText === player1.getPlayerMark()) {
                return player1;
            }
            else {
                return player2;
            }
        }
    }

    const checkDrawCondition = () => {
        let filledCell = 0;
        for (let rowCell of board.boardCells) {
            for (let cell of rowCell) {
                if (cell.innerText !== "") {
                    filledCell++;
                }
            }
        }
        if (filledCell === 9 && (checkWinConditionAndReturnWinner() !== player1 && checkWinConditionAndReturnWinner() !== player2)) {
            return true;
        }
        else { return false; }
    }

    function playerPlayTurn(player) {
        board.boardCells.forEach((row) => row.forEach((cell) => cell.addEventListener("click", player.markCell)));
        if (checkWinConditionAndReturnWinner() === player) {
            alert(`winner is: ${player.getPlayerMark()}`);
            return true;
        }
        if (checkDrawCondition()) {
            alert("draw");
            return true;
        }
    }

    const handleCellClick = (e) => {
        if (!gameActive) {
            return;
        }

        const markSuccess = currentPlayer.markCell(e);

        if (markSuccess) {
            const winner = checkWinConditionAndReturnWinner();
            if (winner) {
                gameActive = false;
                return;
            }

            if (checkDrawCondition()) {
                gameActive = false;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    cellBoxes.forEach((cell) => cell.addEventListener("click", handleCellClick));

    return { play };
})();

startButton.addEventListener("click", Game.play);