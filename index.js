const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');


let board = Array.from({ length: 3 }, () => Array(3).fill(null));
let movesCount = 0;


startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (board[row][col] !== null) return;

    let symbol = movesCount % 2 == 0 ? CROSS : ZERO;

    board[row][col] = symbol;
    renderSymbolInCell(symbol, row, col);
    movesCount++;
    console.log(`Clicked on cell: ${row}, ${col}`);

    let winner = checkHasWinner();
    if (winner) {
        alert(`Победил ${winner}!`)
    }
}

function checkHasWinner() {
    if (movesCount < 5) {
        return null;
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        paintWinnerCellsRed();
        console.log(board[0][0])
        return board[0][0];
    }
    if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        paintWinnerCellsRed();
        return board[2][0];
    }
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            paintWinnerCellsRed();
            return board[i][0];
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            paintWinnerCellsRed();
            return board[0][i];
        }
    }
    if (movesCount == 9) {
        alert("Победила дружба!")
        return null;
    }
}

function paintWinnerCellsRed() {

}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}