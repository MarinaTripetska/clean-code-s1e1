const taskInput = document.querySelector(".create__task-inp");
const addButton = document.querySelector(".create__btn");
const incompleteTaskHolder = document.querySelector(".section__list_incomplete");
const completedTasksHolder = document.querySelector(".section__list_completed");

function createNewTaskElement (taskString){
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "task-item__checkbox task-item__checkbox_indents";

    const label = document.createElement("label");
    label.innerText = taskString;
    label.className = 'task-item__label';

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task-item__input task-item__input_indents";

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "btn task-item__edit-btn";

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn task-item__delete-btn";

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.className = "task-item__delete-img";
    deleteButton.appendChild(deleteButtonImg);

    listItem.append(checkBox, label, editInput, editButton, deleteButton);

    return listItem;
}

function addTask (){
    console.log("Add Task...");

    if (!taskInput.value){
        return;
    };

    let listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

function editTask (){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;

    const editInput = listItem.querySelector('.task-item__input');
    const label = listItem.querySelector(".task-item__label");
    const editBtn = listItem.querySelector(".task-item__edit-btn");

    const containsClass = listItem.classList.contains("task-item_edit");
    if(containsClass){
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("task-item_edit");
};

function deleteTask(){
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);

}

const taskCompleted = function(){
    console.log("Complete Task...");

    const listItem = this.parentNode;
    listItem.querySelector(".task-item__label").classList.add("task-item__label_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function(){
    console.log("Incomplete Task...");

    const listItem = this.parentNode;
    listItem.querySelector(".task-item__label").classList.remove("task-item__label_completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



const ajaxRequest = function(){
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");

    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector(".task-item__edit-btn");
    const deleteButton = taskListItem.querySelector(".task-item__delete-btn");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}


for (let i = 0; i < incompleteTaskHolder.children.length; i++){
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}