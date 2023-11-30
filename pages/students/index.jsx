import { Button } from "react-bootstrap";
import { Copy } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import StudentsTable from "../../components/students/students-table";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const StudentsPage = () => {
  const [data, setData] = useState([]);
  const token = Cookies.get("token");

  const getStudents = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/students",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setData(response.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const onCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_COPY_URL}/students/create`
    );
    toast.success("Create Student Link Copied");
  };

  return (
    <div>
      <div className="d-flex justify-content-between  py-7 px-12 align-items-start">
        <Button variant="dark" onClick={onCopy}>
          copy link <Copy />
        </Button>
        <Button variant="primary">Export PDF</Button>
      </div>
      <div className="px-12 py-5">
        <StudentsTable data={data} />
      </div>
    </div>
  );
};

export default StudentsPage;
