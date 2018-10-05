var user = "user";
var userColor = 'rgb(29, 3, 175)';

var computer = "computer";
var computerColor = 'rgb(175, 29, 3)';

var board = $('table tr');



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



function checkBottom(clickedPosition){

}



function checkHorizontalWin(){

}



function checkVerticalWin(){

}



function checkDiagonalWin(){

}
