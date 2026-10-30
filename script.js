function Player(gameMarkSelection, board) {
    const playerMark = gameMarkSelection;

    const MarkCell = () => {
        let selectedCell = 0;

        while (selectedCell <= 0 || selectedCell > 9) {

            selectedCell = parseInt(prompt(`Which cell? (${playerMark})`));

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

    return { MarkCell };
}

function Board() {
    let boardCells = [["", "", ""], ["", "", ""], ["", "", ""]];

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
        while (turn < 4) {
            player1.MarkCell();
            player2.MarkCell();
            console.log(turn);
            board.getBoardStatus();
            turn++;
        }
    }

    const checkIfWon = () => {

    }

    return { playTurn };
})();


Game.playTurn();