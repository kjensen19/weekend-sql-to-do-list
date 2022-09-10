$(document).ready(onReady);

function onReady() {
  console.log('JS/JQ')
  fetchTasks()
  fetchCalendar()
  $('#viewTasks').on('click', '.compButton', completeTask)
  $('#viewTasks').on('click', '.delButton', deleteTask)
  $('#submitBut').on('click', handleSubmit)

}

//Function to render task data,
//including comp/del buttons
//and attach id for manipulation
function renderTasks (tasks){
    console.log('Is this thing on? RENDER')
    $('#viewTasks').empty();
    for(let task of tasks){
      $('#viewTasks').append(`
        <tr class="${task.complete}" data-id="${task.id}">
            <td>
                <button class="compButton ${task.complete}">Task Complete</button>
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

function renderCalendar(calendar) {
    $('caption').text(`${calendar[0].month}`)
    let targetWeek = 1;
    for(let day of calendar) {
        console.log('targetWeek = ', targetWeek)
        $('#viewCalendar').children(`#${targetWeek}`).children(`.${day.dayname.trim()}`).text(`${day.day}`)
        if (day.dayname.trim() === "Saturday"){
            targetWeek += 1;
        }
   

    }
}

function handleSubmit() {
    console.log('Submit button clicked.')
    let newTask = {};
    newTask.task = $('#enterTask').val();
    addTask(newTask);
}

//POST to add new task
function addTask(taskToAdd) {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then(function(response) {
        console.log('Response from server.', response);
        fetchTasks();
    }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time, please try again later');
    })
}

//GET to fetch tasks
function fetchTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
        renderTasks(response)
    }).catch(function(error) {
        console.log('GET is on fire', error)
    })
}

function fetchCalendar() {
    $.ajax({
        type: 'GET',
        url:'/calendar'
    }).then(function(response) {
        console.log(response);
        renderCalendar(response)
    }).catch(function(error) {
        console.log('CALENDAR GET is boxed', error)
    })
}

//PUT to update completion
function completeTask() {
    let idToUpdate = $(this).closest('tr').data('id')
    console.log($(this))
    $(this).text('✅')
    $(this).attr('disable', true)
    console.log('I already read that one')
    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToUpdate}`
    }).then((response) => {
        fetchTasks()
    })
}

//DELETE to del task
function deleteTask() {
    let idToDelete = $(this).closest('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
    }).then((response) => {
        fetchTasks()
    }).catch((response) => {
        console.log('Error in delete', response)
    })
}