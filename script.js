function login(){

let user=document.getElementById("username").value
let pass=document.getElementById("password").value

if(user=="student" && pass=="1234"){

window.location="dashboard.html"

}

else if(user=="admin" && pass=="admin123"){

window.location="admin.html"

}

else{

document.getElementById("msg").innerText="Invalid Login"

}

}


function submitComplaint(){

let room=document.getElementById("room").value
let issue=document.getElementById("issueType").value
let priority=document.getElementById("priority").value

let complaints=JSON.parse(localStorage.getItem("complaints")) || []

let complaint={

room:room,
issue:issue,
priority:priority,
status:"Pending"

}

complaints.push(complaint)

localStorage.setItem("complaints",JSON.stringify(complaints))

alert("Complaint Submitted")

}
// SIGNUP FUNCTION

function signup(){

let username = document.getElementById("newUser").value
let password = document.getElementById("newPass").value

let users = JSON.parse(localStorage.getItem("users")) || []

let user = {
username: username,
password: password
}

users.push(user)

localStorage.setItem("users", JSON.stringify(users))

document.getElementById("signupMsg").innerText = "Account Created Successfully"

}



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

if(username === "admin" && password === "admin123"){

window.location="admin.html"
return

}

if(valid){

window.location="dashboard.html"

}

else{

document.getElementById("msg").innerText="Invalid Username or Password"

}

}



// COMPLAINT SUBMISSION

function submitComplaint(){

let room=document.getElementById("room").value
let issue=document.getElementById("issueType").value
let priority=document.getElementById("priority").value

let complaints=JSON.parse(localStorage.getItem("complaints")) || []

let complaint={

room:room,
issue:issue,
priority:priority,
status:"Pending"

}

complaints.push(complaint)

localStorage.setItem("complaints",JSON.stringify(complaints))

alert("Complaint Submitted Successfully")

}
function loadStudentComplaints(){

let complaints = JSON.parse(localStorage.getItem("complaints")) || []

let table = document.getElementById("studentComplaintTable")

if(!table) return

table.innerHTML = ""

complaints.forEach(c=>{

let row = `<tr>

<td>${c.room}</td>
<td>${c.issue}</td>
<td>${c.priority}</td>
<td>${c.status}</td>

</tr>`

table.innerHTML += row

})

}

// Load complaints when page opens
window.onload = loadStudentComplaints