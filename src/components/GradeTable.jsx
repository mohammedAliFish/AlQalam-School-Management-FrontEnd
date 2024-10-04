import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGrades,
  addGrade,
  updateGrade,
  deleteGrade,
} from "../redux/action/gradesActions";
import { getStudents } from "../redux/action/studentsActions";
import { getSubjects } from "../redux/action/subjectsActions";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { Button } from "@material-tailwind/react";
import baseUrl from "../api/api";

const GradesTable = () => {
  const dispatch = useDispatch();
  const { grades } = useSelector((state) => state.allGrades);
  const { students } = useSelector((state) => state.allStudents);
  const { subjects } = useSelector((state) => state.allSubjects);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGrade, setCurrentGrade] = useState({
    gradeId: null,
    studentId: "",
    subjectId: "",
    gradeType: "",
    score: "",
    gradeLevel: "",
    academicYear: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [gradeTypes, setGradeTypes] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [academicYears, setAcademicYears] = useState([]); 

  useEffect(() => {
    dispatch(getGrades());
    dispatch(getStudents());
    dispatch(getSubjects());

    fetchGradeTypes();
    fetchGradeLevels();
    fetchAcademicYears(); 
  }, [dispatch]);

  const fetchGradeTypes = async () => {
    try {
      const response = await baseUrl.get("/api/grades/gradeTypes");
      setGradeTypes(response.data);
      console.log("grade typesssss", response.data);
    } catch (error) {
      console.error("Error fetching grade types:", error);
    }
  };

  const fetchGradeLevels = async () => {
    try {
      const response = await baseUrl.get("/api/gradeLevel");
      setGradeLevels(response.data);
      console.log("grade levelssss", response.data);
    } catch (error) {
      console.error("Error fetching grade levels:", error);
    }
  };

  const fetchAcademicYears = async () => {
    try {
      const response = await baseUrl.get("/api/AcademicYear");
      setAcademicYears(response.data);
      console.log("academic yearssss", response.data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
    }
  };

  const openModal = (
    grade = {
      gradeId: null,
      studentId: "",
      subjectId: "",
      gradeType: "",
      score: "",
      gradeLevel: "",
      academicYear: "",
    }
  ) => {
    setCurrentGrade(grade);
    setIsEditing(!!grade.gradeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGrade({
      gradeId: null,
      studentId: "",
      subjectId: "",
      gradeType: "",
      score: "",
      gradeLevel: "",
      academicYear: "",
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    const newGrade = {
      studentId: currentGrade.studentId,
      subjectId: currentGrade.subjectId,
      gradeType: currentGrade.gradeType,
      score: currentGrade.score,
      gradeLevelId: currentGrade.gradeLevel,
      academicYearId: currentGrade.academicYear,
    };
    if (isEditing) {
      dispatch(updateGrade(newGrade));
    } else {
      dispatch(addGrade(newGrade));
    }
    closeModal();
  };

  const handleDelete = (gradeId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الدرجة؟")) {
      dispatch(deleteGrade(gradeId));
    }
  };

  const TABLE_HEAD = [
    "اسم الطالب",
    "المادة",
    "نوع الدرجة",
    "الدرجة",
    "المستوى الدراسي",
    "العام الدراسي",
    "الإجراءات",
  ];

  return (
    <div className="mx-[25px] mt-[25px] w-[130%]">
      <div className="flex justify-between items-center p-4 font-almarai">
        <h2 className="font-bold">قائمة الدرجات</h2>
        <Button
          className="flex items-center gap-2 bg-[#4e73df]"
          onClick={() => openModal()}
        >
          <span>إضافة درجة جديدة</span>
          <FaPlus className="h-5 w-3" />
        </Button>
      </div>
      <div className="h-full w-full bg-white shadow-md rounded p-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                >
                  <span className="font-normal leading-none opacity-70">
                    {head}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.gradeId} className="align-middle">
                <td className="border-b p-4 text-center">
                  {students.find((s) => s.studentId === grade.studentId)
                    ?.name || "غير متوفر"}
                </td>
                <td className="border-b p-4 text-center">
                  {subjects.find((subj) => subj.subjectId === grade.subjectId)
                    ?.name || "غير متوفر"}
                </td>
                <td className="border-b p-4 text-center">{grade.gradeType}</td>
                <td className="border-b p-4 text-center">{grade.score}</td>
                <td className="border-b p-4 text-center">
                  {gradeLevels.find((level) => level.id === grade.gradeLevel)?.name || "غير متوفر"}
                </td>
                <td className="border-b p-4 text-center">
  {academicYears.find((year) => year.academicYear === grade.academicYear)?.year 
    ? new Date(academicYears.find((year) => year.academicYear === grade.academicYear).year).getFullYear()
    : "غير متوفر"}
</td>



                <td className="border-b p-4 text-center">
                  <Button onClick={() => openModal(grade)} className="mr-2">
                    <FaEdit className="h-5 w-5 text-blue-600" />
                  </Button>
                  <Button onClick={() => handleDelete(grade.gradeId)}>
                    <FaTrash className="h-5 w-5 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={isEditing ? "تعديل الدرجة" : "إضافة درجة جديدة"}
          className="bg-white p-8 rounded-md shadow-lg w-1/2 mx-auto my-20 font-almarai"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "تعديل الدرجة" : "إضافة درجة جديدة"}
          </h2>

          <div>
            <label>اسم الطالب:</label>
            <select
              className="border p-2 pr-9 w-full rounded-md"
              value={currentGrade.studentId}
              onChange={(e) =>
                setCurrentGrade({ ...currentGrade, studentId: e.target.value })
              }
            >
              <option value="">اختر الطالب</option>
              {students.map((student) => (
                <option key={student.studentId} value={student.studentId}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label>المادة:</label>
            <select
              className="border p-2 pr-9 w-full rounded-md"
              value={currentGrade.subjectId}
              onChange={(e) =>
                setCurrentGrade({ ...currentGrade, subjectId: e.target.value })
              }
            >
              <option value="">اختر المادة</option>
              {subjects.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label>نوع الدرجة:</label>
            <select
              className="border p-2 pr-9 w-full rounded-md"
              value={currentGrade.gradeType}
              onChange={(e) =>
                setCurrentGrade({ ...currentGrade, gradeType: e.target.value })
              }
            >
              <option value="">اختر نوع الدرجة</option>
              {gradeTypes.map((type) => (
                <option key={type.id} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label>الدرجة:</label>
            <input
              type="number"
              min="0"
              max="100"
              className="border p-2 w-full rounded-md"
              value={currentGrade.score}
              onChange={(e) =>
                setCurrentGrade({
                  ...currentGrade,
                  score: Math.min(100, Math.max(0, e.target.value)),
                })
              }
            />
          </div>

          <div className="mt-4">
            <label>المستوى الدراسي:</label>
            <select
              className="border p-2 pr-9 w-full rounded-md"
              value={currentGrade.gradeLevel}
              onChange={(e) => setCurrentGrade({ ...currentGrade, gradeLevel: e.target.value })}
            >
              <option value="">اختر المستوى الدراسي</option>
              {gradeLevels.map((level) => (
                <option key={level.gradeLevelId} value={level.gradeLevelId}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label>العام الدراسي:</label>
            <select
              className="border p-2 pr-9 w-full rounded-md"
              value={currentGrade.academicYear}
              onChange={(e) =>
                setCurrentGrade({ ...currentGrade, academicYear: e.target.value })
              }
            >
              <option value="">اختر العام الدراسي</option>
              {academicYears.map((year) => (
                <option key={year.academicYearId} value={year.academicYearId}>
                  {year.year.split('T')[0]} 
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              onClick={handleSave}
              className="bg-[#4e73df] px-4 py-2 rounded text-white"
            >
              {isEditing ? "تحديث" : "إضافة"}
            </Button>
            <Button
              onClick={closeModal}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              إلغاء
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GradesTable;
