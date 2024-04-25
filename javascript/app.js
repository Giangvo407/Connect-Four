function $(cssSelector) {
    return document.querySelector(cssSelector)
}


const instruction = $('#instruction')
const closeInstruction = $('#close-instruction')
const openInstruction = $('#open-instruction')
const turnMessageEl = document.querySelector('#message')
const boardRowsEl = document.getElementsByTagName('tr');
const boardCellsEl = document.getElementsByTagName('td');
const boardTilesEl = document.querySelectorAll('.tile')
const gameBoard = $('.gameboard')
const resultScreen = $('#result-modal')
const resultMessage = $('#result-message')
const resetButton = $('#reset')

let player1 ='Human';
let player1Color = 'red';
let player1Icon = '🚀';
let player2 = 'Alien';
let player2Color = 'yellow';
let player2Icon = '🛸';
let currentPlayer = 1;


openInstruction.addEventListener('click', () => {
    instruction.style.display = 'flex';
    gameBoard.style.display = 'none';
})
closeInstruction.addEventListener('click', () => {
    instruction.style.display = 'none';
    gameBoard.style.display = 'initial';
})


function changeColor(e){
    let column = e.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--){
        if (boardRowsEl[i].children[column].style.backgroundColor == 'white'){
            if (boardRowsEl[i].children[column].innerText == ''){
            row.push(boardRowsEl[i].children[column]);
            if (currentPlayer === 1){
                row[0].style.backgroundColor = `${player1Color}`;
                row[0].innerText = player1Icon;
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    turnMessageEl.textContent = `${player1} won`;
                    resultMessage.textContent = `${player1} conquered space`;
                    resultScreen.style.display = 'flex';
                    return;
                }else if (drawCheck()){
                    turnMessageEl.textContent = 'DRAW!';
                    resultMessage.textContent= "Make love, not war!!";
                    resultScreen.style.display = 'flex';
                    return;
                }else{
                    turnMessageEl.textContent = `${player2}'s turn`
                    return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = `${player2Color}`;
                row[0].innerText = player2Icon;
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    turnMessageEl.textContent = `${player2} won`;
                    resultScreen.style.display = 'flex'
                    resultMessage.textContent= `${player2} conquered space!`
                }else if (drawCheck()){
                    turnMessageEl.textContent = 'DRAW!';
                    resultMessage.textContent= "Make love, not war!!";
                    resultScreen.style.display = 'flex';
                }else{
                    turnMessageEl.textContent = `${player1}'s turn`;
                    return currentPlayer = 1;
                }
                
            }
         }
        }
    }
}

Array.prototype.forEach.call(boardCellsEl, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

function horizontalCheck(){
    for (let row = 0; row < boardRowsEl.length; row++){
        for (let col =0; col < 4; col++){
           if (colorMatchCheck(boardRowsEl[row].children[col].style.backgroundColor,boardRowsEl[row].children[col+1].style.backgroundColor, 
                                boardRowsEl[row].children[col+2].style.backgroundColor, boardRowsEl[row].children[col+3].style.backgroundColor)){
               return true;
           }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(boardRowsEl[row].children[col].style.backgroundColor, boardRowsEl[row+1].children[col].style.backgroundColor,
                                boardRowsEl[row+2].children[col].style.backgroundColor,boardRowsEl[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }
}

function diagonalCheck(){
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(boardRowsEl[row].children[col].style.backgroundColor, boardRowsEl[row+1].children[col+1].style.backgroundColor,
                boardRowsEl[row+2].children[col+2].style.backgroundColor,boardRowsEl[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}

function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(boardRowsEl[row].children[col].style.backgroundColor, boardRowsEl[row-1].children[col+1].style.backgroundColor,
                boardRowsEl[row-2].children[col+2].style.backgroundColor,boardRowsEl[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}

function drawCheck(){
    let fullSlot = []
    for (i=0; i < boardCellsEl.length; i++){
        if (boardCellsEl[i].style.backgroundColor !== 'white'){
            fullSlot.push(boardCellsEl[i]);
        }
    }
    if (fullSlot.length === boardCellsEl.length){
        return true;
    }
}

resetButton.addEventListener('click', () => {
    boardTilesEl.forEach(tile => {
        tile.style.backgroundColor = 'white';
        tile.innerText = '';
    });
    resultScreen.style.display = 'none';
    return (currentPlayer === 1 ? turnMessageEl.textContent = `${player1}'s turn` : turnMessageEl.textContent = `${player2}'s turn`);
});
