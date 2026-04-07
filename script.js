// LOGIN FUNCTION
function login(){

let username = document.getElementById("username").value
let password = document.getElementById("password").value

let users = JSON.parse(localStorage.getItem("users")) || []

let valid = false

users.forEach(function(user){
if(user.username === username && user.password === password){
valid = true
}
})

// admin login
if(username==="admin" && password==="Admin@123"){
window.location="admin.html"
return
}

if(valid){

localStorage.setItem("currentUser", username)

window.location="dashboard.html"

}

else{
document.getElementById("msg").innerText="Invalid Username or Password"
}

}



// SIGNUP FUNCTION
function signup(){

let username = document.getElementById("newUser").value
let password = document.getElementById("newPass").value

let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

if(!pattern.test(password)){
alert("Password must contain:\n• Uppercase\n• Lowercase\n• Number\n• Special character\n• Minimum 8 characters")
return
}

let users = JSON.parse(localStorage.getItem("users")) || []

users.push({
username: username,
password: password
})

localStorage.setItem("users", JSON.stringify(users))

alert("Account created successfully!")

window.location="login.html"

}



// SUBMIT COMPLAINT
async function submitComplaint(){

const block = document.getElementById("block").value
const room = document.getElementById("room").value
const issue = document.getElementById("issueType").value
const priority = document.getElementById("priority").value

const student = localStorage.getItem("currentUser")

try{

const response = await fetch("http://localhost:3000/complaint",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
student,
block,
room,
issue,
priority,
status:"Pending"
})

})

const data = await response.text()

alert(data)

// reload table after submit
loadStudentComplaints()

}catch(error){

console.log(error)
alert("Server connection failed")

}

}


// LOAD STUDENT COMPLAINTS
async function loadStudentComplaints(){

let response = await fetch("http://localhost:3000/complaints")

let complaints = await response.json()

let table = document.getElementById("studentComplaintTable")

if(!table) return

table.innerHTML = ""

complaints.forEach(c => {

let row = `<tr>

<td>${c.block}</td>
<td>${c.room}</td>
<td>${c.issue}</td>
<td>${c.priority}</td>
<td>${c.status}</td>

</tr>`

table.innerHTML += row

})

}



// SHOW WELCOME MESSAGE
function showWelcome(){

let user = localStorage.getItem("currentUser")

let welcome = document.getElementById("welcomeUser")

if(welcome && user){
welcome.innerText = "Welcome, " + user
}

}



// FEEDBACK
function submitFeedback(){

let rating = document.getElementById("feedbackRating").value
let message = document.getElementById("feedbackMessage").value

let currentUser = localStorage.getItem("currentUser")

let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || []

feedbacks.push({
student: currentUser,
rating: rating,
message: message
})

localStorage.setItem("feedbacks", JSON.stringify(feedbacks))

alert("⭐ Thank you for your feedback!")

document.getElementById("feedbackMessage").value=""

}



// PAGE LOAD
window.onload = function(){
loadStudentComplaints()
showWelcome()

}