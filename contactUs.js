function validation(){
    var form=document.querySelector("#form1");
    var name=document.querySelector("#name").value;
    
    var pattern2=/^[a-zA-Z]+ [a-zA-Z]+/;
    var form=document.querySelector("#text3");


    if (name.match(pattern2)){
        form.classList.add("valid");
        form.classList.remove("invalid");
        text3.innerHTML="You entered your name"; 
        text3.style.color= "green";
      }
      else {
        form.classList.remove("valid");
        form.classList.add("invalid");
        text3.innerHTML="Please enter your name";
        text3.style.color= "red";
    }

return true;
}
function validationE(){
    var form=document.querySelector("#form1");
   
    var email = document.querySelector('#email').value;
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/ ;
  


    if (email.match(pattern)){ 
      form.classList.add("valid");
      form.classList.remove("invalid");
      text1.innerHTML="Your email Address is Valid"; 
      text1.style.color= "green";
  
    } 
    else {
      form.classList.remove("valid");
      form.classList.add("invalid");
      text1.innerHTML="Please enter valid email address";
      text1.style.color= "red";
    }
return true;
}

function validationP(){
    var form=document.querySelector("#form1");
   
    var phone = document.querySelector('#phonenumber').value;
    var pattern = /^\+[0-9]{11}/ ;
  


    if (phone.match(pattern)){ 
      form.classList.add("valid");
      form.classList.remove("invalid");
      text2.innerHTML="Your phone number is Valid"; 
      text2.style.color= "green";
  
    } 
    else {
      form.classList.remove("valid");
      form.classList.add("invalid");
      text2.innerHTML="Please enter valid phone number (Kosovo) ";
      text2.style.color= "red";
    }
return true;
}
function resetF(){
    var form=document.querySelector("#form1");
    var name=document.querySelector("#name").value;
    var email = document.querySelector('#email').value;
    var phone = document.querySelector('#phonenumber').value;
    var message = document.querySelector('#textA').value;
    if (name !="" || phone != "" || email != "" || phone !="" || message!="" ){ 
        name.innerHTML="";
        phone.innerHTML="";
        email.innerHTML="";
        phone.value="+383";
        message.value="";
        text1.innerHTML="";
        text2.innerHTML="";
        text3.innerHTML="";
    } 
return true;
}