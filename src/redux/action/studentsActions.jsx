import baseUrl from '../../api/api';
import { GET_ALL_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT ,GET_STATUESES } from '../types';

 const baseController = "/api/students";


export const getStudents = () => async (dispatch) => {
  const response = await baseUrl.get(baseController);
  console.log(response.data)
  dispatch({
    type: GET_ALL_STUDENTS,
    payload: response.data,
  });
};

export const getStudentsStatusList = () => async (dispatch) => {
  const response = await baseUrl.get(`${baseController}/getStudentStatusList`);
  console.log("tttttttttttt", response.data)
  dispatch({
    type: GET_STATUESES,
    payload: response.data,
  });
};

export const addStudent = (studentData) => async (dispatch) => {
  const response = await baseUrl.post(baseController, studentData);
  console.log(response.data)
  dispatch({
    type: ADD_STUDENT,
    payload: response.data,
  });
  
};


export const updateStudent = (studentData) => async (dispatch) => {
  const response = await baseUrl.put(`${baseController}/${studentData.studentId}`, studentData);
  dispatch({
    type: UPDATE_STUDENT,
    payload: response.data,
  });
};


export const deleteStudent = (studentId) => async (dispatch) => {
  await baseUrl.delete(`${baseController}/${studentId}`);
  dispatch({
    type: DELETE_STUDENT,
    payload: studentId,
  });
};
