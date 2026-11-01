function Player(gameMarkSelection, board) {
    const playerMark = gameMarkSelection;

    const markCell = () => {
        let selectedCell = 0;

        while (selectedCell <= 0 || selectedCell > 9) {

            selectedCell = parseInt(prompt(`Which cell? (${playerMark})`));

            /* 'board.boardCells[0][selectedCell - (number)]' selects the board cell considering the board as:
             1-2-3
             4-5-6
             7-8-9
             so if user selects 5, marks the boardCells[1][5 - 4] which is boardCells[1][1], center part of the board in this logic...
            */
            if (selectedCell <= 3 && board.boardCells[0][selectedCell - 1] === "") {
                board.boardCells[0][selectedCell - 1] = playerMark;
            }
            else if (selectedCell > 3 && selectedCell <= 6 && board.boardCells[1][selectedCell - 4] === "") {
                board.boardCells[1][selectedCell - 4] = playerMark;
            }
            else if (selectedCell > 6 && selectedCell <= 9 && board.boardCells[2][selectedCell - 7] === "") {
                board.boardCells[2][selectedCell - 7] = playerMark;
            }
            else {
                selectedCell = 0;
            }
        }
    }
    const getPlayerMark = () => {
        return playerMark;
    };
    return { markCell, getPlayerMark };
}

function Board() {
    let boardCells = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function getBoardStatus() {
        boardCells.forEach((row) => row.forEach((column) => {
            console.log(column);
        }));
    }
    return { boardCells, getBoardStatus };
}

const Game = (() => {
    const board = Board();
    const player1 = Player("X", board);
    const player2 = Player("O", board);
    let turn = 0;
    const playTurn = () => {
        while (turn < 5) {
            turn++
            player1.markCell();
            if (checkWinConditionAndReturnWinner() === player1) {
                alert(`winner is: ${player1.getPlayerMark()}`);
                break;
            }
            if (checkDrawCondition()) {
                alert("draw");
                break;
            }
            player2.markCell();
            if (checkWinConditionAndReturnWinner() === player2) {
                alert(`winner is: ${player2.getPlayerMark()}`);
                break;
            }
            if (checkDrawCondition()) {
                alert("draw");
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

    return { playTurn };
})();

Game.playTurn();