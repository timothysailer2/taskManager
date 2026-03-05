let tasks = [];
let user = "timothy";

const API_URL = "https://fsdiapi.azurewebsites.net/api/tasks";

function init(){
    $("#toggleDark").click(function(){

$("body").toggleClass("dark");

});
    $("#searchBox").on("keyup", function(){

let text = $(this).val().toLowerCase();

let filtered = tasks.filter(task =>
task.title.toLowerCase().includes(text) ||
task.description.toLowerCase().includes(text)
);

displayTasks(filtered);

});

$("#btnSave").click(saveTask);

$("#btnDeleteAll").click(deleteAllTasks);

loadTasks();

}

function saveTask(){
    let priority = $("#selPriority").val();

let title = $("#txtTitle").val();

if(title.length < 3){
alert("Title must be at least 3 characters");
return;
}

let description = $("#txtDescription").val();
let color = $("#selColor").val();
let date = $("#selDate").val();
let status = $("#selStatus").val();
let budget = $("#numBudget").val();

let task = new Task(title,description,color,date,status,budget,priority);

task.name = user;

$.ajax({
url:API_URL,
type:"POST",
data:JSON.stringify(task),
contentType:"application/json",

success:function(){

tasks.push(task);

displayTasks();

clearForm();

},

error:function(error){
console.error(error);
}

});

}

function loadTasks(){

$.ajax({

url:API_URL,
type:"GET",

success:function(data){

for(let i=0;i<data.length;i++){

let task = data[i];

if(task.name === user){

tasks.push(task);

}

}

displayTasks();

}

});

}

function displayTasks(filteredTasks = tasks){

$("#list").empty();

if(filteredTasks.length === 0){

$("#list").append(`
<tr>
<td>
<span class="priority-${task.priority.toLowerCase()}">
${task.priority}
</span>
</td>
</tr>
`);

}

for(let i=0;i<filteredTasks.length;i++){

let task = filteredTasks[i];

let statusClass = "";

if(task.status === "New"){
statusClass = "status-new";
}
else if(task.status === "In Progress"){
statusClass = "status-progress";
}
else{
statusClass = "status-done";
}

let row = `

<tr>

<td>
<div style="width:20px;height:20px;background:${task.color};border-radius:50%"></div>
</td>

<td>${task.title}</td>

<td>${task.description}</td>

<td>${task.date}</td>

<td>
<span class="status-badge ${statusClass}">
${task.status}
</span>
</td>

<td>$${task.budget}</td>

<td>
<button class="deleteBtn" data-index="${i}">
Delete
</button>
</td>

</tr>

`;

$("#list").append(row);

}

updateCounter();
updateStats();
}
function renderBoard(){

$("#colNew").find(".task-card").remove();
$("#colProgress").find(".task-card").remove();
$("#colDone").find(".task-card").remove();

tasks.forEach((task,index)=>{

let card = $(`
<div class="task-card" draggable="true" data-index="${index}">
${task.title}
</div>
`);

if(task.status === "New"){
$("#colNew").append(card);
}
else if(task.status === "In Progress"){
$("#colProgress").append(card);
}
else{
$("#colDone").append(card);
}

});

}
function updateCounter(){

$("#taskCount").text(tasks.length + " Tasks");

}

function clearForm(){

$("#txtTitle").val("");
$("#txtDescription").val("");
$("#selDate").val("");
$("#numBudget").val("");

}

function deleteTask(index){

tasks.splice(index,1);

displayTasks();

}

function deleteAllTasks(){

tasks = [];

displayTasks();

}

$(document).on("click",".deleteBtn",function(){

let index = $(this).data("index");

deleteTask(index);

});
function updateStats(){

let total = tasks.length;

let newCount = 0;
let progressCount = 0;
let doneCount = 0;

for(let i=0;i<tasks.length;i++){

let status = tasks[i].status;

if(status === "New"){
newCount++;
}
else if(status === "In Progress"){
progressCount++;
}
else if(status === "Completed"){
doneCount++;
}

}

$("#statTotal").text(total);
$("#statNew").text(newCount);
$("#statProgress").text(progressCount);
$("#statDone").text(doneCount);

}
$("#calendarDate").change(function(){

let selected = $(this).val();

let results = tasks.filter(t => t.date === selected);

$("#calendarTasks").empty();

if(results.length === 0){

$("#calendarTasks").append("<li>No tasks for this day</li>");

}

results.forEach(task =>{

$("#calendarTasks").append(`<li>${task.title}</li>`);

});

});

$(document).ready(init);
displayTasks();