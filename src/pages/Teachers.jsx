import Sidebar from '../components/Sidebar'
import TeachersTable from './../components/teachersComponents/TeachersTable';


const Classes = () => {
  return (
    <div className='flex font-almarai'>
       <div className="basis-[15%] h-[100vh]  border">
            <Sidebar/>
        </div>
       <div>
        <TeachersTable/>
       </div>
    </div>
  )
}

export default Classes