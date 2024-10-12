let globalId = 0
let todo = []
let inProgress = []
let underReview = []
let finished = []
let dropzones = []

todo.push({
    id: globalId++,
    title: 'Task 1',
    description: 'This is the first task'
})

inProgress.push({
    id: globalId++,
    title: 'Task 2',
    description: 'This is the second task'
})

underReview.push({
    id: globalId++,
    title: 'Task 3',
    description: 'This is the third task'
})

finished.push({
    id: globalId++,
    title: 'Task 4',
    description: 'This is the fourth task'
})
render();

let todoTaskDiv = document.querySelector('.todoTasks')
let inProgressDiv = document.querySelector('.inProgressTasks')
let underReviewDiv = document.querySelector('.underReviewTasks')
let finishedDiv = document.querySelector('.finished')

let task = {
    id: 0,
    title: '',
    description: '',
}

todoTaskDiv.addEventListener('dragover', (event) => {
    event.preventDefault();
})

inProgressDiv.addEventListener('dragover', (event) => {
    event.preventDefault();
})

underReviewDiv.addEventListener('dragover', (event) => {
    event.preventDefault();
})

finishedDiv.addEventListener('dragover', (event) => {
    event.preventDefault();
})

document.querySelector('.todoTasks').addEventListener('drop', (event) => {
    event.preventDefault();
    let data = event.dataTransfer.getData('foo');
    let from = data[0];
    let task = JSON.parse(data.substring(1));
    let id = task.id;
    console.log(task);
    if (from == '1') {
        return;
    } else if (from == '2') {
        inProgress = inProgress.filter(task => task.id != id);
        console.log(inProgress);
    } else if (from == '3') {
        underReview = underReview.filter(task => task.id != id);
    } else {
        finished = finished.filter(task => task.id != id);
    }
    todo.push(task);
    render();
    console.log("Droppped!");
})

document.querySelector('.inProgressTasks').addEventListener('drop', (event) => {
    event.preventDefault();
    let data = event.dataTransfer.getData('foo');
    let from = data[0];
    let task = JSON.parse(data.substring(1));
    let id = task.id;
    console.log(task);
    if (from == '1') {
        todo = todo.filter(task => task.id != id);
        console.log(todo);
    } else if (from == '2') {
        return;
    } else if (from == '3') {
        underReview = underReview.filter(task => task.id != id);
    } else {
        finished = finished.filter(task => task.id != id);
    }
    inProgress.push(task);
    render();
    console.log("Moved to inProgress!");
    console.log(inProgress);
})

document.querySelector('.underReviewTasks').addEventListener('drop', (event) => {
    event.preventDefault();
    let data = event.dataTransfer.getData('foo');
    let from = data[0];
    let task = JSON.parse(data.substring(1));
    let id = task.id;
    console.log(task);
    if (from == '1') {
        todo = todo.filter(task => task.id != id);
    } else if (from == '2') {
        inProgress = inProgress.filter(task => task.id != id);
    } else if (from == '3') {
        return;
    } else {
        finished = finished.filter(task => task.id != id);
    }
    underReview.push(task);
    render();
    console.log("Dropped to underReview Tasks!");
})

document.querySelector('.finishedTasks').addEventListener('drop', (event) => {
    event.preventDefault();
    let data = event.dataTransfer.getData('foo');
    let from = data[0];
    let task = JSON.parse(data.substring(1));
    let id = task.id;
    console.log(task);
    if (from == '1') {
        todo = todo.filter(task => task.id != id);
    } else if (from == '2') {
        inProgress = inProgress.filter(task => task.id != id);
    } else if (from == '3') {
        underReview = underReview.filter(task => task.id != id);
    } else {
        return;
    }
    finished.push(task);
    render();
    console.log("Droppped to finished Tasks!");
})

function addTask(id) {
    event.preventDefault();
    let taskName = document.querySelectorAll('#task')[id - 1].value;
    if (taskName == "") {
        alert("Task Name cannot be empty");
        return;
    }
    let taskDescription = document.querySelectorAll('#desc')[id - 1].value;

    let task = {
        id: globalId,
        title: taskName,
        description: taskDescription
    };

    if (id == 1) {
        todo.push(task);
    } else if (id == 2) {
        inProgress.push(task);
    } else if (id == 3) {
        underReview.push(task);
    } else {
        finished.push(task);
    }

    globalId++;
    cancel(id);
    render();
}

