let taskList = [];

$(document).ready(function () {
    $("#btnSave").click(function () {
        registerTask();
    });
});


// ======================
// REGISTER TASK
// ======================
function registerTask(){

    let title = $("#txtTitle").val().trim();
    let description = $("#txtDescription").val().trim();
    let color = $("#selColor").val();
    let date = $("#selDate").val();
    let status = $("#selStatus").val();
    let budget = $("#numBudget").val();

    if(title === ""){
        alert("Title required");
        return;
    }

    if(budget === "" || budget <= 0){
        alert("Enter valid budget");
        return;
    }

    let task = new Task(
        title,
        description,
        color,
        date,
        status,
        budget
    );

    taskList.push(task);

    displayTasks();
    clearForm();
}


// ======================
// DISPLAY TASKS (ROWS)
// ======================
function displayTasks(){

    $("#list").empty();

    for(let i=0; i<taskList.length; i++){

        let task = taskList[i];

        let row = `
        <tr>
            <td>
                <div class="color-box"
                     style="background:${task.color}">
                </div>
            </td>

            <td>${task.title}</td>
            <td>${task.desc}</td>
            <td>${task.date || "N/A"}</td>
            <td>${task.status}</td>
            <td>$${task.budget}</td>

            <td>
                <button onclick="deleteTask(${i})">
                    Delete
                </button>
            </td>
        </tr>
        `;

        $("#list").append(row);
    }
}


// ======================
function deleteTask(index){
    taskList.splice(index,1);
    displayTasks();
}


// ======================
function clearForm(){
    $("#taskForm")[0].reset();
}