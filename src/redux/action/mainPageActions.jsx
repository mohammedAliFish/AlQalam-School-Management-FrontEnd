
import { GET_MAIN_PAGE_DATA } from '../types';
import baseUrl from '../../api/api';

export const getMainPageData = () => async (dispatch) => {
  try {
    const res = await baseUrl.get('/api/MainPage');
    console.log(res.data)
    dispatch({
      type: GET_MAIN_PAGE_DATA,
      payload: res.data, 
    });
  } catch (error) {
    console.error("Error fetching main page data", error);
    
  }
};
