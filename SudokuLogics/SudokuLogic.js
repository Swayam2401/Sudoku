let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

randomBoard(board);

let matrix = [[], [], [], [], [], [], [], [], []];
let id = 0;

for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
        if (board[r][c] != 0) {
            let box = document.getElementById(id);
            box.innerText = board[r][c];
            box.classList.add("UnChangable");
            box.contentEditable = "false";
        }
        matrix[r][c] = board[r][c];
        id++;
    }
}

function setValue(id, val) {

    let row = Math.floor(id / 9);
    let col = id % 9;

    let flag = isValid(row, col, val);

    board[row][col] = val;

    if (flag) {
        document.getElementById(id).classList.remove("NotValidStep");
    } else {
        document.getElementById(id).classList.add("NotValidStep");
    }
}

function isValid(row, col, val) {

    let flag = true;
    let id = -1;

    //column checking
    for (let c = 0; c < board[0].length; c++) {
        if (c == col) {
            continue;
        }

        id = row * 9 + c;

        if (board[row][c] == val) {
            document.getElementById(id).classList.add("NotValidStep");
            flag = false;
        } else {
            document.getElementById(id).classList.remove("NotValidStep");
        }
    }

    //row checking
    for (let r = 0; r < board.length; r++) {
        if (r == row) {
            continue;
        }

        id = r * 9 + col;

        if (board[r][col] == val) {
            document.getElementById(id).classList.add("NotValidStep");
            flag = false;
        } else {
            document.getElementById(id).classList.remove("NotValidStep");
        }
    }

    //3 x 3 grid checking
    let colStart = col - col % 3;
    let rowStart = row - row % 3;

    for (let r = rowStart; r < rowStart + 3; r++) {
        for (let c = colStart; c < colStart + 3; c++) {

            if (c == col && r == row) {
                continue;
            }

            id = (r % 3 + rowStart) * 9 + c;

            if (board[r][c] == val) {
                document.getElementById(id).classList.add("NotValidStep");
                flag = false;
            } else {
                document.getElementById(id).classList.remove("NotValidStep");
            }
        }
    }

    return flag;
}

//------------------------------------------------------------------------------------------------

function randomBoard(board) {

    for (let r = 0; r < 9; r++) {
        let time = randomTime();

        for (let t = 0; t < time; t++) {

            let col = randomColumn();

            if (board[r][col] != 0) {
                continue;
            }

            while (board[r][col] == 0) {
                let val = randomNumber();

                if (isSafe(board, r, col, val)) {
                    board[r][col] = val;
                    break;
                }
            }
        }
    }
}

function randomColumn() {
    return Math.floor(Math.random() * 9);
}

function randomTime() {
    return Math.floor(Math.random() * 2 + 1);
}

function randomNumber() {
    return Math.floor(Math.random() * 9 + 1);
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

