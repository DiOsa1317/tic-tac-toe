const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');


let board = Array.from({length: 3}, () => Array(3).fill(null));
let movesCount = 0;
let winner = null;

const winComb = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
];
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
    console.log(winner);
    if (board[row][col] !== null || winner !== null) return;

    let symbol = movesCount % 2 == 0 ? CROSS : ZERO;

    board[row][col] = symbol;
    renderSymbolInCell(symbol, row, col);
    movesCount++;
    console.log(`Clicked on cell: ${row}, ${col}`);

    winner = checkHasWinner();
    if (winner) {
        alert(`Победил ${winner}!`)
    }
}

function checkHasWinner() {
    if (movesCount < 5) {
        return null;
    }
    for (const comb of winComb) {
        const [[r1, c1], [r2, c2], [r3, c3]] = comb;

        const value = board[r1][c1];

        if (
            value !== null &&
            value === board[r2][c2] &&
            value === board[r3][c3]
        ) {
            paintWinnerCellsRed(comb);
            return value;
        }
    }

    if (movesCount == 9) {
        alert("Победила дружба!")
    }
    return null;
}

function paintWinnerCellsRed(comb) {
    for (const [row, col] of comb) {
        renderSymbolInCell(board[row][col], row, col, 'red');
    }
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
    board = Array.from({length: 3}, () => Array(3).fill(null));
    movesCount = 0;
    winner = null;
    renderGrid(3);
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