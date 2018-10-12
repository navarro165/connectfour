// (function(){


let playerOne = "playerOne";
let playerOneColor = 'rgb(29, 3, 175)';

let playerTwo = "playerTwo";
let playerTwoColor = 'rgb(175, 29, 3)';

let board = $('table tr');
let defaultCellColor = 'rgb(240, 240, 240)';
let fallingChipDelay = 125;
let chipFalling = false;


$("td").click(userFillPosition);

function userFillPosition() {
  var $this = $(this);
  var position = getClickPosition($this);
  var colPosition = position[0];
  var rowPosition = position[1];
  var bottomChip = checkBottom(colPosition);
  if (chipFalling === false) {
      chipFallOnClick(colPosition,rowPosition,bottomChip,"playerOne");
  }
}

function getClickPosition($this) {
  var col = $this.index();
  var row = $this.closest('tr').index();
  return [col,row];
}

function checkBottom(colPosition){
  if (colPosition!=null) {
    for (var row = 5; row >= 0; row--) {
      cellColor = getCurrentColor(colPosition,row);
      if (cellColor === defaultCellColor) {
        return row;
      }
    }
  }
}

function getCurrentColor(colPosition,rowPosition){
  return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color');
}

function chipFallOnClick(colPosition,rowPosition,bottomChip,player){
  chipFalling = true;
  if (player == "playerOne") {
      chipFallByUser(colPosition,rowPosition,bottomChip,player);
  } else if (player == "playerTwo") {
      chipFallByUser(colPosition,rowPosition,bottomChip,player);
  }
}

function chipFallByUser(colPosition,rowPosition,bottomChip,player){
  var timeDelay = 0;
  for (let rowFallingChip = rowPosition; rowFallingChip <= bottomChip; rowFallingChip++) {
    if (rowFallingChip != bottomChip) {
        setTimeout( () => { colorCellbyPlayer(colPosition,rowFallingChip,player); }, timeDelay);
    } else {
        setTimeout( () => {
          colorCellbyPlayer(colPosition,rowFallingChip,player);
          chipFalling = false;
        }, timeDelay);
        break;
    }
    setTimeout( () => { uncolorCellbyPlayer(colPosition,rowFallingChip,player); }, fallingChipDelay + timeDelay);
    timeDelay = timeDelay + fallingChipDelay;
    }
}

function colorCellbyPlayer(colPosition,rowPosition,player){
  if (player == "playerOne") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',playerOneColor);
  } else if (player == "playerTwo") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',playerTwoColor);
  }
}

function uncolorCellbyPlayer(colPosition,rowPosition,player){
  if (player == "playerOne") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',defaultCellColor);
  } else if (player == "playerTwo") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',defaultCellColor);
  }
}






function getCurrentCellPlayer(colPosition,rowPosition){
  var currentColor = getCurrentColor(colPosition,rowPosition);
  if (currentColor == playerOneColor) {
      return playerOne;
  } else if (currentColor == playerTwoColor) {
      return playerTwo;
  } else {
      return null;
  }
}








function checkHorizontalWin(){

}



function checkVerticalWin(){

}



function checkDiagonalWin(){

}


function checkCellsEqual(){

}


// })();
