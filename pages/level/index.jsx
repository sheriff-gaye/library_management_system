import { Button, Dropdown } from "react-bootstrap";
import { ChevronDown, File, Plus } from "lucide-react";
import { FilePdf } from "react-bootstrap-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { LevelModals } from "../../components/level/level-modal";
import LevelTable from "../../components/level/level-tabel";
import Cookies from "js-cookie";

const LevelPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = Cookies.get('token');


  const getLevel = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/level",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    );
    setData(response.data);
  };

  useEffect(() => {
    getLevel();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between py-7 px-12 align-items-start">
        <LevelModals
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
        <Button variant="dark" onClick={() => setShowModal(!showModal)}>
          Add Student Level 
        </Button>
       <Button variant="primary">
        Export PDF
       </Button>
      </div>
      <LevelTable data={data} />
    </div>
  );
};

export default LevelPage;
