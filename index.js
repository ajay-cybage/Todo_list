
// delete todo
const deletetoDo = (todoId) => {
    let newFormData = formData.filter((data) => {
        return data.taskId != todoId;
    })
    localStorage.setItem("formData", JSON.stringify(newFormData));
    fetchDodo()
}
// update todo
const updateTodo = (todoId) => {
    let newFormData = [];
    formData.forEach((data) => {
        if (data.taskId === todoId) {
            data.isCompleted = true
        }
        newFormData.push(data);
    })
    localStorage.setItem("formData", JSON.stringify(newFormData));
    fetchDodo()

}
// check toto
const checkTodo = (todoId) => {
    let newFormData = [];
    formData.forEach((data) => {
        if (data.taskId === todoId) {
            if (data.isChecked) {
                data.isChecked = false
                document.getElementById(`task_id_${todoId}`).classList.remove('strikethrough');
            } else {
                data.isChecked = true
                document.getElementById(`task_id_${todoId}`).classList.add('strikethrough');
            }

        }
        newFormData.push(data);
    })
    localStorage.setItem("formData", JSON.stringify(newFormData));
    // location.reload()

}
//fetch todolist
const fetchDodo = () => {
    formData = JSON.parse(localStorage.getItem("formData"));

    if (formData.length == 0) {
        document.getElementById('tableBody').innerHTML = `<tr ><td colspan=2>No Task Found ,Please add the task...<td></tr>`;
        return false
    }
    let tableData;
    tableData = formData.map((data, index) => {
        return ` <tr id="tr_id_${data.taskId}">
        <td><input type="checkbox" ${data.isCompleted ? "" : "disabled"}  ${data.isChecked ? "checked" : ""} onClick=checkTodo(${data.taskId}) /></td>
        <td id="task_id_${data.taskId}" class="${data.isChecked ? "strikethrough" : ""}">${data.taskName}</td>
        <td>
            <button type="submit" class="delete_task" onClick=deletetoDo(${data.taskId}) >Delete</button>
            ${!data.isCompleted ? `<button type="submit" onClick=updateTodo(${data.taskId})>Complete</button>` : '<button disabled>Completed</button>'}
        </td>
        </tr>`
    }).join('');

    document.getElementById('tableBody').innerHTML = tableData;
    return true
}
//get todo list(another way to fetch data)
// (() => {
//     fetchDodo()
// })();

function responseText(some) {
    console.log(some)
}

//fetch todolist using promises
let myPromise = new Promise(function (myResolve, myReject) {
    if (fetchDodo()) {
        myResolve("Success! Task Data Found");

    } else {
        myReject("Error! Task Data Not Found");
    }
});

myPromise.then(
    function (value) { responseText(value); },
    function (error) { responseText(error); }
);


// add todo list
function add_todo(e) {
    e.preventDefault()
    let task = document.getElementById("task").value;
    if (task) {
        taskObject = {
            taskId: Math.random(),
            taskName: task,
            isCompleted: false,
            isChecked: false,
        }
        if (formData) {
            let newFormData = [...formData, taskObject];
            localStorage.setItem("formData", JSON.stringify(newFormData));
        } else {
            localStorage.setItem("formData", JSON.stringify([taskObject]));

        }
        fetchDodo()
        var form = document.getElementById("task").value = '';

    }
}
var form = document.getElementById("form_submit");
// add event listener
form.addEventListener("submit", add_todo, true);

//reset fields
const resetTodo = () => {
    location.reload()
}