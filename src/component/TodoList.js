import { useState, useEffect } from "react";
import "./index.scss";
import Jobs from "./Jobs";

const url = "https://jsonplaceholder.typicode.com/todos";

function TodoList() {

  const [jobs, setJobs] = useState([]);
  const [edit, setEdit] = useState('');

  // console.log(edit)

  const handleShow = async () => {
    try {
      const res = await fetch(url);
      const newJob = await res.json();
      setJobs(newJob);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleRemove = (index) => {
    const updateJobs = jobs.filter((item) => item.id !== index);
    setJobs(updateJobs);
  };

  const handleEdit = (item) => {
    setEdit(item)
  }

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <div className="container">
      <Jobs jobApi={edit}/>
      <ul>
        {jobs.map((job) => {
          return (
            <li key={job.id}>
              {job.title}
              <span className={job.completed ? "green" : "red"}>
                {job.completed ? "Đã Hoàn Thành" : "Chưa Hoàn Thành"}
                <span
                  className="delete__job"
                  onClick={() => handleRemove(job.id)}
                >
                  &times;
                </span>
                <button className="btn__edit" onClick={() => handleEdit(job.title)}>Edit</button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
