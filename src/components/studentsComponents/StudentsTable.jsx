import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { Button } from "@material-tailwind/react";
import { getStudents, addStudent, updateStudent, deleteStudent } from '../../redux/action/studentsActions';
import { getClasses } from '../../redux/action/classesActions';
import baseUrl from "../../api/api"; 
import MultipleImageInput from 'react-multiple-image-input';
const StudentsTable = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.allStudents);
  const { classes } = useSelector((state) => state.allClasses);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    studentId: null,
    name: '',
    classId: '',
    studentStatus: '',
    statusId: '',
    gradeLevelName: '', 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [allGradeLevels, setAllGradeLevels] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [studentStatuses, setStudentStatuses] = useState([]); 
  const [images, setImages] = useState({});
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getClasses());
  }, [dispatch]);

  useEffect(() => {
    if (classes && classes.length > 0) {
      const uniqueGradeLevels = Array.from(new Set(classes.map(cls => cls.gradeLevel?.levelName)))
        .filter(Boolean) 
        .map(levelName => {
          const gradeLevel = classes.find(cls => cls.gradeLevel?.levelName === levelName)?.gradeLevel;
          return gradeLevel;
        });

      setAllGradeLevels(uniqueGradeLevels);
    }
  }, [classes]);

  
  const fetchStudentStatuses = async () => {
    try {
      const response = await baseUrl.get('/api/students/getStudentStatusList'); 
      setStudentStatuses(response.data);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب حالات الطالب:', error);
    }
  };

  const openModal = (student = { studentId: null, name: '', classId: '', studentStatus: '', statusId: '', gradeLevelName: '' }) => {
    fetchStudentStatuses(); 
    setCurrentStudent({
      ...student,
      statusId: student.statusId || '',
      studentStatus: student.studentStatus || ''
    });
    setIsEditing(!!student.studentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStudent({
      studentId: null,
      name: '',
      classId: '',
      studentStatus: '',
      statusId: '',
      gradeLevelName: ''
    });
    setImages({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (isSaving) return;
  
   
    const studentData = {
      name: currentStudent.name,
      classId: currentStudent.classId,
      statusId: currentStudent.statusId,
      attachments: Object.values(images)  
    };
  
    console.log("البيانات المرسلة:", studentData);
  
    setIsSaving(true);
  
    try {
      if (isEditing) {
        await dispatch(updateStudent({ ...studentData, studentId: currentStudent.studentId }));
      } else {
        await dispatch(addStudent(studentData));
      }
  
      await dispatch(getStudents());
      closeModal();
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ الطالب:", error.response ? error.response.data : error.message);
    } finally {
      setIsSaving(false);
    }
  };
  

  const handleDelete = async (studentId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      try {
        await dispatch(deleteStudent(studentId));
      } catch (error) {
        console.error("حدث خطأ أثناء حذف الطالب:", error.response ? error.response.data : error.message);
      }
    }
  };

  const TABLE_HEAD = ["الاسم", "الشعبة", "حالة الطالب", "المستوى الدراسي", "الإجراءات"];

  return (
    <div className="mx-[25px] mt-[25px] w-[170%]">
      <div className="flex justify-between items-center p-4 font-almarai">
        <h2 className="font-bold">قائمة الطلاب</h2>
        <Button
          className="flex items-center gap-2 bg-[#4e73df]"
          onClick={() => openModal()}
        >
          <span>إضافة طالب جديد</span>
          <FaPlus className="h-5 w-3" />
        </Button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={isEditing ? "تعديل الطالب" : "إضافة طالب"}
          className="bg-white p-8 rounded-md shadow-lg w-1/2 mx-auto my-20 font-almarai"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "تعديل الطالب" : "إضافة طالب"}
          </h2>
          <div>
            <label>اسم الطالب:</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md"
              value={currentStudent.name}
              onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <label>الشعبة:</label>
            <select
              className="border p-2 pr-9 w-full rounded-md"
              value={currentStudent.classId}
              onChange={(e) => {
                const selectedClass = classes.find(c => c.classId === e.target.value);
                setCurrentStudent({
                  ...currentStudent,
                  classId: e.target.value,
                  gradeLevelName: selectedClass ? selectedClass.gradeLevel.levelName : '',
                });
              }}
            >
              <option value="">اختر الشعبة</option>
              {classes.map(cls => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
  <label>حالة الطالب:</label>
  <select
    className="border p-2 pr-9 w-full rounded-md"
    value={currentStudent.statusId} 
    onChange={(e) => {
      const selectedStatus = studentStatuses.find(status => status.studentStatusId === e.target.value);
      setCurrentStudent({
        ...currentStudent,
        statusId: e.target.value,  
        studentStatus: selectedStatus ? selectedStatus.name : '',  
      });
    }}
  >
    <option value="">اختر حالة الطالب</option>
    {studentStatuses.map((status) => (
      <option key={status.studentStatusId} value={status.studentStatusId}>
        {status.name}
      </option>
    ))}
  </select>
</div>




          <div className="mt-4">
            <label>المستوى الدراسي:</label>
            <select
              className="border p-2 pr-9 w-full rounded-md"
              value={currentStudent.gradeLevelName}
              onChange={(e) => {
                setCurrentStudent({
                  ...currentStudent,
                  gradeLevelName: e.target.value,
                });
              }}
            >
              <option value="">اختر المستوى الدراسي</option>
              {allGradeLevels.map((level) => (
                <option key={level.gradeLevelId} value={level.levelName}>
                  {level.levelName}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mt-4">
            <label>رفع المرفقات:</label>
            <MultipleImageInput
              images={images}
              setImages={setImages}
              max={5} 
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button
              className="bg-[#4e73df] px-4 py-2 rounded text-white"
              onClick={handleSave}
              disabled={isSaving || !currentStudent.name || !currentStudent.classId || !currentStudent.statusId}
            >
              {isEditing ? "حفظ التعديلات" : "إضافة طالب"}
            </Button>
            <Button onClick={closeModal} className="bg-red-500 px-4 py-2 rounded text-white">
              إلغاء
            </Button>
          </div>
        </Modal>
      </div>
      <div className="h-full w-full bg-white shadow-md rounded p-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">
                  <span className="font-normal leading-none opacity-70">{head}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(({ studentId, name, className, gradeLevelName, studentStatus }, index) => {
              const isLast = index === students.length - 1;
              const rowClasses = isLast
                ? "p-4 text-center align-middle"
                : "p-4 border-b border-blue-gray-50 text-center align-middle";

              return (
                <tr key={studentId} className="align-middle">
                  <td className={rowClasses}>{name}</td>
                  <td className={rowClasses}>{className || "غير متاح"}</td>
                  <td className={rowClasses}>{studentStatus || "غير متاح"}</td>
                  <td className={rowClasses}>{gradeLevelName || "غير متاح"}</td>
                  <td className={rowClasses}>
                    <Button
                      onClick={() => openModal({
                        studentId,
                        name,
                        classId: classes.find(cls => cls.name === className)?.classId || '',
                        studentStatus,
                        gradeLevelName,
                      })}
                      className="mr-2"
                    >
                      <FaEdit className="h-5 w-5 text-blue-600" />
                    </Button>
                    <Button onClick={() => handleDelete(studentId)}>
                      <FaTrash className="h-5 w-5 text-red-600" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
