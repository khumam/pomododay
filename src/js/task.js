$(document).ready(function () {
  loadTask();
  showTask();
})

$(document).on('click', '.task', function () {
  const taskId = $(this).data('id');
  updateStatus(taskId)
})

$("#inputtask").keypress(function (e) {
  if (e.which == 13) {
    let tasks = loadTask();
    tasks.push({ id: makeid(9), val: $("#inputtask").val(), isDone: false });
    saveTask(tasks)
    $("#inputtask").val('');
    showTask();
  }
})

function loadTask() {
  let tasks = localStorage.getItem('task');
  tasks = tasks != null ? JSON.parse(tasks) : [];
  return tasks;
}

function saveTask(tasks) {
  tasks = JSON.stringify(tasks);
  localStorage.setItem("task", tasks);
}

function showTask() {
  $('#listtask').empty();
  const tasks = loadTask();
  for (let index = tasks.length - 1; index >= 0; index--) {
    let task = `<div class="task mb-3 ${tasks[index].isDone ? 'done' : ''}" data-id="${tasks[index].id}"><span>- ${tasks[index].val}</span></div>`;
    $('#listtask').append(task);
  }
}

function updateStatus(id) {
  const tasks = loadTask();
  tasks.map(function (value) {
    console.log(value.id)
    console.log(id)
    if (value.id == id) {
      value.isDone = !value.isDone;
      console.log(value.isDone)
    }

    return value;
  });
  saveTask(tasks);
  showTask();
}

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}