import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from '../../redux/action/teachersActions'; 
import Modal from 'react-modal';
import { Button, Card, Typography } from '@material-tailwind/react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

const TeachersTable = () => {
  const dispatch = useDispatch();
  

  const { teachers } = useSelector(state => state.allTeachers);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({ teacherId: null, name: "" });
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  
  const openModal = (teacher = { teacherId: null, name: "" }) => {
    setCurrentTeacher(teacher);
    setIsEditing(!!teacher.teacherId);
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTeacher({ teacherId: null, name: "" });
    setIsEditing(false);
  };

  
  const handleSave = () => {
    if (isEditing) {
      
      dispatch(updateTeacher(currentTeacher));
    } else {
      
      dispatch(addTeacher(currentTeacher));
    }
    closeModal(); 
  };

  
  const handleDelete = (teacherId) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا المعلم؟");
    if (confirmed) {
      dispatch(deleteTeacher(teacherId));
    }
  };

  const TABLE_HEAD = ["اسم التدريسي", "الإجراءات"];

  return (
    <div className="mx-[25px] mt-[25px] w-[200%]">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold">قائمة التدريسين</h2>
        <Button
          className="flex items-center gap-2 bg-[#4e73df]"
          onClick={() => openModal()}
        >
          <span>إضافة تدريسي</span>
          <FaPlus className="h-5 w-3" />
        </Button>
      </div>
      <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teachers.map(({ teacherId, name }, index) => {
              const isLast = index === teachers.length - 1;
              const rowClasses = isLast ? "p-4" : "p-4 border-b border-blue-gray-50 text-center";

              return (
                <tr key={teacherId}>
                  <td className={rowClasses}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={rowClasses}>
                    <Button
                      onClick={() => openModal({ teacherId, name })}
                      className="mr-2"
                    >
                      <FaEdit className="h-5 w-5 text-blue-600" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(teacherId)}
                      color="red"
                    >
                      <FaTrash className="h-5 w-5 text-red-600" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={isEditing ? "تعديل المعلم" : "إضافة تدريسي"}
        className="bg-white p-8 rounded-md shadow-lg w-1/2 mx-auto my-20 font-almarai"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">{isEditing ? "تعديل المعلم" : "إضافة تدريسي"}</h2>
        <div>
          <label>اسم تدريسي:</label>
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            value={currentTeacher.name}
            onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
          />
        </div>
        <div className="flex justify-between mt-4">
          <Button className="bg-[#4e73df]" onClick={handleSave}>
            {isEditing ? "حفظ التعديلات" : "إضافة"}
          </Button>
          <Button onClick={closeModal} className="mr-2 bg-red-600">إلغاء</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TeachersTable;
