import { useState, useEffect, useReducer, useRef } from "react";
import "./index.scss";

const url = "https://jsonplaceholder.typicode.com/todos";

// Khởi Tạo State Ban Đầu
const initState = {
  jobAdd: "",
  jobsAdd: [],
  completed: false,
};

// Action
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";

const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        jobAdd: action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        jobsAdd: [...state.jobsAdd, action.payload],
      };
    case DELETE_JOB:
      const newJobs = [...state.jobsAdd];
      newJobs.splice(action.payload, 1);

      return {
        ...state,
        jobsAdd: newJobs,
      };
    default:
      throw new Error("Invalid");
  }
};

function Main() {
  const [jobsAPI, setJobsApi] = useState([]);
  const [state, dispatch] = useReducer(reducer, initState);

  const { jobAdd, jobsAdd, completed } = state;

  const inputRef = useRef();

  // Chỉnh Sửa Công Việc Được Add Từ Người Dùng
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

  //   Gọi API
  const handleShow_jobApi = async () => {
    try {
      const res = await fetch(url);
      const newJob = await res.json();
      setJobsApi(newJob);
    } catch (error) {
      throw new Error(error);
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

  //   Render Công Viêc Được Lấy Công Việc Từ API
  useEffect(() => {
    handleShow_jobApi();
  }, []);

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
              <span className={completed ? "green" : "red"}>
                {completed ? "Đã Hoàn Thành" : "Chưa Hoàn Thành"}
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
              </span>
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
              <span className={job.completed ? "green" : "red"}>
                {job.completed ? "Đã Hoàn Thành" : "Chưa Hoàn Thành"}
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
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Main;
