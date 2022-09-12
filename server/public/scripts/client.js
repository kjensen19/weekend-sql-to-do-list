$(document).ready(onReady);

function onReady() {
  console.log('JS/JQ')
//   fetchTasks()
  fetchCalendar()
  $('#secrets').on('click', '.delButton', deleteTask)
  $('#submitBut').on('click', handleSubmit)
  $('#secrets').on('click', '.compButton', completeTask)
  $('.dropdown-item').on('click', fetchCalendar)

}
let firstTime = true
//Function to render task data,
//including comp/del buttons
//and attach id for manipulation
function renderCalendar (calendar){
    console.log('Is this thing on? RENDER ', calendar)
    $('caption').text(`${calendar[0].month}, ${calendar[0].year}`)
    let targetWeek = 1;
    for (let day of calendar){
        console.log('targetWeek = ', targetWeek)
        console.log(`day.day = ${day.day}`)
        $('#viewCalendar').children(`#week-${targetWeek}`).children(`.${day.dayname.trim()}`).attr('id', `${day.calendar_date}`).text(`${day.day}`)
        if (day.dayname.trim() === "Saturday"){
            targetWeek += 1;}
        }
    fetchTasks(calendar[0].calendar_date, calendar[calendar.length - 1].calendar_date)


         

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
          
    
    
    
}

function renderTasks(tasks){
    $('#secrets').empty();

    for (let task of tasks) {
        let yesOrNo = 'No'
        if (task.complete) {
            yesOrNo = 'Yes'
        }
        console.log('why?')
        $('#secrets').append(`
        <div class="offcanvas offcanvas-start text-bg-dark" data-id="${task.id}" tabindex="-1" id="offcanvasDark${task.id}" aria-labelledby="offcanvasDarkLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasDarkLabel">To Do:</h5>
            </div>
            <div class="offcanvas-body ${yesOrNo}">
                <h3>${task.target}</h3>
                <h4>${task.task}</h2>
                <h3>Completed? ${yesOrNo}</h2>
                <button class="compButton ${yesOrNo} btn btn-light" id=${task.id}>  Task Complete</button>
                <button class="delButton btn btn-light" id=${task.id}>Delete Task</button>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close">CLICK</button>
        </div>
        `)
        $(`#${task.target}`).append(`<br>
        <a data-bs-toggle="offcanvas" class="${yesOrNo}" href="#offcanvasDark${task.id}" role="button" aria-controls="offcanvas">
            ${task.task}
        </a>
    `)}
    $('.true').prop("disabled", true).css("background-color", "lightgreen");
}

function handleSubmit() {
    console.log('Submit button clicked.')
    let newTask = {};
    newTask.task = $('#enterTask').val();
    newTask.date = $('#enterDate').val()
    console.log(newTask.date)
    addTask(newTask);
}

// //POST to add new task
function addTask(taskToAdd) {
    //let dateToUpdate = newTask.data
    $.ajax({
        type: 'PUT',
        url: `/calendar`,
        data: taskToAdd
    }).then(function(response) {
        console.log('Response from server.', response);
        firstTime = true
        fetchCalendar();
    }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time, please try again later');
    })
}

// GET to fetch tasks
function fetchTasks(minDate, maxDate) {
    $.ajax({
        type: 'GET',
        url: `/tasks?minDate=${minDate}&maxDate=${maxDate}`
    }).then(function(response) {
        console.log('fetch task', response);
        if (firstTime === true) {
            $('#startScreenTarget').empty()
            for (let task of response) {
                let yesOrNo = 'No'
                if (task.complete) {
                    yesOrNo = 'Yes'
                }
                $('#startScreenTarget').append(`
                    <li class="${yesOrNo}">${task.task}<br> Target: ${task.target}<br> Complete: ${yesOrNo}</li>
                `)
            }
        $('#startScreen').modal('show')
        firstTime = false
        } else {
        renderTasks(response)}
    }).catch(function(error) {
        console.log('GET is on fire', error)
    })
}

function fetchCalendar() {
    if (firstTime === false){
        console.log('this in fetchCal', $(this).data().month)
        month = $(this).data().month
        year = $(this).data().year
        console.log('month', month)
        console.log('year', year)
    } else {
        fetchTasks('09-01-2022', '12-31-2023')
        return
    }
    $.ajax({
        type: 'GET',
        url:`/calendar?month=${month}&year=${year}`
    }).then(function(response) {
        console.log('please work', response);
        renderCalendar(response)
        $('button .true').prop('disabled', true)
        firstTime = false
    }).catch(function(error) {
        console.log('CALENDAR GET is boxed', error)
    })
}

//PUT to update completion
function completeTask() {
    let dateTo = $(this).attr('id')
    console.log(`dateTo = ${dateTo}`)
    $(this).prop('disabled', true)
    console.log('I already did that one')
    $.ajax({
        method: 'PUT',
        url: `/tasks/${dateTo}`
    }).then((response) => {
        firstTime = true
        fetchCalendar()
    })
}


//PUT to update calendar with task data
    //is it possible to store a SQL query in a table?

function addTaskToCalendar() {
    let idToUpdate = 7
}

//DELETE to del task
function deleteTask() {
    let idToDelete = $(this).attr('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
    }).then((response) => {
        firstTime = true;
        fetchCalendar()
    }).catch((response) => {
        console.log('Error in delete', response)
    })
}
