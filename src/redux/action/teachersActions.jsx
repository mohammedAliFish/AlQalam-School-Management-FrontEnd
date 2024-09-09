

import baseUrl from "../../api/api";
import { GET_ALL_TEACHERS, ADD_TEACHERS, UPDATE_TEACHERS, DELETE_TEACHERS } from '../types';

export const getTeachers = () => async (dispatch) => {
  try {
    const response = await baseUrl.get('/api/teachers');
    console.log(response.data)
    dispatch({
      type: GET_ALL_TEACHERS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
};

export const addTeacher = (newTeacher) => async (dispatch) => {
  try {
    const response = await baseUrl.post('/api/teachers', newTeacher);
    dispatch({
      type: ADD_TEACHERS,
      payload: response.data, 
    });
  } catch (error) {
    console.error('Error adding teacher:', error);
  }
};


export const updateTeacher = (updatedTeacher) => async (dispatch) => {
  try {
    await baseUrl.put(`/api/teachers/${updatedTeacher.teacherId}`, updatedTeacher);
    dispatch({
      type: UPDATE_TEACHERS,
      payload: updatedTeacher,
    });
  } catch (error) {
    console.error('Error updating teacher:', error);
  }
};


export const deleteTeacher = (teacherId) => async (dispatch) => {
  try {
    await baseUrl.delete(`/api/teachers/${teacherId}`);
    dispatch({
      type: DELETE_TEACHERS,
      payload: teacherId,
    });
  } catch (error) {
    console.error('Error deleting teacher:', error);
  }
};