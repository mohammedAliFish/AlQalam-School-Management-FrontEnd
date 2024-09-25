import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGrades, addGrade, updateGrade, deleteGrade } from '../redux/action/gradesActions';
import { FaEdit, FaTrash } from 'react-icons/fa';

const GradesTable = () => {
  const dispatch = useDispatch();
  const { grades } = useSelector((state) => state.allGrades); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGrade, setCurrentGrade] = useState({
    gradeId: null,
    studentName: '',
    subjectName: '',
    gradeType: '',
    score: '',
    gradeLevel: '',
    academicYear: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getGrades());
  }, [dispatch]);

  const openModal = (grade = { gradeId: null, studentName: '', subjectName: '', gradeType: '', score: '', gradeLevel: '', academicYear: '' }) => {
    setCurrentGrade(grade);
    setIsEditing(!!grade.gradeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGrade({
      gradeId: null,
      studentName: '',
      subjectName: '',
      gradeType: '',
      score: '',
      gradeLevel: '',
      academicYear: '',
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    if (isEditing) {
      dispatch(updateGrade(currentGrade));
    } else {
      dispatch(addGrade(currentGrade));
    }
    closeModal();
  };

  const handleDelete = (gradeId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الدرجة؟')) {
      dispatch(deleteGrade(gradeId));
    }
  };

  return (
    <div className="container mx-auto p-4 w-[200%]">
      <div className='flex justify-between'>
        <h2 className="text-2xl mb-4 font-bold">قائمة الدرجات</h2>
        <button onClick={() => openModal()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          إضافة درجة جديدة
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded ">
        <thead>
          <tr>
            <th className="border-b p-4 text-center">اسم الطالب</th>
            <th className="border-b p-4 text-center">المادة</th>
            <th className="border-b p-4 text-center">نوع الدرجة</th>
            <th className="border-b p-4 text-center">الدرجة</th>
            <th className="border-b p-4 text-center">المستوى الدراسي</th>
            <th className="border-b p-4 text-center">العام الدراسي</th>
            <th className="border-b p-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.gradeId}>
              <td className="border-b p-4 text-center">{grade.studentName}</td>
              <td className="border-b p-4 text-center">{grade.subjectName}</td>
              <td className="border-b p-4 text-center">{grade.gradeType}</td>
              <td className="border-b p-4 text-center">{grade.score}</td>
              <td className="border-b p-4 text-center">{grade.gradeLevel || 'غير متوفر'}</td>
              <td className="border-b p-4 text-center">{grade.academicYear || 'غير متوفر'}</td>
              <td className="border-b p-4 text-center">
                <button onClick={() => openModal(grade)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(grade.gradeId)} className="bg-red-500 text-white px-2 py-1 rounded">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4">{isEditing ? 'تعديل الدرجة' : 'إضافة درجة جديدة'}</h2>
            <input
              type="text"
              placeholder="اسم الطالب"
              value={currentGrade.studentName}
              onChange={(e) => setCurrentGrade({ ...currentGrade, studentName: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="المادة"
              value={currentGrade.subjectName}
              onChange={(e) => setCurrentGrade({ ...currentGrade, subjectName: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="نوع الدرجة"
              value={currentGrade.gradeType}
              onChange={(e) => setCurrentGrade({ ...currentGrade, gradeType: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="الدرجة"
              value={currentGrade.score}
              onChange={(e) => setCurrentGrade({ ...currentGrade, score: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="المستوى الدراسي"
              value={currentGrade.gradeLevel}
              onChange={(e) => setCurrentGrade({ ...currentGrade, gradeLevel: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="العام الدراسي"
              value={currentGrade.academicYear}
              onChange={(e) => setCurrentGrade({ ...currentGrade, academicYear: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
              {isEditing ? 'تحديث' : 'إضافة'}
            </button>
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradesTable;
