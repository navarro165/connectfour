function getClickPosition() {
  var $this = $(this);
  var col = $this.index();
  var row = $this.closest('tr').index();
  console.log([col,row].join(','));
}

$("td").click(getClickPosition);
