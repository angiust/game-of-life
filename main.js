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

function updateRowsColumns() {
  var nrow = document.getElementById('row').value;
  var ncol = document.getElementById('col').value;
  var griglia = document.getElementById('griglia');
  while (nrow > griglia.rows.length) {
      var row = griglia.insertRow(-1);
      for (var i = 0; i < griglia.rows[0].cells.length; i++) {
        addToggledCell(row);
      }
  }
  while (nrow < griglia.rows.length) {
      griglia.deleteRow(-1);
  }
  while (ncol > griglia.rows[0].cells.length) {
    for (var i = 0; i < griglia.rows.length; i++) {
      addToggledCell(griglia.rows[i]);
    }

  }
  while (ncol < griglia.rows[0].cells.length) {
    for (var i = 0; i < griglia.rows.length; i++) {
      griglia.rows[i].deleteCell(-1);
    }
  }
}
