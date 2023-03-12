function printError(Id, Msg) {
    document.getElementById(Id).innerHTML = Msg;
}

function cleanError(){
    printError("nameErr", "");
    printError("passErr", "");
}

function validateForm() {

    var name = document.Form.name.value;
    var password = document.Form.password.value;
    
    var regexEmri = /^[a-zA-Z\s]+$/;
    
    var regexPW=/^[A-Z][a-z]+\d{3,}[.|,]+$/;
    
    if(name == "") {
        cleanError();
        printError("nameErr", "Please enter your name");
        return false;
    }
    
    if(regexEmri.test(name) === false) {
        cleanError();
        printError("nameErr", "Please enter a valid name");
        return false;
    }

    if(password == ""){
        cleanError();
        printError("passErr","Please enter your password");
        return false;
    }

    if(regexPW.test(password)===false){
        cleanError();
        printError("passErr","Please enter a valid password");
        return false;
    }
    
    
    return true;
};