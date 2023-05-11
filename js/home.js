var logOutButton = document.querySelector('button');// select the log out button
var mainPargraph = document.querySelector('#main');
var allUsers =[];
var user = JSON.parse(localStorage.getItem('currentUser'));

if(localStorage.getItem('users') != null){ // get users data from local storage if it exists
    allUsers = JSON.parse(localStorage.getItem('users'));
}
mainPargraph.innerHTML = `
    <h2 class="fw-bold">${allUsers[user].name}</h2>
    <p class="fw-semibold fs-4">${allUsers[user].email}</p>
`
function logOut(){ // redirect user to the log in page
    localStorage.removeItem("currentUser");
    window.location.replace('../login.html');
}

logOutButton.addEventListener('click', logOut);// event listener to log out 