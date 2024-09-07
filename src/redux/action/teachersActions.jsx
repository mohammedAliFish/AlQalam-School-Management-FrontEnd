// src/redux/actions/teachersActions.js

import baseUrl from "../../api/api";
import { GET_ALL_TEACHERS } from '../types';

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
