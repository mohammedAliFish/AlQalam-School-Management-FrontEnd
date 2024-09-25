import Sidebar from '../components/Sidebar'
import GradesTable from './../components/GradeTable';



const Classes = () => {

  return (
    <div className='flex font-almarai'>
       <div className="basis-[15%] h-[100vh]  border">
            <Sidebar/>
        </div>
       <div>
        <GradesTable/>
       </div>
    </div>
  )
}

export default Classes