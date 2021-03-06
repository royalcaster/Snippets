//setup light/darkmode
setupDarkmode();

// Make all the DIV elements draggable:
var containers = document.getElementsByClassName("snippet_container");
var darkmodeEnabled = false;

function updateDrag(){
  for(var i = 0; i < containers.length; i++) {
    dragSnippet(containers[i]);
  }
}

//FARBCODE

const colors = ["#FD6057","#FD815B","#FFE273","#02A787","#1D8CC2"]


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

  var note_box = document.createElement("div");
  note_box.className = "note_box";
  
  var text_area = document.createElement("textarea");
  text_area.className = "note_textarea";
  text_area.spellcheck = false;
  text_area.placeholder = "Ihre Notiz..." 

  note_box.appendChild(text_area);
  content_box.appendChild(note_box);
  snippet_container.getElementsByClassName("snippet_body")[0].appendChild(content_box);
  document.getElementById("workplace_container").appendChild(snippet_container);
  updateDrag();
}

function createTable(rows, cols) {
    let snippet_container = createSnippetContainer("table");

    let content_box = document.createElement("div");
    content_box.className = "content_box flex";

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

    var button_addCol = document.createElement("button");
    button_addCol.className = "button_table_tool";
    button_addCol.innerHTML = "neue Spalte";
    var button_addRow = document.createElement("button");
    button_addRow.className = "button_table_tool";
    button_addRow.innerHTML = "neue Zeile";
    var button_remCol = document.createElement("button");
    button_remCol.className = "button_table_tool";
    button_remCol.innerHTML = "Spalte löschen";
    var button_remRow = document.createElement("button");
    button_remRow.className = "button_table_tool";
    button_remRow.innerHTML = "Zeile löschen";
  
    var tool_container_col = document.createElement("div");
    tool_container_col.className = "tool_container_col";

    var tool_container_row = document.createElement("div");
    tool_container_row.className = "tool_container_row";

    var table_box = document.createElement("div");
    table_box.className = "table_box";

    var breaker = document.createElement("hr");
    breaker.className = "breaker";

    table_box.appendChild(table);

    tool_container_col.appendChild(button_addCol);
    tool_container_col.appendChild(button_remCol);
    tool_container_row.appendChild(button_addRow);
    tool_container_row.appendChild(button_remRow);
    content_box.appendChild(table_box);
    content_box.appendChild(tool_container_col);
    content_box.appendChild(breaker);
    content_box.appendChild(tool_container_row);
    snippet_container.getElementsByClassName("snippet_body")[0].appendChild(content_box);

    let maxwidth = (cols * 150) + "px";
    snippet_container.style.maxWidth = maxwidth;

    let maxheight = (rows * 45 + 100 + 200) + "px";
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
  list.id = "list";

  var list_item = document.createElement("li");
  list_item.className = "list_item";

  var list_item_container = document.createElement("div");
  list_item_container.className = "list_item_container";

  var list_item_input = document.createElement("textarea");
  list_item_input.className = "list_item_input autoExpand";
  list_item_input.style.resize = "none";
  list_item_input.style.overflow = "hidden";
  list_item_input.placeholder = "Neue Aufgabe...";
  list_item_input.autofocus = true;
  list_item_input.spellcheck = false;
  list_item_input.rows = "1";
  list_item_input.minRows = "1";
  list_item_input.onkeydown = function () {
    console.log("test");
    updateListSize(snippet_container);
  }
  
  var remove_icon = document.createElement("i");
  remove_icon.className = "material-icons remove_icon";
  remove_icon.innerHTML = "&#xe14c;";

  var bullet_icon = document.createElement("i");
  bullet_icon.className = "material-icons bullet_icon";
  bullet_icon.innerHTML = "&#xe836;";

  var list_item_remove = document.createElement("button");
  list_item_remove.className = "list_item_remove";
  list_item_remove.appendChild(remove_icon);
  

  var button_add = document.createElement("button");
  button_add.className = "button_add";
  button_add.innerHTML = "Neue Aufgabe";
  button_add.addEventListener("click", function addTask(){
      var list_item = createListItem();
      list.appendChild(list_item);
      updateListSize(snippet_container);
      for (let i = 0; i < snippet_container.getElementsByClassName("list_item_input").length; i++) {
          snippet_container.getElementsByClassName("list_item_input")[i].onkeydown = function () {
            updateListSize(snippet_container);
          }
          snippet_container.getElementsByClassName("list_item_remove")[i].onclick = function () {
            //Delete Task
            var screw_line = document.createElement("hr");
            screw_line.className = "screw_line";
            var width = snippet_container.clientWidth -40 + "px";
            //screw_line.style.width = width;
            screw_line.animate([
              // keyframes
              { width: "1px" },
              { width: width }
            ], {
              // timing options
              duration: 500,
              iterations: 1,
              easing: "cubic-bezier(.62,.11,.03,1)"
            });
            snippet_container.getElementsByClassName("list_item_remove")[i].parentElement.appendChild(screw_line);

            //warten
            setTimeout(() => { 
              //list item removen
              snippet_container.getElementsByClassName("list_item")[i].style.display = "none";
             }, 500);
             updateListSize(snippet_container);
          }
      }
  });

  list_item_container.appendChild(list_item_input);
  list_item.appendChild(bullet_icon);
  list_item.appendChild(list_item_container);
  list_item.appendChild(list_item_remove);
  list.appendChild(list_item);
  content_box.appendChild(list);
  content_box.appendChild(button_add);
  snippet_container.getElementsByClassName("snippet_body")[0].appendChild(content_box);
  snippet_container.style.maxHeight = "216px";
  snippet_container.style.minHeight = "216px";
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

  var snippet_close = document.createElement("button");
  snippet_close.className = "snippet_close";
  snippet_close.onclick = function () {
    snippet_container.remove();
  }

  var icon_close = document.createElement("i");
  icon_close.className = "material-icons icon_close";
  icon_close.innerHTML = "&#xe5cd;";
  snippet_close.appendChild(icon_close);

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
  snippet_header.appendChild(snippet_close);
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

function createListItem() {

  var list_item = document.createElement("li");
  list_item.className = "list_item";

  var list_item_container = document.createElement("div");
  list_item_container.className = "list_item_container";

  var list_item_input = document.createElement("textarea");
  list_item_input.className = "list_item_input autoExpand";
  list_item_input.style.resize = "none";
  list_item_input.style.overflow = "hidden";
  list_item_input.placeholder = "Neue Aufgabe...";
  list_item_input.autofocus = true;
  list_item_input.spellcheck = false;
  list_item_input.rows = "1";
  
  var remove_icon = document.createElement("i");
  remove_icon.className = "material-icons remove_icon";
  remove_icon.innerHTML = "&#xe14c;";

  var bullet_icon = document.createElement("i");
  bullet_icon.className = "material-icons bullet_icon";
  bullet_icon.innerHTML = "&#xe836;";

  var list_item_remove = document.createElement("button");
  list_item_remove.className = "list_item_remove";
  list_item_remove.appendChild(remove_icon);

  list_item_container.appendChild(list_item_input);
  list_item.appendChild(bullet_icon);
  list_item.appendChild(list_item_container);
  list_item.appendChild(list_item_remove);
  return list_item;
}

//Auto-Resizing Textarea Script von Codepen
function getScrollHeight(elm){
  var savedValue = elm.value
  elm.value = ''
  elm._baseScrollHeight = elm.scrollHeight
  elm.value = savedValue
}

function onExpandableTextareaInput({ target:elm }){
  // make sure the input event originated from a textarea and it's desired to be auto-expandable
  if( !elm.classList.contains('autoExpand') || !elm.nodeName == 'TEXTAREA' ) return
  
  var minRows = elm.getAttribute('data-min-rows')|1, rows;
  !elm._baseScrollHeight && getScrollHeight(elm)

  elm.rows = minRows
  rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
  elm.rows = minRows + rows
}

function updateListSize(element) {
  var content_height = 0;
  for (let i = 0; i < element.getElementsByClassName("list_item").length; i++) {
    content_height += element.getElementsByClassName("list_item")[i].offsetHeight + 7;
    console.log(content_height);
  }

  var container_height = 35 + 82 + content_height + 60 + "px";
  element.style.minHeight = container_height;
  element.style.maxHeight = container_height;
}

function toggleDarkmode(){
    if (darkmodeEnabled) {
      document.getElementById("darkmode_icon").innerHTML = "&#xf204;";
      darkmodeEnabled = false;
      setupLightmode();
    }
    else {
      document.getElementById("darkmode_icon").innerHTML = "&#xf205;";
      darkmodeEnabled = true;
      setupDarkmode();
    }
}

function setupDarkmode(){
  document.getElementById("workplace_container").style.backgroundColor = "#1C1C1C";
  document.getElementById("container_navbar").style.backgroundColor = "#2B2B2B";
  document.getElementById("container_toolbar").style.backgroundColor = "#2B2B2B";
  document.getElementById("main_title").style.color = "rgba(255,255,255,0.9)";
  document.getElementById("container_navbar").style.color = "white";

  for (let i = 0; i<document.getElementsByClassName("options_button").length;i++){
    document.getElementsByClassName("options_button")[i].style.color = "rgba(255,255,255,0.9)";
    document.getElementsByClassName("options_button")[i].style.fontWeight = "300";
  }
}

function setupLightmode(){
  document.getElementById("workplace_container").style.backgroundColor = "#c0c0c0";
  document.getElementById("container_navbar").style.backgroundColor = "white";
  document.getElementById("container_toolbar").style.backgroundColor = "white";
  document.getElementById("main_title").style.color = "rgba(0, 0, 0, 0.75)";

  for (let i = 0; i<document.getElementsByClassName("options_button").length;i++){
    document.getElementsByClassName("options_button")[i].style.color = "rgba(0,0,0,0.75)";
    document.getElementsByClassName("options_button")[i].style.fontWeight = "500";
  }
}

//MENU
  

var workplaces = [];

function createWorkplace(key, title, date, color_index) {
  workplaces.push({
    key: key,
    title: title,
    date: date,
    color_index: color_index
  });
}

function updateCardList() {
  document.getElementById("cards_container").innerHTML = "";

  if(workplaces.length == 0) {
    let empty_icon = document.createElement("i");
    empty_icon.className = "material-icons empty_icon";
    empty_icon.innerHTML = "&#xe033;"
    let empty_message = document.createElement("p");
    empty_message.className = "empty_message";
    empty_message.innerHTML = "Du hast noch keine Arbeitspl&auml;tze erstellt.";
    document.getElementById("cards_container").appendChild(empty_icon);
    document.getElementById("cards_container").appendChild(empty_message);
  }
  else {
    for (let i = 0; i < workplaces.length; i++) {
    document.getElementById("cards_container").appendChild(createCard(i, workplaces[i].title, workplaces[i].date,workplaces[i].color_index));
  }
  }  
}

//cardlist updaten, damit empty message angezeigt wird
  updateCardList();

function createCard(key, title, date, color_index) {
  //key um an objekte in worplaces ranzukommen
  var index = key;
  //bool for toggle dropdown
  var dropdownIsActive = false;
  //create DOM elements
    let card_container = document.createElement("div");
    card_container.className = "card_container";

    let color_panel = document.createElement("div");
    color_panel.className = "color_panel";
    color_panel.style.backgroundColor = colors[color_index];

    let card_content = document.createElement("div");
    card_content.className = "card_content";

    let card_title = document.createElement("p");
    card_title.className = "card_title";
    card_title.innerHTML = title;

    let card_date = document.createElement("p");
    card_date.className = "card_date";
    card_date.innerHTML = date;

    let card_options_button = document.createElement("button");
    card_options_button.className = "card_options_button";
    card_options_button.addEventListener("click",function(){

      if (!dropdownIsActive) {
        dropdownIsActive = true;

        dropdown_container.style.animationName = "show";
        dropdown_container.style.animationDuration = "0.75s";
        dropdown_container.style.opacity = "1";

        dropdown_slide.style.animationName = "slide";
        dropdown_slide.style.animationDuration = "0.35s";
        dropdown_slide.style.width = "calc(100% - 330px)";

        card_options_icon.innerHTML = "&nbsp;&#xe5ca;";
      }
      else {
        dropdownIsActive = false;

        dropdown_container.style.animationName = "hide";
        dropdown_container.style.animationDuration = "0.75s";
        dropdown_container.style.opacity = "0";

        dropdown_slide.style.animationName = "leave";
        dropdown_slide.style.animationDuration = "0.35s";
        dropdown_slide.style.width = "0px ";

        card_options_icon.innerHTML = "&nbsp;&#xe8b8;";
        updateCardList();
      }
    })

    let card_options_icon = document.createElement("i");
    card_options_icon.className = "material-icons card_options_icon";
    card_options_icon.innerHTML = "&nbsp;&#xe8b8;";

    let card_entry = document.createElement("div");
    card_entry.className = "card_entry";

    let entry_icon = document.createElement("i");
    entry_icon.className = "material-icons entry_icon";
    entry_icon.innerHTML = "&nbsp;&#xe5da;"
    entry_icon.style.color = colors[color_index];

    //DROPDOWN MENU
    let dropdown_container = document.createElement("div");
    dropdown_container.className = "dropdown_container";

    let dropdown_slide = document.createElement("div");
    dropdown_slide.className = "dropdown_slide";

    let rename_container = document.createElement("div");
    rename_container.className = "rename_container";

    let rename_icon = document.createElement("i");
    rename_icon.className = "material-icons rename_icon";
    rename_icon.innerHTML = "&#xe150;";
    
    let rename_input = document.createElement("input");
    rename_input.className = "rename_input";
    rename_input.placeholder = "Neuer Titel...";
    rename_input.spellcheck = false;
    rename_input.onchange = function(){
      workplaces[index].title = rename_input.value;
    };

    let color_icon = document.createElement("i");
    color_icon.className = "material-icons rename_icon";
    color_icon.innerHTML = "&#xe3b7;";
    color_icon.style.top = "50px";

    let color_palette = document.createElement("div");
    color_palette.className = "color_palette";

    let delete_button = document.createElement("button");
    delete_button.className = "delete_button";
  
    let delete_icon = document.createElement("i");
    delete_icon.className = "material-icons delete_icon";
    delete_icon.innerHTML = "&#xe872;";

    let cb1 = createColorButton(0);
    cb1.style.marginLeft = "50px"
    cb1.addEventListener("click", function () {
      colorGui(color_panel,entry_icon,0)
      workplaces[index].color_index = 0;
    });

    let cb2 = createColorButton(1);
    cb2.addEventListener("click", function() {
      colorGui(color_panel, entry_icon,1)
      workplaces[index].color_index = 1;
    });

    let cb3 = createColorButton(2);
    cb3.addEventListener("click", function() {
      colorGui(color_panel, entry_icon,2)
      workplaces[index].color_index = 2;
    });

    let cb4 = createColorButton(3);
    cb4.addEventListener("click", function() {
      colorGui(color_panel, entry_icon,3)
      workplaces[index].color_index = 3;
    });

    let cb5 = createColorButton(4);
    cb5.addEventListener("click", function() {
      colorGui(color_panel, entry_icon, 4);
      workplaces[index].color_index = 4;
    });

    card_container.appendChild(dropdown_slide);
    card_container.appendChild(color_panel);
    card_container.appendChild(card_content);
    card_content.appendChild(card_title);
    card_content.appendChild(card_date);
    card_options_button.appendChild(card_options_icon);
    card_content.appendChild(card_options_button);
    card_entry.appendChild(entry_icon);
    card_container.appendChild(card_entry);
    rename_container.appendChild(rename_icon);
    rename_container.appendChild(rename_input);
    color_palette.appendChild(color_icon);
    color_palette.appendChild(cb1);
    color_palette.appendChild(cb2);
    color_palette.appendChild(cb3);
    color_palette.appendChild(cb4);
    color_palette.appendChild(cb5);
    dropdown_container.appendChild(color_palette);
    dropdown_container.appendChild(rename_container);
    delete_button.appendChild(delete_icon);
    dropdown_container.appendChild(delete_button);
    dropdown_container.appendChild(color_palette);
    card_container.appendChild(dropdown_container);
    return card_container;
}

function createColorButton(color) {
  let button = document.createElement("button");
  button.className = "color_button";
  button.style.backgroundColor = colors[color];
  return button;
}

function colorGui(element1, element2, index) {
  element1.style.backgroundColor = colors[index];
  element2.style.color = colors[index];
}

//Button für neue Arbeitsplätze zuweisen
document.getElementById("create_button").addEventListener("click",function() {
  createWorkplace(workplaces.length, "Neuer Arbeitsplatz", new Date().toString().substring(0,24), 0);
  updateCardList();
});

// global delegated event listener
document.addEventListener('input', onExpandableTextareaInput)