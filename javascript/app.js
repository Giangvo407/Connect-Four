
const turnMessage = document.querySelector('#message')
const boardRow = document.getElementsByTagName('tr');
const boardCell = document.getElementsByTagName('td');
const boardTile = document.querySelector('.tile')


let player1 ='me';
var player1Color = 'green';
const player2 = 'Computer';
var player2Color = 'yellow';
let currentPlayer = 1;
let winner;

for (i = 0; i < boardCell.length; i ++){
    boardCell[i].addEventListener('click', (e) =>{
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};

function changeColor(e){
    let column = e.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--){
        if (boardRow[i].children[column].style.backgroundColor == 'white'){
            row.push(boardRow[i].children[column]);
            if (currentPlayer === 1){
                row[0].style.backgroundColor = `${player1Color}`;
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    turnMessage.textContent = `${player1} win!`;
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
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    turnMessage.textContent = `${player2} win!`;
                    turnMessage.style.color = player2Color;
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

Array.prototype.forEach.call(boardCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

function horizontalCheck(){
    for (let row = 0; row < boardRow.length; row++){
        for (let col =0; col < 4; col++){
           if (colorMatchCheck(boardRow[row].children[col].style.backgroundColor,boardRow[row].children[col+1].style.backgroundColor, 
                                boardRow[row].children[col+2].style.backgroundColor, boardRow[row].children[col+3].style.backgroundColor)){
               return true;
           }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(boardRow[row].children[col].style.backgroundColor, boardRow[row+1].children[col].style.backgroundColor,
                                boardRow[row+2].children[col].style.backgroundColor,boardRow[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }
}

function diagonalCheck(){
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(boardRow[row].children[col].style.backgroundColor, boardRow[row+1].children[col+1].style.backgroundColor,
                boardRow[row+2].children[col+2].style.backgroundColor,boardRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}

function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(boardRow[row].children[col].style.backgroundColor, boardRow[row-1].children[col+1].style.backgroundColor,
                boardRow[row-2].children[col+2].style.backgroundColor,boardRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}

function drawCheck(){
    let fullSlot = []
    for (i=0; i < boardCell.length; i++){
        if (boardCell[i].style.backgroundColor !== 'white'){
            fullSlot.push(boardCell[i]);
        }
    }
    if (fullSlot.length === boardCell.length){
        return true;
    }
}