const form = document.querySelector("#github-form");
form.addEventListener("submit", handleSubmit);
//proccesing submit request
function handleSubmit(event) {
    const reposList = document.querySelector("#repos-list");
    reposList.replaceChildren();
    event.preventDefault();
    const userlist = document.querySelector("#user-list");
    userlist.innerHTML = " "
    getResult(event.target[0].value);
}
//get matching users from API
function getResult(login) {
    fetch(`https://api.github.com/search/users?q=${login}`)
    .then(res => res.json())
    .then(userArray => userArray.items.forEach(user => renderUsers(user)))
    //.catch(error => console.log(error.message))
}
//render matching users to the DOM
function renderUsers(user) {
    console.log(user);
    let userObj = document.createElement("li");
    userObj.innerHTML = `
        <p id = ${user.id}>Username: ${user.login}</p>
        <img src=${user.avatar_url}>
        <a href = ${user.html_url}>Profile link</a>
        `
    const userlist = document.querySelector("#user-list");
    userlist.appendChild(userObj);
//Listen for a click on one of the github users
    let selectedUser = document.getElementById(`${user.id}`);
    selectedUser.addEventListener("click", handleSelectedUser );
}
//clean up the repos list and get new list of repos from API
function handleSelectedUser(event) {
    event.preventDefault();
    const reposList = document.querySelector("#repos-list");
    reposList.replaceChildren();
    fetch(`https://api.github.com/users/${event.target.innerText.split(" ")[1]}/repos`)
    .then(res => res.json())
    .then(reposArray => reposArray.forEach(repo => renderRepo(repo)))
}
//render new list of repos to the DOM
function renderRepo(repo) {
    const reposList = document.querySelector("#repos-list")
    let repoObj = document.createElement("li")
    repoObj.innerHTML = `
        <p>${repo.html_url}</p>
    `
    reposList.appendChild(repoObj)

}
