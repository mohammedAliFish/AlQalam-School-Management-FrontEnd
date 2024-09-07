


import Sidebar from '../components/Sidebar'
import ClassesTable from '../components/classesComponents/ClassesTable'
//import LinkSubjectsToTeacher from './../components/classesComponents/LinkSubjectsToTeacher';


const Classes = () => {
 /*  //const teachers = [{ id: '1', name: 'Mr. Smith' }, { id: '2', name: 'Ms. Johnson' }];
  const subjects = [{ id: '1', name: 'Mathematics' }, { id: '2', name: 'Science' }, { id: '3', name: 'English' }];
  const handleLink = (data) => {
    console.log('Linking data:', data);
    // Here, you could make an API call to update your database
  }; */
  return (
    <div className='flex font-almarai'>
       <div className="basis-[15%] h-[100vh]  border">
            <Sidebar/>
        </div>
       <div>
        <ClassesTable/>
       </div>
    </div>
  )
}

export default Classes