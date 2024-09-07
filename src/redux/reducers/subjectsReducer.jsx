
import { GET_ALL_SUBJECTS , ADD_SUBJECTS , UPDATE_SUBJECT, DELETE_SUBJECT } from '../types';

const initialState = {
  subjects: [],
  error: null,
};

const subjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };
      case ADD_SUBJECTS:
        return {
          ...state,
          subjects: [...state.subjects, action.payload], 
        };
        case UPDATE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.map(subject =>
          subject.subjectId === action.payload.subjectId ? action.payload : subject
        ),
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter(subject => subject.subjectId !== action.payload),
      };
    default:
      return state;
  }
};

export default subjectsReducer;
