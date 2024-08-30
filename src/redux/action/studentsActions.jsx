import baseUrl from '../../api/api';
import { FETCH_STUDENTS, ADD_STUDENT, DELETE_STUDENT } from '../reducers/types';

export const fetchStudents = () => async dispatch => {
    try {
        const response = await baseUrl.get('/api/students');
        dispatch({
            type: FETCH_STUDENTS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
};

export const addStudent = (student) => async dispatch => {
    try {
        const response = await baseUrl.post('/api/students', student);
        dispatch({
            type: ADD_STUDENT,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error adding student:', error);
    }
};

export const deleteStudent = (id) => async dispatch => {
    try {
        await baseUrl.delete(`/api/students/${id}`);
        dispatch({
            type: DELETE_STUDENT,
            payload: id,
        });
    } catch (error) {
        console.error('Error deleting student:', error);
    }
};
