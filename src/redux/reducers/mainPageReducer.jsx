import { GET_MAIN_PAGE_DATA } from "../types";

const initialState = {
  data: {
    numberOfTeachers: 0,
    numberOfStudents: 0,
    numberOfClasses: 0,
  },
  loading: true,
};

const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_PAGE_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default mainPageReducer;
