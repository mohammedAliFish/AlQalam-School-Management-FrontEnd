
import { GET_ALL_TEACHERS, ADD_TEACHERS, UPDATE_TEACHERS, DELETE_TEACHERS } from '../types/';

const initialState = {
  teachers: [],
  error: null,
};

const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
        loading:false
      };
      case ADD_TEACHERS:
      return {
        ...state,
        teachers: [...state.teachers, action.payload], 
      };
    case UPDATE_TEACHERS:
      return {
        ...state,
        teachers: state.teachers.map((teacher) =>
          teacher.teacherId === action.payload.teacherId ? action.payload : teacher
        ),
      };
    case DELETE_TEACHERS:
      return {
        ...state,
        teachers: state.teachers.filter((teacher) => teacher.teacherId !== action.payload),
      };
    default:
      return state;
  }
};

export default teachersReducer;
