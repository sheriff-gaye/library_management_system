import { Button, Dropdown } from "react-bootstrap";
import { ChevronDown, Plus } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import BooksTable from "../../components/books/BooksTable";
import { BooksModals } from "../../components/books/books-modal";
import Cookies from "js-cookie";

const BooksPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getBooks = async () => {
    const token = Cookies.get('token');

    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/books",{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    setData(response.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between  py-7 px-12 align-items-start">
        <BooksModals
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
        <Button variant="dark" onClick={() => setShowModal(!showModal)}>
          Add Book <Plus />
        </Button>
        <Button variant="danger">
        Export PDF
       </Button>
      </div>
      <BooksTable data={data} />
    </div>
  );
};

export default BooksPage;
