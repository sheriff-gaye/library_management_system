import { Button, Dropdown } from "react-bootstrap";
import AuthorsTable from "../../components/authors/authors-table";
import { ChevronDown, File, Plus } from "lucide-react";
import { FilePdf } from "react-bootstrap-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { AuthorsModal } from "../../components/authors/author-modal";
import Cookies from "js-cookie";

const AuthorsPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getAuthors = async () => {
    const token = Cookies.get('token');

    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/authors",{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    setData(response.data);
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between p-5 align-items-start">
        <AuthorsModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
        <Button variant="dark" onClick={() => setShowModal(!showModal)}>
          Add Author <Plus />
        </Button>
        <Button variant="danger">
        Export PDF
       </Button>
      </div>
      <AuthorsTable data={data} />
    </div>
  );
};

export default AuthorsPage;
