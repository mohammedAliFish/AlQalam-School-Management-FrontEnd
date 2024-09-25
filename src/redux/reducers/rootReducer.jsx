import { combineReducers } from "redux";
import classesReducer from './classesReducer';
import mainPageReducer from './mainPageReducer';
import teachersReducer from './teachersReducer';
import subjectsReducer from './subjectsReducer';
import gradesReducer from './gradeReducer';
import { studentReducer } from './studentsReducer';
const rootReducer = combineReducers({
  allClasses: classesReducer,
  mainPage: mainPageReducer,
  allTeachers: teachersReducer,
  allSubjects: subjectsReducer,
  allStudents: studentReducer,
  allGrades: gradesReducer,
});

export default rootReducer;
