import { GET_ALL_GRADES, ADD_GRADE, UPDATE_GRADE, DELETE_GRADE } from '../types';
import baseUrl from '../../api/api';


export const getGrades = () => async (dispatch) => {
  try {
    const response = await baseUrl.get('/api/grades');
    console.log('the grades action get grades', response.data);
    dispatch({
      type: GET_ALL_GRADES,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching grades:', error);
  }
};


export const addGrade = (newGrade) => async (dispatch) => {
  try {
    const response = await baseUrl.post('/api/grades', newGrade);
    console.log('post action', response.data);
    dispatch({
      type: ADD_GRADE,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding grade:', error);
  }
};


export const updateGrade = (gradeId, updatedGrade) => async (dispatch) => {
  try {
    const response = await baseUrl.put(`/api/grades/${gradeId}`, updatedGrade);
    console.log('Grade updated:', response.data);

    dispatch({
      type: UPDATE_GRADE,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error updating grade:', error.response ? error.response.data : error.message);
  }
};


export const deleteGrade = (gradeId) => (dispatch) => {
  try {
    baseUrl.delete(`/api/grades/${gradeId}`);
    console.log('Grade deleted:', gradeId);
    dispatch({
      type: DELETE_GRADE,
      payload: gradeId,
    });
  } catch (error) {
    console.error('Error deleting grade:', error);
  }
};
