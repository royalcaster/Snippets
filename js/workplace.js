// Make all the DIV elements draggable:
var containers = document.getElementsByClassName("snippet_container");

function updateDrag(){
  for(var i = 0; i < containers.length; i++) {
    dragSnippet(containers[i]);
  }
}


//drag-funktion für Snippet
function dragSnippet(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elmnt.firstElementChild) {
    // if present, the header is where you move the DIV from:
    elmnt.firstElementChild.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function createNote() {
  let snippet_container = createSnippetContainer("note");

  var content_box = document.createElement("div");
  content_box.className = "content_box";
  
  var text_area = document.createElement("textarea");
  text_area.className = "note_textarea";
  text_area.spellcheck = false;
  text_area.placeholder = "Ihre Notiz..." 

  content_box.appendChild(text_area);
  snippet_container.getElementsByClassName("snippet_body")[0].appendChild(content_box);
  document.getElementById("workplace_container").appendChild(snippet_container);
  updateDrag();
}

function createTable(rows, cols) {
    let snippet_container = createSnippetContainer("table");

    let content_box = document.createElement("div");
    content_box.className = "content_box";

    var table = document.createElement("table");
    table.className = "table";

    //Schleife für Zeilen
    for (var i = 0; i < rows; i++) {
      var row = document.createElement("tr");
      row.className = "table_row";
      //Schleife für Spalten
      for (var u = 0; u < cols; u++) {
        let col = document.createElement("td");
        col.className = "table_cell";
        
        let input = document.createElement("input");
        input.className = "table_textarea";

        col.appendChild(input);
        row.appendChild(col);
      }
      table.appendChild(row);
    }

    content_box.appendChild(table);
    snippet_container.getElementsByClassName("snippet_body")[0].appendChild(content_box);

    let maxwidth = (cols * 150) + "px";
    snippet_container.style.maxWidth = maxwidth;

    let maxheight = (rows * 45 + 100) + "px";
    snippet_container.style.minHeight = maxheight;
    snippet_container.style.maxHeight = maxheight;

    document.getElementById("workplace_container").appendChild(snippet_container);
    updateDrag();
}

function createList(){
  var snippet_container = createSnippetContainer("list");

  var content_box = document.createElement("div");
  content_box.className = "content_box";
  content_box.id = "content_box_list";

  var list = document.createElement("ul");
  list.className = "list";

  var list_item = document.createElement("li");
  list_item.className = "list_item";

  var list_item_input = document.createElement("textarea");
  list_item_input.className = "list_item_input";

  var list_item_remove = document.createElement("button");
  list_item_remove.className = "list_item_remove";
  list_item_remove.innerHTML = "x";

  var button_add = document.createElement("button");
  button_add.className = "button_add";
  button_add.innerHTML = "Hinzufügen";

  list_item.appendChild(list_item_input);
  list_item.appendChild(list_item_remove);
  list.appendChild(list_item);
  content_box.appendChild(list);
  content_box.appendChild(button_add);
  snippet_container.getElementsByClassName("snippet_body")[0].appendChild(content_box);
  document.getElementById("workplace_container").appendChild(snippet_container);
  updateDrag();
}

function getTableDimension() {
  //Workplace dunkler machen als Kontrast
  darkenWorkplace();
  var popup_container = document.createElement("div");
  popup_container.className = "popup_container";
  popup_container.id = "popup_container";

  var tag_rows = document.createElement("p");
  tag_rows.className = "input_tag";
  tag_rows.innerHTML = "Zeilen:";

  var tag_cols = document.createElement("p");
  tag_cols.className = "input_tag";
  tag_cols.innerHTML = "Spalten:";

  var input_rows = document.createElement("input");
  input_rows.className = "popup_input";
  input_rows.id = "input_rows";

  var input_cols = document.createElement("input");
  input_cols.className = "popup_input";
  input_cols.id = "input_cols";

  var rows_container = document.createElement("div");
  rows_container.className = "input_container";

  var cols_container = document.createElement("div");
  cols_container.className = "input_container";

  var br = document.createElement("br");

  var commit_button = document.createElement("button");
  commit_button.innerHTML = "Erstellen";
  commit_button.className = "table_commit_button";
  commit_button.id = "table_commit_button";
  commit_button.onclick = function(){
    lightenWorkplace();
    var rows = input_rows.value;
    var cols = input_cols.value;
    document.getElementById("popup_container").remove();
    createTable(rows, cols);
  };

  rows_container.appendChild(tag_rows);
  rows_container.appendChild(input_rows);
  cols_container.appendChild(tag_cols);
  cols_container.appendChild(input_cols);
  popup_container.appendChild(rows_container);
  popup_container.appendChild(cols_container);
  popup_container.appendChild(commit_button);
  document.getElementById("container_toolbar").appendChild(popup_container);
}

function createSnippetContainer(type){
  var snippet_container = document.createElement("div");
  snippet_container.className = "snippet_container";

  let offset = window.pageYOffset + 100;
  let test = offset + "px";
  snippet_container.style.top = test;

  var snippet_header = document.createElement("div");
  snippet_header.className = "snippet_header";

  var h_lines = document.createElement("div");
  h_lines.className = "h_lines";

  var h_line = document.createElement("hr");
  h_line.className = "h_line";

  var snippet_body = document.createElement("div");
  snippet_body.className = "snippet_body";

  var title_box = document.createElement("div");
  title_box.className = "title_box";

  var icon = document.createElement("i");

  switch (type) {
  case "note":
    icon.className = "material-icons snippet_icon icon_note";
    icon.innerHTML = "&#xe06f;";
    break;
  case "table":
    icon.className = "material-icons snippet_icon icon_table";
    icon.innerHTML = "&#xe3ec;";
    break;
  case "list":
    icon.className = "material-icons snippet_icon icon_list";
    icon.innerHTML = "&#xe241;";
    break;
  }

  var title_field = document.createElement("input");
  title_field.className = "title_field";
  title_field.spellcheck = false;
  title_field.placeholder = "Unbenannt";

  h_lines.appendChild(h_line);
  snippet_header.appendChild(h_lines);
  snippet_container.appendChild(snippet_header);
  title_box.appendChild(icon);
  title_box.appendChild(title_field);
  snippet_body.appendChild(title_box);
  snippet_container.appendChild(snippet_body);
  //document.getElementById("workplace_container").appendChild(snippet_container);
  return snippet_container;
}

function darkenWorkplace(){
  document.getElementById("workplace_container").style.filter = "brightness(0.5)";
}

function lightenWorkplace() {
  document.getElementById("workplace_container").style.filter = "brightness(1)"; 
}