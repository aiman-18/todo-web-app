const clearButton =
    document.getElementById("clearButton");
const taskInput = document.getElementById("taskInput");

const addButton = document.getElementById("addButton");

const taskList = document.getElementById("taskList");


addButton.addEventListener("click", addTask);


taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


function addTask() {

    const taskText = taskInput.value.trim();


    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    const listItem = document.createElement("li");

    listItem.className = "task";


    const taskName = document.createElement("span");

    taskName.textContent = taskText;


    const buttonContainer =
        document.createElement("div");

    buttonContainer.className = "task-buttons";


    const completeButton =
        document.createElement("button");

    completeButton.textContent = "Done";

    completeButton.className = "complete-button";


    completeButton.addEventListener("click", function() {

        listItem.classList.toggle("completed");

    });


    const deleteButton =
        document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.className = "delete-button";


    deleteButton.addEventListener("click", function() {

        listItem.remove();

    });


    buttonContainer.appendChild(completeButton);

    buttonContainer.appendChild(deleteButton);


    listItem.appendChild(taskName);

    listItem.appendChild(buttonContainer);


    taskList.appendChild(listItem);


    taskInput.value = "";

    taskInput.focus();

}