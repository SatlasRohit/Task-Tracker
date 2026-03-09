import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/taskdb")
.then(()=>console.log("MongoDB Connected"));

const TaskSchema = new mongoose.Schema({
  title:String,
  status:String
});

const Task = mongoose.model("Task",TaskSchema);

app.get("/tasks",async(req,res)=>{
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks",async(req,res)=>{
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.put("/tasks/:id",async(req,res)=>{
  await Task.findByIdAndUpdate(req.params.id,req.body);
  res.json({message:"Task updated"});
});

app.delete("/tasks/:id",async(req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({message:"Task deleted"});
});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});