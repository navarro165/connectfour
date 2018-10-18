// (function(){
let playerOne = "playerOne";
let playerOneColor = 'rgb(29, 3, 175)';
let playerOneScore = 0;
let playerOneName = prompt('Player One: Please enter your name, you will be blue.');

let playerTwo = "playerTwo";
let playerTwoColor = 'rgb(175, 29, 3)';
let playerTwoScore = 0;
let playerTwoName = prompt('Player Two: Please enter your name, you will be red.');

let board = $('table tr');
let defaultCellColor = 'rgb(240, 240, 240)';
let fallingChipDelay = 125;
let chipFalling = false;
let whosTurnisIt = playerOne;

$("#playerOne").text(`${playerOneName}'s score is ${playerOneScore}`);
$("#playerTwo").text(`${playerTwoName}'s score is ${playerTwoScore}`);
$(".turnTag").text(`Your turn ${playerOneName}!`);

//the game starts with player 1 clicking on any of the cells
//then each click is alternated between players 1 and 2
$("td").on('click',function(){
    var $this = $(this);
    var position = getClickPosition($this);
    var colPosition = position[0];
    var rowPosition = position[1];
    var bottomChip = checkBottom(colPosition);
    displayWhosTurnisIt(whosTurnisIt);
    chipFallOnClick(colPosition,rowPosition,bottomChip,whosTurnisIt); //once chip falls, winner would be determined and score updated
});

function displayWhosTurnisIt(whosTurnisIt){
  if (whosTurnisIt == playerTwo) {
      $(".turnTag").text(`Your turn ${playerOneName}!`);
  } else if (whosTurnisIt == playerOne) {
      $(".turnTag").text(`Your turn ${playerTwoName}!`);
  } else{
      $(".turnTag").text(``);
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
  if (chipFalling === false && getCurrentColor(colPosition,rowPosition) === defaultCellColor) {
    chipFalling = true;
    if (player == "playerOne") {
        chipFallByUserAndCheckWin(colPosition,rowPosition,bottomChip,player);
    } else if (player == "playerTwo") {
        chipFallByUserAndCheckWin(colPosition,rowPosition,bottomChip,player);
    }
  }
}

function chipFallByUserAndCheckWin(colPosition,rowPosition,bottomChip,player){
  var timeDelay = 0;
  for (let rowFallingChip = rowPosition; rowFallingChip <= bottomChip; rowFallingChip++) {
    if (rowFallingChip != bottomChip) {
        setTimeout( () => { colorCellbyPlayer(colPosition,rowFallingChip,player); }, timeDelay);
    } else {
        setTimeout( () => {
          colorCellbyPlayer(colPosition,rowFallingChip,player);
          checkForWinnerAndUpdateScore();
          chipFalling = false;
          if (whosTurnisIt == playerOne) {
              whosTurnisIt = playerTwo;
          } else {
              whosTurnisIt = playerOne;
          }
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

function checkForWinnerAndUpdateScore(){
  var hWin = checkHorizontalWin();
  var vWin = checkVerticalWin();
  var dWin = checkDiagonalWin();
  if (hWin !== undefined) {
      console.log("w");
      return hWin;
  } else if (vWin !== undefined) {
      return vWin;
  } else if (dWin !== undefined) {
      return dWin;
  }
}

function checkHorizontalWin(){
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      var matched =  checkForMatch(getCurrentColor(col, row), getCurrentColor(col+1, row), getCurrentColor(col+2, row), getCurrentColor(col+3, row));
      if (matched == true) {
        return getCurrentCellPlayer(col, row)
      } else {
        continue;
      }
    }
  }
}

function checkVerticalWin(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      var matched =  checkForMatch(getCurrentColor(col, row), getCurrentColor(col, row+1), getCurrentColor(col, row+2), getCurrentColor(col, row+3));
      if (matched == true) {
        return getCurrentCellPlayer(col, row);
      } else {
        continue;
      }
    }
  }
}

function checkDiagonalWin(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 6; row++) {
      var matchedPositiveSlope = checkForMatch(getCurrentColor(col, row), getCurrentColor(col+1, row+1), getCurrentColor(col+2, row+2), getCurrentColor(col+3, row+3));
      var matchedNegativeSlope = checkForMatch(getCurrentColor(col, row), getCurrentColor(col+1, row-1), getCurrentColor(col+2, row-2), getCurrentColor(col+3, row-3));
      if (matchedPositiveSlope == true) {
        return getCurrentCellPlayer(col, row);
      } else if (matchedNegativeSlope == true) {
        return getCurrentCellPlayer(col, row);
      } else {
        continue;
      }
    }
  }
}

function checkForMatch(firstCell,secondCell,thirdCell,fourthCell){
  return (firstCell === secondCell && firstCell === thirdCell && firstCell === fourthCell && firstCell !== defaultCellColor);
}

function getCurrentCellPlayer(colPosition,rowPosition){
  var currentColor = getCurrentColor(colPosition,rowPosition);
  if (currentColor == playerOneColor) {
      return playerOne;
  } else if (currentColor == playerTwoColor) {
      return playerTwo;
  } else {
      return "empty";
  }
}


// })();
