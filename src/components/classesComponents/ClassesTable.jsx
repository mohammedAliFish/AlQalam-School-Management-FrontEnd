// src/components/ClassesTable.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { Card, Typography, Button } from "@material-tailwind/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../../redux/action/classesActions";

import baseUrl from "../../api/api";

const ClassesTable = () => {
  const dispatch = useDispatch();

  const { classes } = useSelector((state) => state.allClasses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState({
    classId: null,
    name: "",
    gradeLevelId: "",
    subjectId: "",
    teacherId: "",
    schoolId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [allSchools, setAllSchools] = useState([]);
  //const [subjectsTeachers, setSubjectsTeachers] = useState([]);

  /*   const addSubjectTeacher = (subjectId, teacherId) =>{
    subjectsTeachers.push({subjectId: subjectId, teacherId: teacherId})
  }

  const deleteSubjectTeacher = (rowIndex) => {

  } */

  useEffect(() => {
    dispatch(getClasses());

    fetchSchools();
  }, [dispatch]);

  console.log(classes);

  const fetchSchools = async () => {
    try {
      const response = await baseUrl.get("/api/schools");
      setAllSchools(response.data);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب المدارس:", error);
    }
  };

  const handleEdit = (classId) => {
    const cls = classes.find((c) => c.classId === classId);
    if (cls) {
      setCurrentClass(cls);
      setIsEditing(true);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentClass({
      classId: null,
      name: "",
      gradeLevelId: "",
      subjectId: "",
      teacherId: "",
      schoolId: "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const dataToSend = {
        name: currentClass.name,
        gradeLevelId: currentClass.gradeLevelId,
        subjects: currentClass.subjectId ? [currentClass.subjectId] : [],
        teachers: currentClass.teacherId ? [currentClass.teacherId] : [],
        schoolId: currentClass.schoolId,
      };

      console.log("البيانات المرسلة إلى الخادم:", dataToSend);

      if (isEditing) {
        await baseUrl.put(`/api/Classes/${currentClass.classId}`, dataToSend);
        dispatch(updateClass(dataToSend));
      } else {
        dispatch(addClass(dataToSend));
      }

      closeModal();
    } catch (error) {
      console.error("حدث خطأ أثناء الحفظ:", error);
    }
  };

  const handleDelete = async (classId) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذه الشعبة؟");
    if (confirmed) {
      try {
        await baseUrl.delete(`/api/Classes/${classId}`);
        dispatch(deleteClass(classId));
        console.log("تم حذف الشعبة بنجاح");
      } catch (error) {
        console.error("حدث خطأ أثناء حذف الشعبة:", error);
      }
    }
  };

  const TABLE_HEAD = ["الشعبة", "المرحلة الدراسية", "الإجراءات"];

  return (
    <div className="mx-[25px] mt-[25px] w-[200%]">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold">قائمة الشعب والمراحل الدراسية</h2>
        <Button
          className="flex items-center gap-2 bg-[#4e73df]"
          onClick={() => setIsModalOpen(true)}
        >
          <span>إضافة شعبة</span>
          <FaPlus className="h-5 w-3" />
        </Button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={isEditing ? "تعديل الشعبة" : "إضافة شعبة"}
          className="bg-white p-8 rounded-md shadow-lg w-1/2 mx-auto my-20 font-almarai"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "تعديل الشعبة" : "إضافة شعبة"}
          </h2>
          <div>
            <label>اسم الشعبة:</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md"
              value={currentClass.name}
              onChange={(e) =>
                setCurrentClass({ ...currentClass, name: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label>المدرسة:</label>
            <select
              className="border p-2 w-full rounded-md"
              value={currentClass.schoolId}
              onChange={(e) =>
                setCurrentClass({
                  ...currentClass,
                  schoolId: e.target.value,
                })
              }
            >
              <option value="">اختر المدرسة</option>
              {allSchools.map((school) => (
                <option key={school.schoolId} value={school.schoolId}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label>المرحلة الدراسية:</label>
            <select
              className="border p-2 w-full rounded-md"
              value={currentClass.gradeLevelId}
              onChange={(e) =>
                setCurrentClass({
                  ...currentClass,
                  gradeLevelId: e.target.value,
                })
              }
            >
              <option value="">اختر المرحلة الدراسية</option>
              {classes.map(
                (cls) =>
                  cls.gradeLevel && (
                    <option
                      key={cls.gradeLevel.gradeLevelId}
                      value={cls.gradeLevel.gradeLevelId}
                    >
                      {cls.gradeLevel.levelName}
                    </option>
                  )
              )}
            </select>
          </div>
          {/* subject teachers list */}
          <div className="flex justify-between">
            <div className="mt-4">
              <label>المادة:</label>
              <select
                className="border p-2 w-full rounded-md"
                value={currentClass.subjectId}
                onChange={(e) =>
                  setCurrentClass({
                    ...currentClass,
                    subjectId: e.target.value,
                  })
                }
              >
                <option value="">اختر المادة</option>
                {classes.map((subject) => (
                  <option key={subject.subjectId} value={subject.subjectId}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label>الأستاذ:</label>
              <select
                className="border p-2 w-full rounded-md"
                value={currentClass.teacherId}
                onChange={(e) =>
                  setCurrentClass({
                    ...currentClass,
                    teacherId: e.target.value,
                  })
                }
              >
                <option value="">اختر الأستاذ</option>
                {classes.map((teacher) => (
                  <option key={teacher.teacherId} value={teacher.teacherId}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
            <Button
          className=" bg-[#4e73df]"
          
        >
          
          <FaPlus className="h-5 w-3" />
        </Button>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button className="bg-[#4e73df]" onClick={handleSave}>
              {isEditing ? "حفظ التعديلات" : "إضافة"}
            </Button>
            <Button onClick={closeModal} className="mr-2 bg-red-600">
              إلغاء
            </Button>
          </div>
        </Modal>
      </div>
      <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
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
            {classes.map(({ classId, name, gradeLevel }, index) => {
              const isLast = index === classes.length - 1;
              const rowClasses = isLast
                ? "p-4 text-center align-middle"
                : "p-4 border-b border-blue-gray-50 text-center align-middle";

              return (
                <tr key={classId} className="align-middle">
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
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {gradeLevel?.levelName || "غير متاح"}
                    </Typography>
                  </td>

                  <td className={rowClasses}>
                    <Button
                      onClick={() => handleEdit(classId)}
                      className="mr-2"
                    >
                      <FaEdit className="h-5 w-5 text-blue-600" />
                    </Button>
                    <Button onClick={() => handleDelete(classId)} color="red">
                      <FaTrash className="h-5 w-5 text-red-600" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ClassesTable;
