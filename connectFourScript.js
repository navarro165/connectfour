$("td").click(getClickPosition);

function getClickPosition() {
  var $this = $(this);
  var col = $this.index();
  var row = $this.closest('tr').index();

  console.log([col,row].join(','));

}



function colorCellbyPlayer(player){
  if (player == "user") {

  } else if (player == "computer") {

  }
}



function checkBottom(clickedPosition){

}



function checkHorizontalWin(){

}



function checkVerticalWin(){

}



function checkDiagonalWin(){

}
