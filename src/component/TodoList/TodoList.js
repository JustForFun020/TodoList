import { useState, useEffect, useReducer, useRef } from "react";
import Loading from "./Loading";
import reducer, { initState, setJob, addJob, deleteJob } from "./reducer";
import "./index.scss";

const url = "https://jsonplaceholder.typicode.com/todos";

function Main() {
  const [state, dispatch] = useReducer(reducer, initState);

  const [jobsAPI, setJobsApi] = useState([]);
  const [loading, setLoading] = useState(true);

  const { jobAdd, jobsAdd, completed } = state;
  const inputRef = useRef();

  // Chỉnh Sửa Công Việc Được Thêm Từ Người Dùng
  const handleEdit_jobAdd = (item) => {
    dispatch(setJob(item));
    dispatch(deleteJob(item));

    inputRef.current.focus();
  };

  //   Thêm Công Việc Từ Người Dùng
  const handleSubmit_jobAdd = () => {
    if (jobAdd !== "") {
      dispatch(addJob(jobAdd));
      dispatch(setJob(""));

      inputRef.current.focus();
    } else {
      alert("Bạn Phải Nhập Công Việc Muốn Add !!!");
    }
  };

  //   Chỉnh Sửa Trạng Thái Của Công Việc Được Lấy Từ API
  const handleStatus_jobAdd = (isCompleted) => {
    console.log(jobsAdd);
  };

  //   Gọi API
  const handleShow_jobApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const newJob = await res.json();
      setJobsApi(newJob);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   Xóa Công Việc Được Lấy Từ API
  const handleRemove_jobApi = (index) => {
    const updateJobs = jobsAPI.filter((item) => item.id !== index);
    setJobsApi(updateJobs);
  };

  //   Chỉnh Sửa Công Việc Được Lấy Từ API
  const handleEdit_jobApi = (item, index) => {
    dispatch(setJob(item));
    const updateJobs = jobsAPI.filter((item) => item.id !== index);
    setJobsApi(updateJobs);

    inputRef.current.focus();
  };
  //   Chỉnh Sửa Trạng Thái Của Công Việc Được Lấy Từ API
  const handleStatus_jobApi = (index) => {
    const newStatus = jobsAPI.map((item) =>
      item.id === index ? { ...item, completed: !item.completed } : item
    );
    setJobsApi(newStatus);
  };

  //   Render Công Viêc Được Lấy Công Việc Từ API
  useEffect(() => {
    handleShow_jobApi();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <div className="container">
      {/* Xử Lý Công Việc Được Thêm Từ Người Dùng */}
      <div className="submit">
        <input
          placeholder="Enter Job..."
          value={jobAdd}
          ref={inputRef}
          onChange={(e) => dispatch(setJob(e.target.value))}
        />
        <button onClick={handleSubmit_jobAdd}>Add Job</button>
      </div>
      <ul>
        {jobsAdd.map((job, index) => {
          return (
            <li key={index} className="add__list">
              {job}{" "}
              <div>
                <span className={completed ? "green" : "red"}>
                  {completed ? "Đã Hoàn Thành" : "Chưa Hoàn Thành"}
                </span>

                <span
                  className="delete__job"
                  onClick={() => dispatch(deleteJob(index))}
                >
                  &times;
                </span>
                <button
                  className="btn__edit"
                  onClick={() => handleEdit_jobAdd(job)}
                >
                  Edit
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {/* Xử Lý Công Việc Được Lấy Từ API */}
      <ul>
        {jobsAPI.map((job) => {
          return (
            <li key={job.id}>
              {job.title}
              <div>
                <span
                  onClick={() => handleStatus_jobApi(job.id)}
                  className={job.completed ? "green" : "red"}
                >
                  {job.completed ? "Đã Hoàn Thành" : "Chưa Hoàn Thành"}
                </span>
                <span
                  className="delete__job"
                  onClick={() => handleRemove_jobApi(job.id)}
                >
                  &times;
                </span>
                <button
                  className="btn__edit"
                  onClick={() => handleEdit_jobApi(job.title, job.id)}
                >
                  Edit
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Main;
