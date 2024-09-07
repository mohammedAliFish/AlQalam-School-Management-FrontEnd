
import { GET_ALL_TEACHERS } from '../types/';

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
    default:
      return state;
  }
};

export default teachersReducer;
