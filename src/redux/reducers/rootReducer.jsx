import { combineReducers } from "redux";
import classesReducer from './classesReducer';
import mainPageReducer from './mainPageReducer';
import teachersReducer from './teachersReducer';
import subjectsReducer from './subjectsReducer';
const rootReducer = combineReducers({
  allClasses: classesReducer,
  mainPage: mainPageReducer,
  allTeachers: teachersReducer,
  allSubjects: subjectsReducer,
});

export default rootReducer;
