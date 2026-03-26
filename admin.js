// Load complaints from localStorage
function loadComplaints(){

let complaints = JSON.parse(localStorage.getItem("complaints")) || []

let table = document.getElementById("complaintTable")

if(!table) return

table.innerHTML = ""

complaints.forEach((c,index)=>{

let row = `<tr>

<td>${c.room}</td>
<td>${c.issue}</td>
<td>${c.priority}</td>

<td>

<select onchange="updateStatus(${index}, this.value)">

<option value="Pending" ${c.status=="Pending"?"selected":""}>Pending</option>
<option value="In Progress" ${c.status=="In Progress"?"selected":""}>In Progress</option>
<option value="Solved" ${c.status=="Solved"?"selected":""}>Solved</option>

</select>

</td>

</tr>`

table.innerHTML += row

})

}


// Update complaint status
function updateStatus(index,status){

let complaints = JSON.parse(localStorage.getItem("complaints")) || []

complaints[index].status = status

localStorage.setItem("complaints", JSON.stringify(complaints))

alert("Status Updated")

}


// Logout
function logout(){
window.location="login.html"
}


// Show dashboard sections
function showSection(section){

document.getElementById("complaints").style.display="none"
document.getElementById("stats").style.display="none"
document.getElementById("staff").style.display="none"

document.getElementById(section).style.display="block"

if(section==="stats"){
showChart()
}

if(section==="staff"){
loadStaff()
}

}


// Chart
function showChart(){

let complaints = JSON.parse(localStorage.getItem("complaints")) || []

let high=0
let medium=0
let low=0

complaints.forEach(c=>{
if(c.priority==1) high++
else if(c.priority==2) medium++
else low++
})

let ctx=document.getElementById("complaintChart")

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

{name:"Raj",skill:"Electricity"},
{name:"Amit",skill:"Water"},
{name:"Suresh",skill:"WiFi"},
{name:"Ravi",skill:"Furniture"},
{name:"Deepak",skill:"Cleaning"}

]


// Load staff table
function loadStaff(){

let table=document.getElementById("staffTable")

if(!table) return

let complaints = JSON.parse(localStorage.getItem("complaints")) || []

table.innerHTML=""

staff.forEach(function(s){

let assigned = complaints.find(c=>c.issue===s.skill)

let row=`<tr>

<td>${s.name}</td>
<td>${s.skill}</td>
<td>${assigned ? assigned.issue : "None"}</td>

</tr>`

table.innerHTML += row

})

}


// Run when page loads
window.onload = function(){
loadComplaints()
}