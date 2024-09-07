// src/redux/actions/classesAction.jsx
import { GET_ALL_CLASSES , ADD_CLASS , DELETE_CLASS , UPDATE_CLASS } from '../types';
import baseUrl from '../../api/api';


export const getClasses = () => async (dispatch) => {
  
  try {
    const response = await baseUrl.get('/api/classes');
    console.log('the class action get classes',response.data)
    dispatch({
      type: GET_ALL_CLASSES,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    
  }
};

export const addClass = (newClass) => async (dispatch) => {
  try {
    const response = await baseUrl.post('/api/classes', newClass);
    dispatch({
      type: ADD_CLASS,
      payload: response.data, 
    });
  } catch (error) {
    console.error('Error adding class:', error);
  }
};


export const updateClass = (updatedClass) => ({
  type: UPDATE_CLASS,
  payload: updatedClass,
});


export const deleteClass = (classId) => ({
  type: DELETE_CLASS,
  payload: classId,
});