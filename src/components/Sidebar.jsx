
import { Link } from 'react-router-dom'; 
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
        <h1 className="font-almarai text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
          لوحة المستخدم
        </h1>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
        <FaTachometerAlt color="white"/>
        <Link to="/" className="font-almarai text-white font-bold">لوحة التحكم</Link>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
        <FaUsers color="white" />
        <Link to="/classes" className="font-almarai text-white font-bold">الشعب</Link>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
        <FaBook color="white" />
        <Link to="/subjects" className="font-almarai text-white font-bold">المواد</Link>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
        <FaUserGraduate color="white" />
        <Link to="/students" className="font-almarai text-white font-bold">الطلاب</Link>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
        <FaChalkboardTeacher color="white" />
        <Link to="/teachers" className="font-almarai text-white font-bold">التدريسيين</Link>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
        <FaChartBar color="white" />
        <Link to="/grades" className="font-almarai text-white font-bold">الدرجات</Link>
      </div>
      <div className="flex cursor-pointer items-center gap-[15px] py-[20px] border-b-[1px] border-[#ededed]/[0.3]">
        <FaClipboardList color="white" />
        <Link to="/reports" className="font-almarai text-white font-bold">التقارير</Link>
      </div>
    </div>
  );
};

export default Sidebar;
