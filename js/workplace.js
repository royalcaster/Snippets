// Make the DIV element draggable:
dragSnippet(document.getElementById("snippet_container"));

//drag-funktion für Snippet
function dragSnippet(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("snippet_header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("snippet_header").onmousedown = dragMouseDown;
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

function togglePassword() {

  var e = document.getElementById("password_input");
  var p = document.getElementById("password_button");

  if (e.type === "password") {
    e.type = "text";
    p.innerHTML = "Passwort verstecken";
  }
  else {
    e.type = "password";
    p.innerHTML = "Passwort anzeigen";
  }

}