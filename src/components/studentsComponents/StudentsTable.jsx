import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../../redux/action/studentsActions';
import { getClasses } from '../../redux/action/classesActions';
import baseUrl from "../../api/api";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.allStudents);
  const { classes } = useSelector((state) => state.allClasses);

  
  const studentStatuses = [
    { value: 'Ongoing', label: 'مستمر', statusId: 'STATUS_ONGOING_ID' },
    { value: 'Transferred', label: 'منقول', statusId: 'STATUS_TRANSFERRED_ID' },
    { value: 'Expelled', label: 'مفصول', statusId: 'STATUS_EXPELLED_ID' },
    { value: 'Interrupted', label: 'منقطع', statusId: 'STATUS_INTERRUPTED_ID' }
  ];

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

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getClasses()); 
  }, [dispatch]);

  
  const openModal = (student = { studentId: null, name: '', classId: '', studentStatus: '', statusId: '', gradeLevelName: '' }) => {
    setCurrentStudent({
      ...student,
      statusId: student.statusId || '',
      studentStatus: studentStatuses.find(status => status.statusId === student.statusId)?.value || ''
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
    setIsEditing(false);
  };

  const handleSave = async () => {
    const studentData = {
      name: currentStudent.name,
      classId: currentStudent.classId,
      statusId: currentStudent.statusId,
    };

    try {
      if (isEditing) {
        await baseUrl.put(`/api/students/${currentStudent.studentId}`, studentData);
        dispatch(updateStudent({ ...studentData, studentId: currentStudent.studentId }));
      } else {
        await baseUrl.post(`/api/students`, studentData);
        dispatch(addStudent(studentData));
      }
      dispatch(getStudents());
      closeModal();
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ الطالب:", error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      try {
        await baseUrl.delete(`/api/students/${studentId}`);
        dispatch(deleteStudent(studentId));
        dispatch(getStudents());
      } catch (error) {
        console.error("حدث خطأ أثناء حذف الطالب:", error.response ? error.response.data : error.message);
      }
    }
  };

  const TABLE_HEAD = ["الاسم", "الشعبة", "حالة الطالب", "المستوى الدراسي", "الإجراءات"];

  return (
    <div className="mx-[25px] mt-[25px] w-[200%]">
      <div className="flex justify-between items-center p-4 font-almarai">
        <h2 className="font-bold">قائمة الطلاب</h2>
        <button
          className="flex items-center gap-2 bg-[#4e73df]"
          onClick={() => openModal()}
        >
          <span>إضافة طالب جديد</span>
          <FaPlus className="h-5 w-3" />
        </button>
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
              value={currentStudent.studentStatus}
              onChange={(e) => {
                const selectedStatus = studentStatuses.find(status => status.value === e.target.value);
                setCurrentStudent({
                  ...currentStudent,
                  studentStatus: e.target.value,
                  statusId: selectedStatus ? selectedStatus.statusId : '',
                });
              }}
            >
              <option value="">اختر حالة الطالب</option>
              {studentStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label>المستوى الدراسي:</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md"
              value={currentStudent.gradeLevelName}
              disabled 
            />
          </div>

          <div className="flex justify-between mt-4">
            <button className="bg-[#4e73df] px-4 py-2 rounded text-white" onClick={handleSave}>
              {isEditing ? "حفظ التعديلات" : "إضافة طالب"}
            </button>
            <button onClick={closeModal} className="bg-red-500 px-4 py-2 rounded text-white">
              إلغاء
            </button>
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
                    <button
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
                    </button>
                    <button onClick={() => handleDelete(studentId)}>
                      <FaTrash className="h-5 w-5 text-red-600" />
                    </button>
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
