var userName =document.querySelector('input[type="text"]'); // user name input field
var userEmail = document.querySelector('input[type="email"]'); // email input field
var userPassword =document.querySelector('input[type="password"]'); // password input field
var confirmPassword =document.querySelector('#confirmPassword'); // confirm password input field
var signUpButton = document.querySelector('#signup'); // sign up button
var nameMessage = document.querySelector('#nameMessage'); // user name message 
var emailMessage = document.querySelector('#emailMessage'); // user name message 
var passwordMessage = document.querySelector('#passwordMessage'); // user name message 
var logInLink = document.querySelector('#logInLink');
var nameRegex = /^[a-zA-Z]{4,10}$/; //regular expression to check for user name validity
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //regular expression to check for user email validity
var passwordRegex = /^[[a-zA-Z]+1][[1-2]+1]{8}/; //regular expression to check for user password validity
var allUsers = [];
var nameFlag, emailFlag, passwordFlag, confirmFlag; // flags to check for user input validity

if(localStorage.getItem('users') != null){ // get users data from local storage if it exists
    allUsers = JSON.parse(localStorage.getItem('users'));
}

function getSignUpData(){ //get user data and store it in an object and return it
    return {
        name: userName.value.trim(),
        email: userEmail.value.trim(),
        password: userPassword.value.trim()
    }
}

function clearInputs(){ // clear all input fields after signing up
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
    confirmPassword.value = '';
}

function rebootMessage(message){// reboot message paragraph to an empty string
    message.innerHTML = ""; 
    message.classList.remove('py-2', 'bg-red');
}

function isEmpty(message, e){  // check if the input field is empty
    if(e.target.value == ''){
        e.target.classList.remove('valid'); // remove  valid sign from the input
        e.target.classList.add('not-valid'); // add not valid sign to the input
        message.innerHTML = "You can't let this field empty."; // display warning message
        message.classList.add('py-2', 'bg-red'); // styling the warning message
        return true; // return true if the input is empty
    }else{
        return false; // return false if the input is empty
    }
} 

function isValid(regex, e, falg){ // check if the user entery matches the regex
    if(regex.test(e.target.value.trim())){ // if the regex matches user entery
        e.target.classList.remove('not-valid');// remove not valid sign from the input
        e.target.classList.add('valid'); // add valid sign to the input
        return true; // return true if the user entery is valid
    }else{
        e.target.classList.remove('valid'); // remove  valid sign from the input
        e.target.classList.add('not-valid'); // add not valid sign to the input
        return false; // return false if the user entery isn't valid
    }
}

function createNewAccount(){ // create new account 
    if(nameFlag && emailFlag && passwordFlag && confirmFlag){ //if all user enteries are valid
        allUsers.push(getSignUpData()); // add the new user data to the main array
        localStorage.setItem('users', JSON.stringify(allUsers));// add the new user data to the local storage
        clearInputs(); // clear the input fields
        document.querySelectorAll('input').forEach(element => // iterate over all input fields
            element.classList.remove('valid', 'not-valid'));//remove any sign from the input fields
        emailFlag = nameFlag = passwordFlag = undefined; //reboot all validation flags
        window.location.replace('../login.html'); //redirect user to login page
    }    
}

userName.addEventListener('blur', function(e){ // event listener to validate user name 
    if(isEmpty(nameMessage, e)){ // if user name is empty
        nameFlag = false; // assign the name flag to false
    }else if(isValid(nameRegex, e)){ // if user name is valid
        rebootMessage(nameMessage);// remove the warning message
        nameFlag = true;    // assign the name flag to true
    }else{ // if user name is not valid 
        nameMessage.innerHTML = "Enter a name between 4 to 8 alphabet characters.";// display the warning message
        nameMessage.classList.add('py-2', 'bg-red'); // add styling to the warning message
        nameFlag = false; // assign the name flag to false
    }
}, false);

userEmail.addEventListener('blur', function(e){ // event listener to validate user email
    var isNewEmail = true; // flag to check if the user email is already exist
    if(isEmpty(emailMessage, e)){ // if the email is empty
        emailFlag = false; // assign email falg to false
    }else{ // if the user email isn't empty 
        rebootMessage(emailMessage); // remove the warning message
        for(var i = 0; i <allUsers.length; i++){ // iterate over all users 
            if(allUsers[i].email == e.target.value.trim()){ // if the user email is already exist
                isNewEmail = false; // change new email flag to false
                break; // break out of loop
            }
        }
        if(isNewEmail){ // if the user email isn't exist
            if(isValid(emailRegex, e)){ // if the user email matches the regex
                rebootMessage(emailMessage);// remove the warning message 
                emailFlag = true; // assign email falg to true
            }else{ // if the user email dosen't matche the regex
                emailMessage.innerHTML = "Enter a valid email address.";// display the warning message 
                emailMessage.classList.add('py-2', 'bg-red');// add styling to the warning message
                emailFlag = false; // assign email falg to false
            }
        }else{ // if the user email is already exist
            emailMessage.innerHTML = "This email is already exist."; // display the warning message
            emailMessage.classList.add('py-2', 'bg-red'); // add styling to the warning message
            emailFlag = false; // assing email flag to false
        }
    }
});

userPassword.addEventListener('blur', function(e){ // event listener to validate user password
    if(isEmpty(passwordMessage, e)){ // if the password input is empty
        passwordFlag = false; // assing password flag to false
    }else{ // if the password input isn't empty
        if(isValid(passwordRegex,e)){ // if the password matches the regex
            rebootMessage(passwordMessage);// remove the warning message
            passwordFlag = true; // assign password flag to true
        }else{ // if the password doesn't match the regex
            passwordMessage.innerHTML = "Enter a password of 8 characters."; // display the warining message
            passwordMessage.classList.add('py-2', 'bg-red');// add styling to the warining message
            passwordFlag = false; // assign the password flag to false
        }
    }
});

confirmPassword.addEventListener('keyup', function(e){ //  event listener to validate password confirmation
    if(userPassword.value == e.target.value){ // if the two passwords are the same
        rebootMessage(passwordMessage);// remove the warining message
        e.target.classList.remove('not-valid');// remove the not valid sign from the input
        e.target.classList.add('valid'); // add the valid sign to the input
        confirmFlag = true; // assign confirm flag to true
    }else{ // if the two passwords are different
        e.target.classList.remove('valid'); // remove the valid sign from the input
        e.target.classList.add('not-valid'); // add the not valid sign to the input
        passwordMessage.innerHTML = "Password confirmation isn't correct."; // display the warning message
        passwordMessage.classList.add('py-2', 'bg-red');// add styling to the warning message
        confirmFlag = false; // assign confirm flag to false
    }
});
logInLink.addEventListener('mousedown', function(){
    userName.removeEventListener()
    window.location.replace('../login.html');
})

signUpButton.addEventListener("click", createNewAccount);// event listener to complete the registration when user clicks sign up 