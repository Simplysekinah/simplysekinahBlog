let Firstname = document.getElementById("Firstname")
let Lastname = document.getElementById("Lastname")
let Email = document.getElementById("Email")
let Password = document.getElementById("Password")
let Confirmpassword = document.getElementById("Confirmpassword")
let userArr =  JSON.parse(localStorage.getItem("users")) || []

function signUp(event){
    event.preventDefault()
    let userInfo = {
        Firstname: Firstname.value,
        Lastname: Lastname.value,
        Email: Email.value,
        Password: Password.value
    }
    if (Firstname.value == "" || Lastname.value == "" || Email.value == "" || Password.value == "" || Confirmpassword.value == ""){
        alert("Fill all fields")
    }
    else{
        if (Password.value == Confirmpassword.value){
            userArr.push(userInfo)
            console.log(userInfo);
            console.log(userArr);
            localStorage.setItem("users",JSON.stringify(userArr))
            window.location.href = 'login.html'
        }
        else{
            alert("Password does not match")
        }
    }

}