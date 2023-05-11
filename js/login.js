var userEmail = document.querySelector('input[type="email"]'); // email input field
var userEmailMessage = document.querySelector('#emailMessage'); // email wrong entry message
var userPassword =document.querySelector('input[type="password"]'); // password input field
var userPasswordMessage = document.querySelector('#passwordMessage'); // email wrong entry message
var logInButton = document.querySelector('#login'); // log in button
var messages = document.querySelectorAll('p');
var allUsers = JSON.parse(localStorage.getItem('users'));

function rebootMessages(){// remove warning messages
    for(var i = 0; i < messages.length; i++)  // iterate over all messages
    messages[i].innerHTML = ""; //remove message text
    messages[i].classList.remove('py-2', 'bg-red'); // remove message styling
}

function checkPassword(password){ // check user password 
    if(userPassword.value.trim() == ""){
        userPasswordMessage.innerHTML = "You can't let this field empty"; // display warning message
        userPasswordMessage.classList.add('py-2', 'bg-red');
    }else if( userPassword.value == password){ // if the user password is correct
        userPasswordMessage.innerHTML = ""; // remove the warning message
        userPasswordMessage.classList.remove('py-2', 'bg-red'); //remove styling from the warning message  
        return true; // return true
    } else { // if the user password is not correct
        userPasswordMessage.innerHTML = "Password is incorrect please try again";// display warning message
        userPasswordMessage.classList.add('py-2', 'bg-red'); // styling the warning message
        return false; // return false
    }
}

function checkEmail(email){ // check user email
    if(userEmail.value.trim() == ""){
        userEmailMessage.innerHTML = "You can't let this field empty"; // display warning message
        userEmailMessage.classList.add('py-2', 'bg-red');
    }else if( userEmail.value.trim() == email){  // if the user email is correct
        userEmailMessage.innerHTML = ""; // remove the warning message
        userEmailMessage.classList.remove('py-2', 'bg-red'); //remove styling from the warning message  
        return true; // return true
    }else{ // if the user email is not correct 
        userEmailMessage.innerHTML = "Email doesn't exist please enter a valid email address"; // display warning message
        userEmailMessage.classList.add('py-2', 'bg-red'); // styling the warning message   
        return false;       // return false      
    }
}

function logIn(){ // complete the login process
    for(var i=0; i<allUsers.length; i++){ // iterate through all users
        if(checkEmail(allUsers[i].email) && checkPassword(allUsers[i].password)){ // check the password and email 
            localStorage.setItem('currentUser', JSON.stringify(i));
            window.location.replace("./pages/home.html"); // if correctly set redirect user to the home page
        }
    }
}

userEmail.addEventListener("keyup",function(){ // event listener to remove email empty warning
    if(userEmail.value != ""){
        userEmailMessage.innerHTML = ""; // remove warning message
        userEmailMessage.classList.remove('py-2', 'bg-red'); // remove styling from the warning message
    }
});

userPassword.addEventListener("keyup",function(){ // event listener to remove password empty warning
    if(userPassword.value != ""){
        userPasswordMessage.innerHTML = ""; // remove warning message
        userPasswordMessage.classList.remove('py-2', 'bg-red'); // remove styling from the warning message
    }
});

logInButton.addEventListener('click', logIn); // event listener to complete login