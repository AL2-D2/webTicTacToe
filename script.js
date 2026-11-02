const cellBoxesList = document.querySelectorAll(".box");
const cellBoxes = Array.from(cellBoxesList);
const startButton = document.querySelector("#start-game-btn");
const restartButton = document.querySelector(".restart");
const playerNameTurn = document.querySelector(".player-turn-name");

function Player(gameMarkSelection) {
    const playerMark = gameMarkSelection;

    let score = 0;

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

    const getScore = () => score;
    const incrementScore = () => score++;
    const resetScore = () => score = 0;
    return { markCell, getPlayerMark, getScore, incrementScore, resetScore };
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

const DataManager = () => {
    let playerXName = "X";
    let playerOName = "O";

    function getNamesFromInputAreas() {
        playerXName = document.querySelector("#player-x-name").value;
        playerOName = document.querySelector("#player-o-name").value;
    };

    function changeUserNames() {
        getNamesFromInputAreas();
        document.querySelector(".player-x-score-name").innerText = playerXName + ": ";
        document.querySelector(".player-o-score-name").innerText = playerOName + ": ";
    }

    function changeUserPoints(playerXScore, playerOScore) {
        document.querySelector(".player-x-score").innerText = playerXScore;
        document.querySelector(".player-o-score").innerText = playerOScore;
    }

    return { changeUserNames, changeUserPoints }
};

const Game = (() => {

    const board = Board();
    const dataManager = DataManager();
    const player1 = Player("X");
    const player2 = Player("O");

    let currentPlayer = player1;
    let gameActive = false;

    const play = () => {
        player1.resetScore();
        player2.resetScore();
        board.clearBoard();
        dataManager.changeUserPoints(player1.getScore(), player2.getScore());
        dataManager.changeUserNames();
        currentPlayer = player1;
        playerNameTurn.innerText = currentPlayer.getPlayerMark();
        gameActive = true;
    }

    const reset = () => {
        currentPlayer = player1;
        playerNameTurn.innerText = currentPlayer.getPlayerMark();
        board.clearBoard();
        gameActive = true;
    }

    const checkWinConditionAndReturnWinner = () => {
        for (let i = 0; i < 3; i++) {
            // horizontal checks
            if ((board.boardCells[i][0].innerText === board.boardCells[i][1].innerText && board.boardCells[i][1].innerText === board.boardCells[i][2].innerText) && board.boardCells[i][0].innerText != "") {
                if (board.boardCells[i][0].innerText === player1.getPlayerMark()) {
                    player1.incrementScore();
                    dataManager.changeUserPoints(player1.getScore(), player2.getScore());
                    return player1;
                }
                else {
                    player2.incrementScore();
                    dataManager.changeUserPoints(player1.getScore(), player2.getScore());
                    return player2;
                }
            }
        }

        for (let i = 0; i < 3; i++) {
            // vertical checks
            if ((board.boardCells[0][i].innerText === board.boardCells[1][i].innerText && board.boardCells[1][i].innerText === board.boardCells[2][i].innerText && board.boardCells[0][i].innerText != "")) {
                if (board.boardCells[0][i].innerText === player1.getPlayerMark()) {
                    player1.incrementScore();
                    dataManager.changeUserPoints(player1.getScore(), player2.getScore());
                    return player1;
                }
                else {
                    player2.incrementScore();
                    dataManager.changeUserPoints(player1.getScore(), player2.getScore());
                    return player2;
                }
            }
        }
        // left diagonal check
        if ((board.boardCells[0][0].innerText === board.boardCells[1][1].innerText && board.boardCells[1][1].innerText === board.boardCells[2][2].innerText) && board.boardCells[0][0].innerText != "") {
            if (board.boardCells[0][0].innerText === player1.getPlayerMark()) {
                player1.incrementScore();
                dataManager.changeUserPoints(player1.getScore(), player2.getScore());
                return player1;
            }
            else {
                player2.incrementScore();
                dataManager.changeUserPoints(player1.getScore(), player2.getScore());
                return player2;
            }
        }
        // right diagonal check
        if ((board.boardCells[0][2].innerText === board.boardCells[1][1].innerText && board.boardCells[1][1].innerText === board.boardCells[2][0].innerText) && board.boardCells[0][2].innerText != "") {
            if (board.boardCells[0][2].innerText === player1.getPlayerMark()) {
                player1.incrementScore();
                dataManager.changeUserPoints(player1.getScore(), player2.getScore());
                return player1;
            }
            else {
                player2.incrementScore();
                dataManager.changeUserPoints(player1.getScore(), player2.getScore());
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
            return true;
        }
        if (checkDrawCondition()) {
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
            playerNameTurn.innerText = currentPlayer.getPlayerMark();
        }
    }

    cellBoxes.forEach((cell) => cell.addEventListener("click", handleCellClick));

    return { play, reset };
})();

startButton.addEventListener("click", Game.play);
restartButton.addEventListener("click", Game.reset);