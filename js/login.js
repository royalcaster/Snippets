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

function togglePasswordRegister() {

    var e = document.getElementById("password_input_register");
    var p = document.getElementById("password_button_register");
  
    if (e.type === "password") {
      e.type = "text";
      p.innerHTML = "Passwort verstecken";
    }
    else {
      e.type = "password";
      p.innerHTML = "Passwort anzeigen";
    }
  
}

var objPeople = [
    {
        username: "sam",
        password: "1234"
    },
    {
        username: "matt",
        password: "test"
    },
    {
        username: "tom",
        password: "house"
    }
]

function login() {
    var username = document.getElementById("mail_input").value;
    var password = document.getElementById("password_input").value;

    //console.log(username + " | " + password);

    for (var i = 0; i < objPeople.length; i++) {
        if (username == objPeople[i].username && password == objPeople[i].password) {
            console.log("Nutzer " + i + " angemeldet.");
            document.getElementById("warning").innerHTML = " ";
        }
        else {
            document.getElementById("warning").innerHTML = "E-Mail-Adresse und Passwort stimmen nicht überein!";
        }
    }
}

function loadLoginForm() {
    document.getElementById("register_form").style.display = "none";
    document.getElementById("login_form").style.display = "block";
}

function loadRegisterForm(){
    document.getElementById("login_form").style.display = "none";
    document.getElementById("register_form").style.display = "block";
}

function registerUser() {
    var registerUser = document.getElementById("mail_input_register").value;
    var registerPassword = document.getElementById("password_input_register").value;

    for (var i = 0; i < objPeople.length; i++) {
        if (registerUser == objPeople[i].username) {
            document.getElementById("warning_register").innerHTML = "Diese E-Mail-Adresse ist bereits vergeben!";
            return;
        }
        else if (registerPassword.length < 8) {
            document.getElementById("warning_register_password").innerHTML = "Dein Passwort sollte mindestens 8 Zeichen";
            return;
        }
    }

    document.getElementById("warning_register").innerHTML = " ";
    document.getElementById("warning_register_password").innerHTML = " ";

    const dog = {
        name:   "peter",
        age:    "25"  
    }

    var newUser = {
        username: registerUser,
        password: registerPassword
    }

    const saveUser = (dog) => {
        const jsonData = JSON.stringify(dog)
        
    }

}