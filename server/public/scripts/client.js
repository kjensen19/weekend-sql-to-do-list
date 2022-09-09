$(document).ready(onReady);

function onReady() {
  console.log('JS/JQ')
}


function renderTasks (){
    console.log('Is this thing on? RENDER')
    $('#viewTasks').empty();
    for(let task of tasks){
      $('#viewTasks').append(`
        <tr data-id"${task.id}>
          <td>${task.task}</td>
          <td>${task.complete}</td>
        </tr>
      `);
    }
  }