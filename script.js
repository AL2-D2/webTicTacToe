function Player(gameMarkSelection, board) {
    const gameMark = gameMarkSelection;

    const MarkCell = () => {
        let selectedCell = 0;

        while (selectedCell <= 0 || selectedCell > 9) {

            selectedCell = parseInt(prompt("Which cell?"));

            if (selectedCell <= 3 && board.boardCells[0][selectedCell - 1] == "") {
                board.boardCells[0][selectedCell - 1] = gameMark;
            }
            else if (selectedCell > 3 && selectedCell <= 6 && board.boardCells[1][selectedCell - 4] == "") {
                board.boardCells[1][selectedCell - 4] = gameMark;
            }
            else if (selectedCell > 6 && selectedCell <= 9 && board.boardCells[2][selectedCell - 7] == "") {
                board.boardCells[2][selectedCell - 7] = gameMark;
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

const board = Board();
const player1 = Player("X", board);

player1.MarkCell();
board.getBoardStatus();