import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainPageData } from "../../redux/action/mainPageActions";
import { FaEllipsisV } from "react-icons/fa";
import PieComponent from "./PieComponent";

const Main = () => {
  const dispatch = useDispatch();

  
  const { data } = useSelector((state) => state.mainPage);

  useEffect(() => {
    dispatch(getMainPageData());
    
  }, [dispatch]);

  const pieData = [
    { name: 'الاساتذه', value: data.numberOfTeachers },
    { name: 'الطلاب', value: data.numberOfStudents },
    { name: 'الصفوف', value: data.numberOfClasses },
  ];
  

  return (
    <div className="">
      
      <div className="grid grid-cols-4 gap-[30px] mx-[25px] mt-[25px] pd-[15px]">
        <div className="h-[100px] bg-[#01baef] rounded-[8px] border-1-[4px] border-[#4e73df] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="font-almarai text-[#eeeaf1] text-[14px] leading-[17px] font-bold ">
              عدد الأساتذة
            </h2>
            <h1 className="font-almarai text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {data.numberOfTeachers}
            </h1>
          </div>
        </div>

        <div className="h-[100px] bg-[#01baef] rounded-[8px] border-1-[4px] border-[#4e73df] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="font-almarai text-[#eeeaf1] text-[14px] leading-[17px] font-bold ">
              عدد الطلبة
            </h2>
            <h1 className="font-almarai text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {data.numberOfStudents}
            </h1>
          </div>
        </div>

        <div className="h-[100px] bg-[#01baef] rounded-[8px] border-1-[4px] border-[#4e73df] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="font-almarai text-[#eeeaf1] text-[14px] leading-[17px] font-bold ">
              عدد الصفوف
            </h2>
            <h1 className="font-almarai text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {data.numberOfClasses}
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[500px] mx-auto mt-6 border bg-white shadow-md cursor-pointer rounded-lg md:w-[40%] md:mx-[25px] md:mt-[25px]">
        <div className="bg-[#f8f9fc] flex items-center justify-between py-3 px-4 border-b border-[#ededed]">
          <h2 className="font-almarai text-lg">النسبة</h2>
          <FaEllipsisV color="gray" className="cursor-pointer" />
        </div>
        <div className="p-4 flex justify-center items-center">
          <PieComponent data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Main;
