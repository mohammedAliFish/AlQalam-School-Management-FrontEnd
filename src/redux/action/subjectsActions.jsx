
import baseUrl from "../../api/api";
import { GET_ALL_SUBJECTS , ADD_SUBJECTS ,DELETE_SUBJECT,UPDATE_SUBJECT } from '../types';

export const getSubjects = () => async (dispatch) => {
  try {
    const response = await baseUrl.get('/api/subjects');
    console.log(response.data)
    dispatch({
      type: GET_ALL_SUBJECTS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
  }
};

export const addSubject = (newSubject) => async (dispatch) => {
  try {
    const response = await baseUrl.post('/api/subjects', newSubject);
    console.log(response.data)
    dispatch({
      type: ADD_SUBJECTS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding subject:', error);
  }
};


export const updateSubject = (updatedSubject) => async (dispatch) => {
  try {
    const response = await baseUrl.put(`/api/subjects/${updatedSubject.subjectId}`, updatedSubject);
    dispatch({
      type: UPDATE_SUBJECT,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error updating subject:', error);
  }
};

export const deleteSubject = (subjectId) => async (dispatch) => {
  try {
    await baseUrl.delete(`/api/subjects/${subjectId}`);
    dispatch({
      type: DELETE_SUBJECT,
      payload: subjectId,
    });
  } catch (error) {
    console.error('Error deleting subject:', error);
  }
};