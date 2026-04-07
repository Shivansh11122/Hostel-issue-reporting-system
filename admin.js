async function loadComplaints(){

let response = await fetch("http://localhost:3000/complaints")

let complaints = await response.json()

let table = document.getElementById("complaintTable")

if(!table) return

table.innerHTML=""

complaints.forEach((c,index)=>{

let row = `<tr>

<td>${c.block}</td>
<td>${c.room}</td>
<td>${c.issue}</td>
<td>${c.staff || "Not Assigned"}</td>
<td>${c.priority}</td>
<td><span class="pending">${c.status}</span></td>

<td>
<button onclick="updateStatus(${c.id}, 'Pending')" class="pending-btn">Pending</button>
<button onclick="updateStatus(${c.id}, 'In Progress')" class="progress-btn">In Progress</button>
<button onclick="updateStatus(${c.id}, 'Solved')" class="solved-btn">Solved</button>
</td>

<td>
<button onclick="deleteComplaint(${c.id})">Delete</button>
</td>

</tr>`

table.innerHTML += row

})

updateSummary(complaints)

}



// Update complaint status
async function updateStatus(id,status){

let response = await fetch(`http://localhost:3000/updateStatus/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({status})

})

let data = await response.text()

alert(data)

loadComplaints()
loadStaff()

}


// Delete complaint
async function deleteComplaint(id){

if(confirm("Delete this complaint?")){

let response = await fetch(`http://localhost:3000/deleteComplaint/${id}`,{
method:"DELETE"
})

let message = await response.text()

alert(message)

loadComplaints()

}

}


// Update summary cards
function updateSummary(complaints){

let total = complaints.length
let pending = 0
let solved = 0

complaints.forEach(c=>{

if(c.status==="Pending") pending++
if(c.status==="Solved") solved++

})

document.getElementById("total").innerText = total
document.getElementById("pending").innerText = pending
document.getElementById("solved").innerText = solved

}

// Show dashboard sections
function showSection(section){

document.getElementById("complaints").style.display="none"
document.getElementById("stats").style.display="none"
document.getElementById("staff").style.display="none"
document.getElementById("feedback").style.display="none"

document.getElementById(section).style.display="block"

if(section==="stats"){
showChart()
}

if(section==="staff"){
loadStaff()
}

if(section==="feedback"){
loadFeedback()
}

}


// Complaint statistics chart
async function showChart(){

let response = await fetch("http://localhost:3000/complaints")

let complaints = await response.json()

let high = 0
let medium = 0
let low = 0

complaints.forEach(c => {

if(c.priority == 1) high++
else if(c.priority == 2) medium++
else low++

})

let ctx = document.getElementById("complaintChart")

if(!ctx) return

new Chart(ctx,{
type:'bar',
data:{
labels:["High","Medium","Low"],
datasets:[{
label:"Complaints",
data:[high,medium,low],
backgroundColor:["red","orange","green"]
}]
}
})

}


// Staff list
let staff=[


{name:"Raj",skill:"Electricity",status:"Available"},
{name:"Amit",skill:"Water",status:"Available"},
{name:"Suresh",skill:"WiFi",status:"Busy"},
{name:"Ravi",skill:"Furniture",status:"Available"},
{name:"Deepak",skill:"Cleaning",status:"Available"}

];




// Load staff table
async function loadStaff(){

let staffResponse = await fetch("http://localhost:3000/staff")
let staff = await staffResponse.json()

let complaintsResponse = await fetch("http://localhost:3000/complaints")
let complaints = await complaintsResponse.json()

let table = document.getElementById("staffTable")

if(!table) return

table.innerHTML=""

staff.forEach(s => {

let assigned = complaints.find(c => c.staff === s.name && c.status !== "Solved")

let status = assigned ? "Busy" : "Available"

let issue = assigned ? assigned.issue : "None"

let row = `<tr>

<td>${s.name}</td>
<td>${s.skill}</td>
<td>${status}</td>
<td>${issue}</td>

</tr>`

table.innerHTML += row

})

}

// Logout
function logout(){
window.location="login.html"
}


// Run when page loads
window.onload = function(){

loadComplaints()

}
function loadFeedback(){

let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || []

let table = document.getElementById("feedbackTable")

if(!table) return

table.innerHTML=""

feedbacks.forEach(function(f){

let stars = ""

for(let i=0;i<f.rating;i++){
stars += "⭐"
}

let row = `<tr>

<td>${f.student}</td>
<td>${stars}</td>
<td>${f.message}</td>

</tr>`

table.innerHTML += row

})

}