$(document).ready(onReady);

function onReady() {
  console.log('JS/JQ')
  renderTasks()
  $('#viewTasks').on('click', '.compButton', completeTask)
  $('#viewTasks').on('click', '.delButton', deleteTask)

}

//Function to render task data,
//including comp/del buttons
//and attach id for manipulation
function renderTasks (){
    console.log('Is this thing on? RENDER')
    $('#viewTasks').empty();
    for(let task of tasks){
      $('#viewTasks').append(`
        <tr data-id=${task.id}>
            <td>
                <button class="compButton">Task Complete</button>
            </td>
            <td>${task.task}</td>
            <td>${task.complete}</td>
            <td>
                <button class="delButton">Delete Task</button>
            </td>
        </tr>
      `);
    }
}

//POST to add new task
function addTask() {

}

//GET to fetch tasks
function fetchTasks() {
    
}

//PUT to update completion
function completeTask() {

}
//DELETE to del task
function deleteTask() {

}