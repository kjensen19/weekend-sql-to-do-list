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
        $('#secrets').append(`
        <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDark" aria-labelledby="offcanvasDarkLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasDarkLabel">To Do:</h5>
            </div>
            <div class="offcanvas-body">
                <button class="compButton ${task.complete} btn btn-light">  Task Complete</button>
                <p>${task.task}</p>
                <p>${task.complete}</p>
                <p>${task.target}</b>
                <button class="delButton btn btn-light">Delete Task</button>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvasDark" aria-label="Close">CLICK</button>
        </div>
        `)
    //   $('#viewTasks').append(`
    //     <tr class="${task.complete}" data-id="${task.id}">
    //         <td>
    //             <button class="compButton ${task.complete} btn btn-light">  Task Complete</button>
    //         </td>
    //         <td>${task.task}</td>
    //         <td>${task.complete}</td>
    //         <td>${task.target}</td>
    //         <td>
    //             <button class="delButton btn btn-light">Delete Task</button>
    //         </td>
    //     </tr>
    //   `)
      $('.true').prop("disabled", true).css("background-color", "lightgreen");
    }
    
}

function renderCalendar(calendar) {
    $('caption').text(`${calendar[0].month}, ${calendar[0].year}`)
    let targetWeek = 1;
    for(let day of calendar) {
        console.log('targetWeek = ', targetWeek)
        $('#viewCalendar').children(`#${targetWeek}`).children(`.${day.dayname.trim()}`).attr('id', `${day.id}`).text(`${day.day}`)
        if (day.dayname.trim() === "Saturday"){
            targetWeek += 1;
        }
   

    }
}

function handleSubmit() {
    console.log('Submit button clicked.')
    let newTask = {};
    newTask.task = $('#enterTask').val();
    newTask.date = $('#enterDate').val()
    console.log(newTask.date)
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
        $('button .true').prop('disabled', true)
    }).catch(function(error) {
        console.log('CALENDAR GET is boxed', error)
    })
}

//PUT to update completion
function completeTask() {
    let idToUpdate = $(this).closest('tr').data('id')
    console.log($(this))
    $(this).prop('disabled', true)
    console.log('I already did that one')
    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToUpdate}`
    }).then((response) => {
        fetchTasks()
    })
}

//PUT to update calendar with task data
    //is it possible to store a SQL query in a table?

function addTaskToCalendar() {
    let idToUpdate = 7
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