$(document).ready(function () {
  loadTask();
  showTask();
})

$(document).on('click', '.task', function () {
  const taskId = $(this).data('id');
  updateStatus(taskId)
})

$(document).on('click', '.deletetask', function () {
  const taskId = $(this).data('id');
  deleteTask(taskId)
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
    let task = `<div class="row align-items-center mb-3">
      <div class="col-md-11">
        <div class="card task ${tasks[index].isDone ? 'bg-secondary' : ''}" data-id="${tasks[index].id}">
          <div class="p-2">
            <span>${tasks[index].val}</span>
          </div>
        </div>
      </div>
      <div class="col-md-1 py-2">
        <button class="btn btn-danger btn-sm btn-block h-100 deletetask" data-id="${tasks[index].id}">X</button>
      </div>
    </div>`;
    $('#listtask').append(task);
  }
}

function updateStatus(id) {
  const tasks = loadTask();
  tasks.map(function (value) {
    if (value.id == id) {
      value.isDone = !value.isDone;
      console.log(value.isDone)
    }

    return value;
  });
  saveTask(tasks);
  showTask();
}

function deleteTask(id) {
  let tasks = loadTask();
  let currentTasks = []
  tasks.map(function (value) {
    if (value.id != id) {
      currentTasks.push(value);
    }
  });
  saveTask(currentTasks);
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