let display = document.getElementById("display")
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
let signedUser = JSON.parse(localStorage.getItem("users"))
if(loggedUser == undefined){
    window.location.href = "login.html"
}
display.innerHTML = `Hello ${loggedUser.Firstname}`
let createpost = document.getElementById("createpost")
let center = document.getElementById("center")
let allpost = JSON.parse(localStorage.getItem("allpost")) || []
let content = document.getElementById("content")
let title = document.getElementById("title")
let author = document.getElementById("author")
let posters = document.getElementById("post-blog")
let image = document.getElementById("image")
let likedCount = document.getElementById("likedCount")
let likepost = document.getElementById("likepost")
let commentCount = document.getElementById("commentCount")
let blogimage = ""
let posting = []

createpost.style.display = "none"
center.style.display = "block"

function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html"
}
function create() {
    createpost.style.display = "block"
    center.style.display = "none"
}
image.addEventListener("change", function (event) {
    let file = event.target.files[0]
    console.log(file);
    let reader = new FileReader()
    reader.addEventListener("load", (event) => {
        let result = event.target.result
        console.log(result);
        blogimage = result
    })
    if (file) {
        reader.readAsDataURL(file)
    }
})
function posts(event) {
    console.log(event);
    // event.preventDefault()
    console.log(author.value,
        content.value,
        blogimage);
    let post = {
        author: author.value,
        content: content.value,
        picture: blogimage,
        likedUser: []
    }
    if (author.value == '' && content.value && image.value) {
        alert('fill the contents')
    }
    else {

        allpost.push(post)
        localStorage.setItem("allpost", JSON.stringify(allpost))
        console.log(allpost);
        createpost.style.display = "none"
        for (index = 0; index < allpost.length; index++) {
            center.innerHTML += `
            <div class='main'>
                <img class='image' src=${allpost[index].picture}>
                <div class='main1'>
                    <div>${allpost[index].author}</div>
                    <div>${allpost[index].content}</div>
                    <div class ="btns">
                        <div>
                            <div id="likedCount_${index}"></div>
                            <div id="likepost" onclick="likePost(${index})">
                                <i class="fa-regular fa-heart" id="like"></i>
                            </div>
                        </div>
                        <div>
                            <div id="commentCount_${index}"></div>
                            <div id="comment_${index}" onclick="comment(${index})">
                                comment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            center.style.display = "block"
        }
    }

}

function first() {
    center.innerHTML = ''
    for (index = 0; index < allpost.length; index++) {
        center.innerHTML += `
        <div class='main'>
            <img class='image' src=${allpost[index].picture}>
            <div class='main1'>
                <div>${allpost[index].author}</div>
                <div>${allpost[index].content}</div>
                <div class ="btns">
                        <div class="liking">
                            <div id="likedCount_${index}">${allpost[index].likedUser.length}</div>
                            <div id="likepost" onclick="likePost(${index})">
                            ${allpost[index].likedUser.find(element=> element == loggedUser.Email) ?  '<i class="fa-solid fa-heart liked"></i>' : '<i class="fa-regular fa-heart like"></i>'}
                            </div>
                        </div>
                        <div>
                            <div id="commentCount_${index}" onclick="comment(${index})"></div>
                            <div id="comment_${index}">
                                comment
                            </div>
                        </div>
                </div>
            </div>
        </div>
        `
    }
    center.style.display = "block"
    createpost.style.display = "none"
}

function likePost(index) {
    console.log(index);
    console.log(allpost[index].likedUser);
   let email = loggedUser.Email
    let users = allpost[index].likedUser.find( element => element == email)
    console.log(users);
    if(users == undefined){
        allpost[index].likedUser.push(email)
        let liked = 
        {
           author:allpost[index].author,
           content:allpost[index].content,
           likedUser:allpost[index].likedUser,
            picture:allpost[index].picture
        }
                    allpost[index] = liked
                    console.log(allpost);
                    localStorage.setItem("allpost", JSON.stringify(allpost))
    }else{
        allpost[index].likedUser.pop(email)
        let liked = 
        {
           author:allpost[index].author,
           content:allpost[index].content,
           likedUser:allpost[index].likedUser,
            picture:allpost[index].picture
        }
                    allpost[index] = liked
                    console.log(allpost);
                    localStorage.setItem("allpost", JSON.stringify(allpost))
    }
    first()
}
// function edit(index) {
//     let newContent = prompt("Edit your content")
//     let post = {
//         author: allpost[0].author,
//         content: newContent
//     }
//     center.innerHTML = " "
//     allpost.splice(index, 1, post)
//     console.log(allpost)
//     for (index = 0; index < allpost.length; index++) {
//         center.innerHTML += `
//         <div class='main'>
//             <img class='image' src=${allpost[index].picture}>
//             <div class='main1'>
//                 <div>${allpost[index].author}</div>
//                 <div>${allpost[index].content}</div>
//                 <div class ="btns">
//                     <button id ="like" onclick='like (${index})'></button>
//                     <button id ="edits" onclick='edit()'>EDIT</button>
//                 </div>
//             </div>
//         </div>
//         `
//     }
// }
