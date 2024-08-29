import { 
    FaTachometerAlt, 
    FaUsers, 
    FaBook, 
    FaUserGraduate, 
    FaChalkboardTeacher, 
    FaChartBar, 
    FaClipboardList 
  } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-[#4e73df] h-screen px-[25px]">
      <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#ededed]/[0.3]">
        <h1 className="font-almarai  text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
          لوحه المستخدم
        </h1>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
        <FaTachometerAlt color="white"/>
        <p className="font-almarai text-white font-bold">لوحه التحكم</p>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
      <FaUsers color="white" />
        <p className="font-almarai text-white font-bold"> اداره الشعب</p>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
      <FaBook color="white" />
        <p className="font-almarai text-white font-bold"> اداره المواد</p>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
      <FaUserGraduate color="white" />
        <p className="font-almarai text-white font-bold"> اداره الطلبه</p>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
      <FaChalkboardTeacher color="white" />
        <p className="font-almarai text-white font-bold"> اداره التدريسيين</p>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
      <FaChartBar color="white" />
        <p className="font-almarai text-white font-bold"> اداره الدرجات</p>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
      <FaClipboardList color="white" />
        <p className="font-almarai text-white font-bold"> التقارير</p>
      </div>
    </div>
  );
};

export default Sidebar;
