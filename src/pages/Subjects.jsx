import Sidebar from '../components/Sidebar'
import SubjectsTable from '../components/SubjectsTable'


const Classes = () => {
  return (
    <div className='flex font-almarai'>
       <div className="basis-[15%] h-[100vh]  border">
            <Sidebar/>
        </div>
       <div>
        <SubjectsTable/>
       </div>
    </div>
  )
}

export default Classes