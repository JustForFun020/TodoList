import { useReducer, useRef } from "react";

const initState = {
  job: "",
  jobs: [],
  completed: false,
};

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

const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        job: action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
    case DELETE_JOB:
      const newJobs = [...state.jobs];
      newJobs.splice(action.payload, 1);

      return {
        ...state,
        jobs: newJobs,
      };
    default:
      throw new Error("Invalid");
  }
};

const Jobs = ({jobApi}) => {
  const [state, dispatch] = useReducer(reducer, initState);
  
  const { job, jobs, completed } = state;

  const inputRef = useRef();

  const handleEdit = (item) => {
    dispatch(setJob(item))
    dispatch(deleteJob(item))

    inputRef.current.focus();
  }

  const handleSubmit = () => {
    if (job !== "") {
      dispatch(addJob(job));
      dispatch(setJob(""));

      inputRef.current.focus();
    } else {
      alert("Bạn Phải Nhập Công Việc Muốn Add !!!");
    }
  };
  return (
    <div>
      <div className="submit">
        <input
          placeholder="Enter Job..."
          value={job}
          ref={inputRef}
          onChange={(e) => dispatch(setJob(e.target.value))}
        />
        <button onClick={handleSubmit}>Add Job</button>
      </div>
      <ul>
        {jobs.map((job, index) => {
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
                <button className="btn__edit" onClick={() => handleEdit(job)}>Edit</button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Jobs;
