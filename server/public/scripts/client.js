$(document).ready(onReady);

function onReady() {
  //console.log('JS/JQ')
//   fetchTasks()
  fetchCalendar()
  $('#secrets').on('click', '.delButton', deleteTask)
  $('#submitBut').on('click', handleSubmit)
  $('#secrets').on('click', '.compButton', completeTask)
  $('.dropdown-item').on('click', fetchCalendar)
  $('#startClose').on('click', setFetch)

}

function setFetch() {
    firstTime = true
    fetchCalendar()
}
let firstTime = true
//Function to render calendar
//and attach id for manipulation
function renderCalendar (calendar){
    console.log('Is this thing on? RENDER ', calendar)
    $('caption').text(`${calendar[0].month}, ${calendar[0].year}`)
    //variable to format calendar dates to correct days on calendar frame
    let targetWeek = 1;
    $('#viewCalendar').children('[id^=week]').children().empty()
    for (let day of calendar){
        console.log('targetWeek = ', targetWeek)
        console.log(`day.day = ${day.day}`)
        $('#viewCalendar').children(`#week-${targetWeek}`).children(`.${day.dayname.trim()}`).attr('id', `${day.calendar_date}`).text(`${day.day}`)
        if (day.dayname.trim() === "Saturday" && targetWeek < 5){
            //increment target week to move to next calendar row
            targetWeek += 1;
        } else if(day.dayname.trim() === "Saturday" && targetWeek === 5) {
            targetWeek = 1;
        }
    }
        //Call fetch tasks with parameters for date range
    fetchTasks(calendar[0].calendar_date, calendar[calendar.length - 1].calendar_date)
 
}


function renderTasks(tasks){
    //empty the offcanvas container
    $('#secrets').empty();
    //loop through tasks for the selected month to render to the calendar
    for (let task of tasks) {
        //change task complete from true/false to yes/no
        let yesOrNo = 'No'
        if (task.complete) {
            yesOrNo = 'Yes'
        }
        //console.log('why?')
        //create offcanvas for each task
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
                <button class="delButton btn btn-light" data-bs-dismiss="offcanvas" id=${task.id}>Delete Task</button>
            </div>
            <button type="button" class="btn btn-light" data-bs-dismiss="offcanvas" aria-label="Close">CLOSE</button>
        </div>
        `)
        //display clickable task on the calendar
        //trim task display 
        $(`#${task.target}`).append(`<br>
        <a data-bs-toggle="offcanvas" class="${yesOrNo} taskLink" href="#offcanvasDark${task.id}" role="button" aria-controls="offcanvas">
            ${(task.task).substring(0, 25)}
        </a>
    `)}
    $('button.Yes').prop("disabled", true).css("background-color", "lightgreen").css("color", "white");
}
//handle submit button and call add task on collected inputs
//empty inputs after add call
function handleSubmit() {
    //console.log('Submit button clicked.')
    let newTask = {};
    newTask.task = $('#enterTask').val();
    newTask.date = $('#enterDate').val()
    //console.log(newTask)
    addTask(newTask);
    $('#enterTask').val('')
    $('#enterDate').val('')
}

// //POST to add new task
function addTask(taskToAdd) {
    //firstTime = true
    $.ajax({
        type: 'POST',
        url: `/tasks`,
        data: taskToAdd
    }).then(function(response) {
        //console.log('Response from server.', response);
        //reset to display full list as modal
        firstTime = true
        fetchCalendar();
    }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time, please try again later');
    })
}

// GET to fetch tasks with date range (for currently displayed month)
function fetchTasks(minDate, maxDate) {
    $.ajax({
        type: 'GET',
        url: `/tasks?minDate=${minDate}&maxDate=${maxDate}`
    }).then(function(response) {
        //console.log('fetch task', response);
        //check if start modal should be displayed
        if (firstTime === true) {
            $('#startScreenTarget').empty()
            for (let task of response) {
                let yesOrNo = 'No'
                if (task.complete) {
                    yesOrNo = 'Yes'
                }
                //append to start modal
                $('#startScreenTarget').append(`
                    <li class="${yesOrNo}">${task.task}<br> Target: ${task.target}<br> Complete: ${yesOrNo}</li>
                `)
            }
            //show modal
        $('#startScreen').modal('show')
        firstTime = false
         } //else {
        renderTasks(response)//}
    }).catch(function(error) {
        console.log('GET is on fire', error)
    })
}
    //function to fetch calendar data
function fetchCalendar() {
    //not sure this conditional is neccesarry further testing required
    if (firstTime === false){
        //console.log('this in fetchCal', $(this).data().month)
        month = $(this).data().month
        year = $(this).data().year
        console.log('month', month)
        console.log('year', year)
    } else {
        //fetchTasks('09-01-2022', '12-31-2023')
        month = 'September'
        year = "2022"
        //return
        
        
    }
    $.ajax({
        type: 'GET',
        url:`/calendar?month=${month}&year=${year}`
    }).then(function(response) {
        //console.log('please work', response);
        renderCalendar(response)
        //Test me!
        $('button .true').prop('disabled', true)
        // firstTime = false
    }).catch(function(error) {
        console.log('CALENDAR GET is boxed', error)
    })
}

//PUT to update completion status
function completeTask() {
    let dateTo = $(this).attr('id')
    //console.log(`dateTo = ${dateTo}`)
    $(this).prop('disabled', true)
    //console.log('I already did that one')
    $.ajax({
        method: 'PUT',
        url: `/tasks/${dateTo}`
    }).then((response) => {
        firstTime = true
        fetchCalendar()
    })
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
