
import { GET_ALL_CLASSES , ADD_CLASS, UPDATE_CLASS, DELETE_CLASS  } from '../types';

const initialState = {
  classes: [],
  loading: true,
  
};

const classesReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case GET_ALL_CLASSES: 
      return { ...state, classes: action.payload, loading: false };
      case ADD_CLASS:
        return {
          ...state,
          classes: [...state.classes, action.payload],
        };
      case UPDATE_CLASS:
        return {
          ...state,
          classes: state.classes.map(cls =>
            cls.classId === action.payload.classId ? action.payload : cls
          ),
        };
      case DELETE_CLASS:
        return {
          ...state,
          classes: state.classes.filter(cls => cls.classId !== action.payload),
        };
    default:
      return state;
  }
};


export default classesReducer;
