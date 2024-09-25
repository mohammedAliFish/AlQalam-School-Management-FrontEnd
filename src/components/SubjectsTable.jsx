import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../redux/action/subjectsActions";
import { Card, Typography, Button } from "@material-tailwind/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import baseUrl from "../api/api";
Modal.setAppElement("#root");

const SubjectsTable = () => {
  const dispatch = useDispatch();

  const { subjects } = useSelector((state) => state.allSubjects);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({
    subjectId: null,
    name: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const openModal = (subject = { subjectId: null, name: "" }) => {
    setCurrentSubject(subject);
    setIsEditing(!!subject.subjectId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSubject({ subjectId: null, name: "" });
    setIsEditing(false);
  };

  const handleSave = () => {
    if (isEditing) {
      dispatch(updateSubject(currentSubject)).then(() => {
        dispatch(getSubjects());
        console.log(currentSubject);
      });
    } else {
      dispatch(addSubject(currentSubject)).then(() => {
        dispatch(getSubjects());
      });
    }
    closeModal();
  };

  const handleDelete = async (subjectId) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذه المادة؟");
    if (confirmed) {
      try {
        await baseUrl.delete(`/api/subjects/${subjectId}`);

        dispatch(deleteSubject(subjectId)).then(() => {
          dispatch(getSubjects());
        });
      } catch (error) {
        console.error("حدث خطأ أثناء حذف المادة:", error);
      }
    }
  };

  const TABLE_HEAD = ["اسم المادة", "الإجراءات"];

  return (
    <div className="mx-[25px] mt-[25px] w-[260%]">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-0">
          قائمة المواد الدراسية
        </h2>
        <Button
          className="flex items-center gap-2 bg-[#4e73df]"
          onClick={() => openModal()}
        >
          <span>إضافة مادة</span>
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
            {subjects.map(({ subjectId, name }, index) => {
              const isLast = index === subjects.length - 1;
              const rowClasses = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50 text-center";

              return (
                <tr key={subjectId}>
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
                      onClick={() => openModal({ subjectId, name })}
                      className="mr-2"
                    >
                      <FaEdit className="h-5 w-5 text-blue-600" />
                    </Button>
                    <Button onClick={() => handleDelete(subjectId)}>
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
        contentLabel={isEditing ? "تعديل المادة" : "إضافة مادة"}
        className="bg-white p-8 rounded-md shadow-lg w-1/2 mx-auto my-20 font-almarai"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "تعديل المادة" : "إضافة مادة"}
        </h2>
        <div>
          <label>اسم المادة:</label>
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            value={currentSubject.name}
            onChange={(e) =>
              setCurrentSubject({ ...currentSubject, name: e.target.value })
            }
          />
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
  );
};

export default SubjectsTable;
