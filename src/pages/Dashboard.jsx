
import Dashboardview from "../components/Dashboardview"
import Sidebar from "../components/Sidebar"
import Main from "../components/Main"


const Dashboard = () => {
  return (
    <div className="flex">
        <div className="basis-[15%] h-[100vh]  border">
            <Sidebar/>
        </div>
        <div className="basis-[85%] border">
            <Dashboardview/>
            <div>
                
                    <Main/>
                
            </div>
        </div>

    </div>
  )
}

export default Dashboard