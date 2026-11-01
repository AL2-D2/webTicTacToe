const cellBoxesList = document.querySelectorAll(".box");
const cellBoxes = Array.from(cellBoxesList);

function Player(gameMarkSelection) {
    const playerMark = gameMarkSelection;

    const markCell = (box) => {                           
            if (box.target.innerText === "") {
                box.target.innerText = playerMark;
            }                            
    }

    cellBoxes.forEach((cell) => cell.addEventListener("click", markCell));

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

    function getBoardStatus() {
        boardCells.forEach((row) => row.forEach((column) => {
            console.log(column);
        }));
    }
    return { boardCells, getBoardStatus };
}

const Game = (() => {
    let gameFinished = false;

    const board = Board();
    const player1 = Player("X", board);
    const player2 = Player("O", board);

    const playTurn = () => {
        while (!gameFinished) {
            if (playerPlayTurn(player1)) {
                break;
            }
            if (playerPlayTurn(player2)) {
                break;
            }
            board.getBoardStatus();
        }
    }

    const checkWinConditionAndReturnWinner = () => {
        for (let i = 0; i < 3; i++) {
            // horizontal checks
            if ((board.boardCells[i][0] === board.boardCells[i][1] && board.boardCells[i][1] === board.boardCells[i][2]) && board.boardCells[i][0] != "") {
                if (board.boardCells[i][0] === player1.getPlayerMark()) {
                    return player1;
                }
                else {
                    return player2;
                }
            }
        }

        for (let i = 0; i < 3; i++) {
            // vertical checks
            if ((board.boardCells[0][i] === board.boardCells[1][i] && board.boardCells[1][i] === board.boardCells[2][i] && board.boardCells[0][i] != "")) {
                if (board.boardCells[0][i] === player1.getPlayerMark()) {
                    return player1;
                }
                else {
                    return player2;
                }
            }
        }
        // left diagonal check
        if ((board.boardCells[0][0] === board.boardCells[1][1] && board.boardCells[1][1] === board.boardCells[2][2]) && board.boardCells[0][0] != "") {
            if (board.boardCells[0][0] === player1.getPlayerMark()) {
                return player1;
            }
            else {
                return player2;
            }
        }
        // right diagonal check
        if ((board.boardCells[0][2] === board.boardCells[1][1] && board.boardCells[1][1] === board.boardCells[2][0]) && board.boardCells[0][2] != "") {
            if (board.boardCells[0][2] === player1.getPlayerMark()) {
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
                if (cell !== "") {
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
        player.markCell();
        if (checkWinConditionAndReturnWinner() === player) {
            alert(`winner is: ${player.getPlayerMark()}`);
            return true;
        }
        if (checkDrawCondition()) {
            alert("draw");
            return true;
        }
    }

    return { playTurn };
})();