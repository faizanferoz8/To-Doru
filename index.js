import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongodbURI = 'mongodb+srv://faizanferoz8:' + encodeURIComponent('123') + '@cluster0.rz3647u.mongodb.net/taskDB';
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })

const taskSchema = new mongoose.Schema({
  name: String,
  time: String
});

const Task = mongoose.model('Task', taskSchema);
app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.render("index.ejs", {
      heading: "Today",
      data: tasks
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Error fetching tasks");
  }
});

app.post("/delete-task", async (req, res) => {
    try {
       const toDelete= req.body.toDelete;
       Task.deleteMany({ name: toDelete }).then(function(){
           console.log("Data deleted"); 
         }).catch(function(error){
          console.log(error); 
         });
         res.redirect("/");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).send("Error fetching tasks");
    }
  });

app.post("/add-task", (req,res)=>{
      const newTask= req.body.newTask;
      const taskDate = req.body.taskDate
      Task.insertMany({
        name: newTask,
        time: taskDate
      })
      res.redirect("/");
})


app.listen(process.env.PORT, () => {
  console.log(`Server listening `);
});