function $(cssSelector) {
    return document.querySelector(cssSelector)
}


const instruction = $('#instruction')
const closeInstruction = $('#close-instruction')
const openInstruction = $('#open-instruction')
const turnMessage = document.querySelector('#message')
const boardRows = document.getElementsByTagName('tr');
const boardCells = document.getElementsByTagName('td');
const boardTiles = document.querySelectorAll('.tile')
const gameBoard = $('.gameboard')
const resultScreen = $('.result-modal')
const resultMessage = $('#result-message')
const resetButton = $('#reset')

let player1 ='Human';
let player1Color = 'red';
let player1Icon = '🚀';
const player2 = 'Alien';
let player2Color = 'yellow';
let player2Icon = '👾';
let currentPlayer = 1;
let winner;

openInstruction.addEventListener('click', () => {
    instruction.style.display = 'flex';
    gameBoard.style.display = 'none';
})
closeInstruction.addEventListener('click', () => {
    instruction.style.display = 'none';
    gameBoard.style.display = 'initial';
})


// for (i = 0; i < boardCells.length; i ++){
//     boardCells[i].addEventListener('click', (e) =>{
//         console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
//     });
// };


function changeColor(e){
    let column = e.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--){
        if (boardRows[i].children[column].style.backgroundColor == 'white'){
            if (boardRows[i].children[column].innerText == ''){
            row.push(boardRows[i].children[column]);
            if (currentPlayer === 1){
                row[0].style.backgroundColor = `${player1Color}`;
                row[0].innerText = player1Icon;
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    resultMessage.textContent = `${player1} win!`;
                    resultScreen.style.display = 'flex';
                    turnMessage.style.color = player1Color;
                    return;
                }else if (drawCheck()){
                    turnMessage.textContent = 'DRAW!';
                    return;
                }else{
                    turnMessage.textContent = `${player2}'s turn`
                    return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = `${player2Color}`;
                row[0].innerText = player2Icon;
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    resultScreen.style.display = 'flex'
                    resultMessage.textContent= `${player2} win!`
                    resultMessage.style.color = player2Color;
                }else if (drawCheck()){
                    turnMessage.textContent = 'DRAW!';
                }else{
                    turnMessage.textContent = `${player1}'s turn`;
                    return currentPlayer = 1;
                }
                
            }
         }
        }
    }
}

Array.prototype.forEach.call(boardCells, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

function horizontalCheck(){
    for (let row = 0; row < boardRows.length; row++){
        for (let col =0; col < 4; col++){
           if (colorMatchCheck(boardRows[row].children[col].style.backgroundColor,boardRows[row].children[col+1].style.backgroundColor, 
                                boardRows[row].children[col+2].style.backgroundColor, boardRows[row].children[col+3].style.backgroundColor)){
               return true;
           }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(boardRows[row].children[col].style.backgroundColor, boardRows[row+1].children[col].style.backgroundColor,
                                boardRows[row+2].children[col].style.backgroundColor,boardRows[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }
}

function diagonalCheck(){
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(boardRows[row].children[col].style.backgroundColor, boardRows[row+1].children[col+1].style.backgroundColor,
                boardRows[row+2].children[col+2].style.backgroundColor,boardRows[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}

function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(boardRows[row].children[col].style.backgroundColor, boardRows[row-1].children[col+1].style.backgroundColor,
                boardRows[row-2].children[col+2].style.backgroundColor,boardRows[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}

function drawCheck(){
    let fullSlot = []
    for (i=0; i < boardCells.length; i++){
        if (boardCells[i].style.backgroundColor !== 'white'){
            fullSlot.push(boardCells[i]);
        }
    }
    if (fullSlot.length === boardCells.length){
        return true;
    }
}

resetButton.addEventListener('click', () => {
    boardTiles.forEach(tile => {
        tile.style.backgroundColor = 'white';
        tile.innerText = '';
    });
    turnMessage.style.color = 'black';
    resultScreen.style.display = 'none';
    return (currentPlayer === 1 ? turnMessage.textContent = `${player1}'s turn` : turnMessage.textContent = `${player2}'s turn`);
});
