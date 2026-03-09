import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function App(){

const [tasks,setTasks] = useState([]);
const [title,setTitle] = useState("");
const [editId,setEditId] = useState(null);

const loadTasks = ()=>{
fetch("http://localhost:5000/tasks")
.then(res=>res.json())
.then(data=>setTasks(data));
}

useEffect(()=>{
loadTasks();
},[]);

const addTask = ()=>{

fetch("http://localhost:5000/tasks",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:title,
status:"Pending"
})
})
.then(()=>{
setTitle("");
loadTasks();
});
}

const deleteTask = (id)=>{
fetch(`http://localhost:5000/tasks/${id}`,{
method:"DELETE"
})
.then(()=>loadTasks());
}

const editTask = (task)=>{
setTitle(task.title);
setEditId(task._id);
}

const updateTask = ()=>{
fetch(`http://localhost:5000/tasks/${editId}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:title
})
})
.then(()=>{
setEditId(null);
setTitle("");
loadTasks();
});
}

const changeStatus = (task)=>{

const newStatus = task.status === "Pending" ? "Completed" : "Pending";

fetch(`http://localhost:5000/tasks/${task._id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
status:newStatus
})
})
.then(()=>loadTasks());

}

return(

<div className="container">

<h1 className="text-center bg-dark text-white p-3">
Task Tracker Dashboard
</h1>

<div className="row mt-3">

<div className="col-md-8">

<input
className="form-control"
placeholder="Enter Task"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

</div>

<div className="col-md-4">

{editId ?

<button
className="btn btn-warning w-100"
onClick={updateTask}
>
Update Task
</button>

:

<button
className="btn btn-success w-100"
onClick={addTask}
>
Add Task
</button>

}

</div>

</div>

<hr/>

<h3>Task List</h3>

{tasks.map((task)=>(

<div
key={task._id}
className="card p-3 m-2 d-flex flex-row justify-content-between"
>

<div>

<h5>{task.title}</h5>

<p>Status: {task.status}</p>

</div>

<div>

<button
className="btn btn-primary m-1"
onClick={()=>editTask(task)}
>
Edit
</button>

<button
className="btn btn-danger m-1"
onClick={()=>deleteTask(task._id)}
>
Delete
</button>

<button
className="btn btn-info m-1"
onClick={()=>changeStatus(task)}
>
Change Status
</button>

</div>

</div>

))}

</div>

)

}

export default App