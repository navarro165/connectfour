// (function(){


let user = "user";
let userColor = 'rgb(29, 3, 175)';

let computer = "computer";
let computerColor = 'rgb(175, 29, 3)';

let board = $('table tr');
let defaultCellColor = 'rgb(240, 240, 240)';
let fallingChipDelay = 125;
let chipFalling = false;

$("td").click(userFillPosition);



//make sure ALL FUNCTIONS WORK BY TAKING TURNS
//FOR EXAMLPE ON THE FUNCTION BELOW, WHERE IT SAYS USERS,
//SHOULD BE A GENERTIC VARIABLE THAT ALTERNATES BETWEEN
//PLAYER ONE AND TWO.
//THEN CHANGE MODIFY THE NAMES OF USER AND COMPUTER TO REFLECT PLAYER ONE AND TWO


function userFillPosition() {
  var $this = $(this);
  var position = getClickPosition($this);
  var colPosition = position[0];
  var rowPosition = position[1];
  var bottomChip = checkBottom(colPosition);
  if (chipFalling === false) {
      chipFallOnClick(colPosition,rowPosition,bottomChip,"user");
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
  if (player == "user") {
      chipFallByUser(colPosition,rowPosition,bottomChip,player);
  } else if (player == "computer") {
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
  if (player == "user") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',userColor);
  } else if (player == "computer") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',computerColor);
  }
}

function uncolorCellbyPlayer(colPosition,rowPosition,player){
  if (player == "user") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',defaultCellColor);
  } else if (player == "computer") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',defaultCellColor);
  }
}






function getCurrentCellPlayer(colPosition,rowPosition){
  var currentColor = getCurrentColor(colPosition,rowPosition);
  if (currentColor == userColor) {
      return user;
  } else if (currentColor == computerColor) {
      return computer;
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
