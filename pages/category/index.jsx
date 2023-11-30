/* eslint-disable react-hooks/rules-of-hooks */
import CategoryTable from "components/category/CategoryTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { CategoryModals } from "../../components/category/category-modal";
import { useCookies } from "react-cookie"; // Import the cookies library if you're using it
import { Plus } from "lucide-react";
import Cookies from "js-cookie";


const category = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  
  const getCategoris = async () => {
    const token = Cookies.get('token');


    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/category", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    setData(response.data);
  };
  console.log(data);

  useEffect(() => {
    getCategoris();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between py-7 px-12 align-items-start">
        <CategoryModals
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
        <Button variant="dark" onClick={() => setShowModal(!showModal)}>
          Add Category <Plus />
        </Button>
        <Button variant="primary">
        Export PDF
       </Button>
      </div>
      <CategoryTable data={data} />
    </div>
  );
};

export default category;
