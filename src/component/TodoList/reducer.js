// Khởi Tạo State Ban Đầu
export const initState = {
  jobAdd: "",
  jobsAdd: [],
};

// Action
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";

export const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
    completed: false,
  };
};

export const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
    completed: false,
  };
};

export const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
    completed: false,
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

export default reducer;