function deleteTask(taskId, id) {
    if (id == 1) {
        todo = todo.filter(task => task.id != taskId);
    } else if (id == 2) {
        inProgress = inProgress.filter(task => task.id != taskId);
    } else if (id == 3) {
        underReview = underReview.filter(task => task.id != taskId);
    } else {
        finished = finished.filter(task => task.id != taskId);
    }

    render();
}

function cancel(id) {
    event.preventDefault();
    document.querySelectorAll('#task')[id - 1].value = "";
    document.querySelectorAll('#desc')[id - 1].value = "";
    document.querySelectorAll('.addingTask')[id - 1].style.display = 'none';
    document.querySelectorAll('.add-task')[id - 1].style.display = 'block';
}

function showTaskPane(id) {
    event.preventDefault();
    document.querySelectorAll('.addingTask')[id - 1].style.display = 'flex';
    document.querySelectorAll('.add-task')[id - 1].style.display = 'none';
}

function render() {
    // Rendering Todo Tasks
    let todoTasks = document.querySelector('.todoTasks');
    todoTasks.innerHTML = "";
    todo.forEach(task => {
        let taskDiv = document.createElement('div');
        let desc = document.createElement('span');
        let deleteButton = document.createElement('button');
        deleteButton.id = `${task.id}`;
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id, 1);
        })
        desc.innerHTML = task.title;
        taskDiv.appendChild(desc);
        taskDiv.appendChild(deleteButton);
        taskDiv.classList.add(`todo-${todo.length}`);
        taskDiv.draggable = true;
        taskDiv.addEventListener('dragstart', (event) => {
            console.log(task);
            event.dataTransfer.setData("foo", '1' + JSON.stringify(task));
        })
        todoTasks.appendChild(taskDiv);
    })

    // Rendering In Progress Tasks
    let inProgressTasks = document.querySelector('.inProgressTasks');
    inProgressTasks.innerHTML = "";
    inProgress.forEach(task => {
        let taskDiv = document.createElement('div');
        let desc = document.createElement('span');
        let deleteButton = document.createElement('button');
        deleteButton.id = `${task.id}`;
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id, 2);
        })
        desc.innerHTML = task.title;
        taskDiv.appendChild(desc);
        taskDiv.appendChild(deleteButton);
        taskDiv.classList.add(`in-progress-${todo.length}`);
        taskDiv.draggable = true;
        taskDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("foo", '2' + JSON.stringify(task));
        })
        inProgressTasks.appendChild(taskDiv);
    })

    // Rendering Under Review Tasks
    let underReviewTasks = document.querySelector('.underReviewTasks');
    underReviewTasks.innerHTML = "";
    underReview.forEach(task => {
        let taskDiv = document.createElement('div');
        let desc = document.createElement('span');
        let deleteButton = document.createElement('button');
        deleteButton.id = `${task.id}`;
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id, 3);
        })
        desc.innerHTML = task.title;
        taskDiv.appendChild(desc);
        taskDiv.appendChild(deleteButton);
        taskDiv.classList.add(`under-review-${todo.length}`);
        taskDiv.draggable = true;
        taskDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("foo", '3' + JSON.stringify(task));
        })
        underReviewTasks.appendChild(taskDiv);
    })

    // Rendering Finished Tasks
    let finishedTasks = document.querySelector('.finishedTasks');
    finishedTasks.innerHTML = "";
    finished.forEach(task => {
        let taskDiv = document.createElement('div');
        let desc = document.createElement('span');
        let deleteButton = document.createElement('button');
        deleteButton.id = `${task.id}`;
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id, 4);
        })
        desc.innerHTML = task.title;
        taskDiv.appendChild(desc);
        taskDiv.appendChild(deleteButton);
        taskDiv.classList.add(`finished-${todo.length}`);
        taskDiv.draggable = true;
        taskDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("foo", '4' + JSON.stringify(task));
        })
        finishedTasks.appendChild(taskDiv);
    });
}