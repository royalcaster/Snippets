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

function createSnippetContainer(type){
  var snippet_container = document.createElement("div");
  snippet_container.className = "snippet_container";

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