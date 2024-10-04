// reducers/studentReducer.js

import { GET_ALL_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT , GET_STATUESES} from '../types';

const initialState = {
  students: [],
  studentStatuses: [] 
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
      case GET_STATUESES:
        return {
          ...state,
          studentStatuses: [...state.students, action.payload],
        };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student.studentId === action.payload.studentId ? action.payload : student
        ),
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((student) => student.studentId !== action.payload),
      };
    default:
      return state;
  }
};
