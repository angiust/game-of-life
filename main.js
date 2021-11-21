function toggle(element) {
  element.classList.toggle('black');
}

function addToggledCell(row) {
  var cell = row.insertCell(-1);
  function myFunc(event) {
    toggle(event.currentTarget);
  }
  cell.addEventListener('click', myFunc, false);
}

function addMissingRows(nrow, griglia) {
  while (nrow > griglia.rows.length) {
    var row = griglia.insertRow(-1);
    for (var i = 0; i < griglia.rows[0].cells.length; i++)
      addToggledCell(row);
  }
}

function deleteExcessRows(nrow, griglia) {
  while (nrow < griglia.rows.length)
    griglia.deleteRow(-1);
}

function addMissingCols(ncol, griglia) {
  while (ncol > griglia.rows[0].cells.length)
    for (var i = 0; i < griglia.rows.length; i++)
      addToggledCell(griglia.rows[i]);
}

function deleteExcessCols(ncol, griglia) {
  while (ncol < griglia.rows[0].cells.length)
    for (var i = 0; i < griglia.rows.length; i++)
      griglia.rows[i].deleteCell(-1);
}

function updateRowsColumns() {
  var nrow = document.getElementById('row').value;
  var ncol = document.getElementById('col').value;
  var griglia = document.getElementById('griglia');
  addMissingRows(nrow, griglia);
  deleteExcessRows(nrow, griglia);
  addMissingCols(ncol, griglia);
  deleteExcessCols(ncol, griglia);
}

function countNeigh(i_0, j_0) {
  var nrow = document.getElementById('row').value;
  var ncol = document.getElementById('col').value;
  var counter = 0;
  for (var i = -1; i <= 1; i++)
    if ((i+i_0 >= 0) && (i+i_0 < nrow))
      for (var j = -1; j <= 1; j++)
        if ((j+j_0 >= 0) && (j+j_0 < ncol) && !((i == 0) && (j == 0)))
          if (document.getElementById("griglia").rows[i+i_0].cells[j+j_0].classList.contains("black"))
            counter += 1;
  return counter;
}

function isAlive(i_0, j_0) {
  var neigh = countNeigh(i_0, j_0);
  if (document.getElementById("griglia").rows[i_0].cells[j_0].classList.contains("black"))
    return (2 <= neigh && neigh <= 3);
  else
    return neigh == 3;
}

function updateGrid() {
  var nrow = parseInt(document.getElementById('row').value, 10);
  var ncol = parseInt(document.getElementById('col').value, 10);
  var aggiornamenti = new Array(nrow).fill(0);
  for (var i = 0; i < aggiornamenti.length; i++)
    aggiornamenti[i] = new Array(ncol).fill(false);
  for (var i = 0; i < aggiornamenti.length; i++)
    for (var j = 0; j < aggiornamenti[i].length; j++)
      aggiornamenti[i][j] = isAlive(i, j);
  for (var i = 0; i < aggiornamenti.length; i++)
    for (var j = 0; j < aggiornamenti[i].length; j++)
      if (aggiornamenti[i][j])
        document.getElementById("griglia").rows[i].cells[j].classList.add("black");
      else
        document.getElementById("griglia").rows[i].cells[j].classList.remove("black");
}

var timer = null;

function play() {
  var timerLenght = document.getElementById('timerLenght').value;
  timer = setInterval(updateGrid, timerLenght);
}

function stop() {
  clearTimeout(timer);
  timer = null;
}

function updateTimer() {
  if (timer) {
    stop();
    play();
  }
}
