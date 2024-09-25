import baseUrl from '../../api/api';
import { GET_ALL_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from '../types';


export const getStudents = () => async (dispatch) => {
  const response = await baseUrl.get('/api/students');
  console.log(response.data)
  dispatch({
    type: GET_ALL_STUDENTS,
    payload: response.data,
  });
};


export const addStudent = (studentData) => async (dispatch) => {
  const response = await baseUrl.post('/api/students', studentData);
  console.log(response.data)
  dispatch({
    type: ADD_STUDENT,
    payload: response.data,
  });
};


export const updateStudent = (studentData) => async (dispatch) => {
  const response = await baseUrl.put(`/api/students/${studentData.studentId}`, studentData);
  dispatch({
    type: UPDATE_STUDENT,
    payload: response.data,
  });
};


export const deleteStudent = (studentId) => async (dispatch) => {
  await baseUrl.delete(`/api/students/${studentId}`);
  dispatch({
    type: DELETE_STUDENT,
    payload: studentId,
  });
};
