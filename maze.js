document.addEventListener('DOMContentLoaded', function() {
    let matrix = [];
    for(var i= 0; i < 6; i++) {
        matrix[i] = [];
        for(var j = 0; j < 6; j ++) {
            matrix[i][j] = 0;
            let cell = document.createElement("div");
            let grid = document.getElementById("grid-container")
            grid.appendChild(cell);
            cell.innerHTML = "0"
            cell.id = i + "" + j;
            cell.className = "grid-item";

            cell.addEventListener("click", () => {
            matrixMaker(cell, matrix);
            })
        }
    }

    let stack = [];

    let submit = document.getElementById("submit");
    submit.addEventListener("click", () => {
        findEntrance(matrix, stack);
        showPath(matrix, stack);
    })

    
})

function matrixMaker(cell, matrix) {
    let cellId = cell.id;

    if (cell.innerHTML == "0") {
        cell.innerHTML = "1";
        matrix[cellId[0]][cellId[1]] = 1;
    }
    else {
        cell.innerHTML = "0";
        matrix[cellId[0]][cellId[1]] = 0;
    }
}

function findEntrance(matrix, stack) {
    let header = document.getElementsByTagName("h1");
    for (let y = 0; y < 6; y++) {
        if (matrix[0][y] == "1") {
            stack.push([0] + ", " + [y]);
            let result = navigate(matrix, stack, 0, y);
            
            if (result == false || result == undefined) {
                header[0].innerHTML = "The Maze is wrong!"
            }
            return;
        }
    }
    header[0].innerHTML = "The Maze is wrong!";
    return;
}

function navigate(matrix, stack, x, y) {

    if (x == 5 && matrix[x][y] == 1) {
        return true;
    }

    try { //if no end
        if (x < 0 || y < 0 || x > 5 || y > 5) {
            return false;
        }

        matrix[x][y] = -1; //keep track of visited cell

        if (matrix[x + 1][y] == 1) {
            stack.push([x + 1] + ", " + [y]);
            if (navigate(matrix, stack, x + 1, y)) 
            { return true }
        }

        if (matrix[x][y + 1] == 1) {
            stack.push([x] + ", " + [y + 1]);
            if (navigate(matrix, stack, x, y + 1)) 
            { return true }
        }

        if (matrix[x][y - 1] == 1) {
            stack.push([x] + ", " + [y - 1]);
            if (navigate(matrix, stack, x, y - 1)) 
            { return true }
        }

        if (matrix[x - 1][y] == 1) {
            stack.push([x - 1] + ", " + [y]);
            if (navigate(matrix, stack, x - 1, y)) 
            { return true }
        }
        stack.pop();
        return false;
    }
    catch (error) {
        console.log(error)
    }
}


function showPath(matrix, stack) {
    for(c of stack) {
        let x = parseInt(c[0]);
        let y = parseInt(c[3]);
        let cell = document.getElementById(x+""+y);
        cell.style.background = "green";
    }
}
