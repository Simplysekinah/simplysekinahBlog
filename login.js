let Email = document.getElementById("Email")
let Password = document.getElementById("Password")
let signedUser = JSON.parse(localStorage.getItem("users"))
let loggedUser = {}
z
function logIn(event){
    event.preventDefault()
    let search = signedUser.find((e) => e.Password == Password.value && e.Email == Email.value)
    if(search){
        alert("Logged In")
        loggedUser = search
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
        console.log(loggedUser);
        window.location.href = "dashboard.html"
        alert(`You are welcome ${firstname}`)
    }
    else{
        alert("Invalid details")
    }
}