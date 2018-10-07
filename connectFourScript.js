var user = "user";
var userColor = 'rgb(29, 3, 175)';

var computer = "computer";
var computerColor = 'rgb(175, 29, 3)';

var board = $('table tr');
var defaultCellColor = 'rgb(240, 240, 240)';



$("td").click(getClickPosition);

function getClickPosition() {
  var $this = $(this);
  var col = $this.index();
  var row = $this.closest('tr').index();

  console.log([col,row].join(','));
  colorCellbyPlayer(col,row,user);
}



function colorCellbyPlayer(colPosition,rowPosition,player){
  if (player == "user") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',userColor);
  } else if (player == "computer") {
      return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color',computerColor);
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


function getCurrentColor(colPosition,rowPosition){
  return board.eq(rowPosition).find('td').eq(colPosition).find('button').css('background-color');
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


//check if current position is bottom, if not make it seem like falling to checkBottom
//reanalyze other functions to improve logic
function chipFallOnClick(){

}


function checkHorizontalWin(){

}



function checkVerticalWin(){

}



function checkDiagonalWin(){

}


function checkCellsEqual(){

}
