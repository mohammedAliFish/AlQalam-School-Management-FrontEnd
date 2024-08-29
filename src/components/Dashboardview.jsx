import { FaSearch } from "react-icons/fa"


const Dashboardview = () => {
  return (
    <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px]">
        <div className=" flex items-center rounded-[5px]">
            <input type="text" className='bg-[#f8f9fc] font-almarai h-[40px] outline-none border-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[17px] leading-[20px] font-normal' placeholder="ابحث ..."/>
            <div className=" bg-[#4e73df] h-[40px] px-[16px] flex items-center justify-center cursor-pointer rounded-tl-[5px] rounded-bl-[5px]">
                <FaSearch color="white"/>
            </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default Dashboardview