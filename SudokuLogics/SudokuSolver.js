
function sudokuSolver(matrix) {
    let row = -1;
    let col = -1;
    let flag = true;

    for (let r = 0; r < matrix.length && flag; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            if (matrix[r][c] == 0) {
                row = r;
                col = c;
                flag = false;
                break;
            }
        }
    }

    if (flag) {
        displayBoard(matrix);
        console.log(true);
        return true;
    }

    for (let val = 1; val < 10; val++) {
        if (isSafe(matrix, row, col, val)) {
            matrix[row][col] = val;
            if (sudokuSolver(matrix)) {
                return true;
            }
            matrix[row][col] = 0;
        }

    }

    return false;
}

function isSafe(board, row, col, val) {

    for (let c = 0; c < board[0].length; c++) {
        if (board[row][c] == val) {
            return false;
        }
    }

    for (let r = 0; r < board.length; r++) {
        if (board[r][col] == val) {
            return false;
        }
    }

    let colStart = col - col % 3;
    let rowStart = row - row % 3;

    for (let r = rowStart; r < rowStart + 3; r++) {
        for (let c = colStart; c < colStart + 3; c++) {
            if (board[r][c] == val) {
                return false;
            }
        }
    }

    return true;
}

function displayBoard(matrix) {
    let i = 0;
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            document.getElementById(i).classList.remove("NotValidStep");
            document.getElementById(i++).innerText = matrix[r][c];
        }
    }
}
