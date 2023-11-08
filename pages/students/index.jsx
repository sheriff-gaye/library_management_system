import { Button } from "react-bootstrap";
import {  Copy } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import StudentsTable from "../../components/students/students-table";
import toast from "react-hot-toast";

const StudentsPage = () => {
  const [data, setData] = useState([]);

  const getStudents = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/students"
    );
    setData(response.data);
  };

  useEffect(() => {
    getStudents();
  }, []);


  const onCopy = () => {
    navigator.clipboard.writeText("http://localhost:3000/students/create");
    toast.success('Create Student Link Copied');
  }

  return (
    <div>
      <div className="d-flex justify-content-between  py-7 px-12 align-items-start">
        <Button variant="dark" onClick={onCopy} >
          copy link <Copy />
        </Button>
        <Button variant="danger">
        Export PDF
       </Button>
      </div>
      <StudentsTable data={data} />
    </div>
  );
};

export default StudentsPage;
