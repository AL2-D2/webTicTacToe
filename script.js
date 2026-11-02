const cellBoxesList = document.querySelectorAll(".box");
const cellBoxes = Array.from(cellBoxesList);
const startButton = document.querySelector("#start-game-btn");

function Player(gameMarkSelection) {
    const playerMark = gameMarkSelection;

    const markCell = (box) => {
        if (box.target.innerText === "") {
            box.target.innerText = playerMark;            
        }
        
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

    return { boardCells };
}

const Game = (() => {

    const board = Board();
    const player1 = Player("X");
    const player2 = Player("O");

    

    const play = () => {           
            if(playerPlayTurn(player1)){ 
                console.log("finished");
            }                   
            if(playerPlayTurn(player2)){                
            }            
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

    return { play };
})();

startButton.addEventListener("click", Game.play)