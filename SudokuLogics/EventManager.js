

let previousBox = document.getElementById(0);

// this is for click & input event
for (let i = 0; i < 81; i++) {

    let box = document.getElementById(i);

    box.addEventListener("click", () => {



        box.classList.add("OnclickStyle");

        if (previousBox != box) {
            previousBox.classList.remove("OnclickStyle");
            previousBox = box;
        }


        box.addEventListener("input", () => {
            let num = box.innerText;

            if (!isNaN(num) && num >= 1 && num <= 9) {
                setValue(i, num);
            } else {
                box.innerText = null;
                setValue(i, 0);
            }
        });
    });
}

let solveBtn = document.getElementById("solveBtn");

solveBtn.addEventListener("click", () => {
    sudokuSolver(matrix);
});

