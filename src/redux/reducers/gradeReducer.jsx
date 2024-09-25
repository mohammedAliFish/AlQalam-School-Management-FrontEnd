import { GET_ALL_GRADES, ADD_GRADE, UPDATE_GRADE, DELETE_GRADE } from '../types';

const initialState = {
  grades: [], 
  loading: true,
};

const gradesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GRADES:
      return { ...state, grades: action.payload, loading: false };
      
    case ADD_GRADE:
      return {
        ...state,
        grades: [...state.grades, action.payload],
      };
      
    case UPDATE_GRADE:
      return {
        ...state,
        grades: state.grades.map(grade =>
          grade.gradeId === action.payload.gradeId ? action.payload : grade
        ),
      };
      
    case DELETE_GRADE:
      return {
        ...state,
        grades: state.grades.filter(grade => grade.gradeId !== action.payload),
      };
      
    default:
      return state;
  }
};

export default gradesReducer;
