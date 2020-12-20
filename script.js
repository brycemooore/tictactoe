const cells = document.querySelectorAll(".cell");
let board =[[null, null, null], [null, null, null], [null, null, null]];
let currentTurn = 'x';
let gameOver = false;

resetGame = () => {
    board = [[null, null, null], [null, null, null], [null, null, null]];
    currentTurn = 'x';
    gameOver = false;
    cells.forEach(cell => cell.innerText = "");
}

makeMove = (e) => {
    if(e.target.innerText !== "")return;
    const xy = translateIndex(e.target.id);
    const x = parseInt(xy[0]);
    const y = parseInt(xy[1]);
    e.target.innerText = currentTurn
    board[x][y] = currentTurn;
    gameOver = checkWin();
    if(gameOver){
        alert("Game Over " + currentTurn + " won!");
        resetGame()
        return;
    }
    updateTurn();
}

cells.forEach((cell) => {
    cell.addEventListener("click", makeMove);
})

translateIndex = (index) =>{
    return index.split("-")
}

checkWin = () => {
    const diagonalOne = [board[0][0], board[1][1], board[2][2]];
    const diagonalTwo = [board[0][2], board[1][1], board[2][0]];
    const arrayToCheck = [...board];
    let bool = false;
    console.log(arrayToCheck)
    arrayToCheck.push(diagonalOne);
    arrayToCheck.push(diagonalTwo);
    arrayToCheck.forEach(array => {
        if(checkArray(array)) bool = true;
    })
    return bool;
}

checkArray = (array) => {
    let comparator = array[0];

    if(array.includes(null)) return false

    for(let i = 1; i < array.length; i++){
        if(array[i] != comparator) return false;
    }

    return true
}

updateTurn = () => {
    currentTurn = (currentTurn === "x" ? "o" : "x");
}
