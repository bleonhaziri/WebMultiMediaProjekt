function printError(Id, Msg) {
    document.getElementById(Id).innerHTML = Msg;
}

function validateForm() {

    var name = document.Form.name.value;
    var email = document.Form.email.value;
    var password=document.Form.password.value;
    var mobile = document.Form.mobile.value;
    var country = document.Form.country.value;
    var gender = document.Form.gender.value;
    

    var nameErr = emailErr =passErr = mobileErr = countryErr = genderErr = true;
    

    if(name == "") {
        printError("nameErr", "Please enter your name");
        var elem = document.getElementById("name");
            
    } else {
        var regex = /^[A-Z][a-z]{1,}/;               
        if(regex.test(name) === false) {
            printError("nameErr", " Name should start with a capital");
            var elem = document.getElementById("name");
            
        } else {
            printError("nameErr", "");
            nameErr = false;
            var elem = document.getElementById("name");
            

            
        }
    }
    

    if(email == "") {
        printError("emailErr", "Please enter your email address");
         var elem = document.getElementById("email");
            
    } else {
        
        var regex = /^\S+@\S+\.\S+$/;
        if(regex.test(email) === false) {
            printError("emailErr", "Please enter '@' ");
            var elem = document.getElementById("email");
            
        } else{
            printError("emailErr", "");
            emailErr = false;
             var elem = document.getElementById("email");
            

        }
    }
    if(password==""){
            printError("passErr","Please enter your password");
                var elem = document.getElementById("password");
                    
    }else{
            var regex= /^[A-Z][a-z]+\d{3,}[.|,]+/;
            if(regex.test(password)==false){
                    printError("passErr"," Password should start with a capital and end with 3+ numbers and . or ,");
                    var elem = document.getElementById("password");
                    
            }
            else{
                printError("passErr","");
                passErr = false;
                var elem = document.getElementById("password");
            }
    }
    
 
    if(mobile == "") {
        printError("mobileErr", "Please enter your mobile number");
        var elem = document.getElementById("mobile");
    } else {
        var regex = /^[1-9]\d{9}$/;
        if(regex.test(mobile) === false) {
            printError("mobileErr", "Please enter a valid 10 digit mobile number");
            var elem = document.getElementById("mobile");
        
        } else{
            printError("mobileErr", "");
            mobileErr = false;
            var elem = document.getElementById("mobile");
            
        }
    }
    

    if(country == "Select") {
        printError("countryErr", "Please select your country");
        var elem = document.getElementById("country");
    
    } else {
        printError("countryErr", "");
        countryErr = false;
        var elem = document.getElementById("country");
        
    }
    

    if(gender == "") {
        printError("genderErr", "Please select your gender");
        var elem = document.getElementById("gender");

    } else {
        printError("genderErr", "");
        genderErr = false;
        var elem = document.getElementById("gender");
          
    }
    
    
    if((nameErr || emailErr || passErr || mobileErr || countryErr || genderErr) == true) {
       return false;
    } 
};