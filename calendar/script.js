class Task{

constructor(title,date,description){

this.title = title;
this.date = date;
this.description = description;

}

}

let tasks = [];

const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

form.addEventListener("submit",function(e){

e.preventDefault();

let title = document.getElementById("title").value;
let date = document.getElementById("date").value;
let description = document.getElementById("description").value;

let task = new Task(title,date,description);

saveTask(task);

form.reset();

});

function displayTask(task,index){

let row = document.createElement("tr");

row.innerHTML = `

<td>${task.title}</td>
<td>${task.date}</td>
<td>${task.description}</td>
<td>
<button class="btn btn-danger btn-sm deleteBtn">Delete</button>
</td>

`;

row.querySelector(".deleteBtn").addEventListener("click",function(){

deleteTask(index);

});

taskList.appendChild(row);

}

function displayTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

displayTask(task,index);

});

}

function saveTask(task){

fetch("https://jsonplaceholder.typicode.com/posts",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(task)

})

.then(res=>res.json())

.then(data=>{

tasks.push(task);

localStorage.setItem("tasks",JSON.stringify(tasks));

displayTasks();

});

}

function deleteTask(index){

tasks.splice(index,1);

localStorage.setItem("tasks",JSON.stringify(tasks));

displayTasks();

}

function loadTasks(){

let savedTasks = localStorage.getItem("tasks");

if(savedTasks){

tasks = JSON.parse(savedTasks);

displayTasks();

}

fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")

.then(res=>res.json())

.then(data=>{

data.forEach(item=>{

let task = new Task(item.title,"2026-01-01",item.body);

tasks.push(task);

});

displayTasks();

});

}

window.onload = loadTasks;