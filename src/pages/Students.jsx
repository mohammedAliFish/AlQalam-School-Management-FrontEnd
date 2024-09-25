
import Sidebar from '../components/Sidebar'
//import StudentsTable from '../components/studentsComponents/StudentsTable'

import StudentsTable from './../components/studentsComponents/StudentsTable';
const Students = () => {
  return (
    <div className='flex font-almarai'>
       <div className="basis-[15%] h-[100vh]  border">
            <Sidebar/>
        </div>
       <div>
       <StudentsTable/>
       </div>
    </div>
  )
}

export default Students