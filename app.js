const taskInput = document.querySelector(".create__task-inp");
const addButton = document.querySelector(".create__btn");
const incompleteTaskHolder = document.querySelector(".section__list_incomplete");
const completedTasksHolder = document.querySelector(".section__list_completed");

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

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
    if (!taskInput.value){
        return;
    };

    let listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

function editTask (){
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

function deleteTask (){
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);

}

function taskCompleted (){
    const listItem = this.parentNode;
    listItem.querySelector(".task-item__label").classList.add("task-item__label_completed");
    completedTasksHolder.append(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}

function taskIncomplete (){
    const listItem = this.parentNode;
    listItem.querySelector(".task-item__label").classList.remove("task-item__label_completed");
    incompleteTaskHolder.append(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest (){}

const bindTaskEvents = function(taskListItem, checkBoxEventHandler){
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