import { Copy, Eye, MoreHorizontal, MoreVertical, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteModals } from "../modals/confirm-delete";
import { useRouter } from "next/navigation";
import { BooksModals } from "./books-modal";
import Link from "next/link";

const BooksTable = ({ data }) => {
  const [authors, setAuthors] = useState([]);
  const [category, setCategory] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [editData, setEditData] = useState();

  const handleUpdate = (categoryData) => {
    setEditData(categoryData);
    setShowModal(true);
  };

  const handleShowDelete = (categoryId) => {
    setShowDelete(true);
    setCategoryIdToDelete(categoryId);
  };

  const handleCloseDeleteModal = () => setShowDelete(false);

  const getAuthors = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/authors`
      );
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/category`
      );
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    getAuthors();
    getCategories();
  }, []);

  const router = useRouter();

  const onDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/books/${id}`);
      router.refresh();
      toast.success("Book Deleted Successfully");
      handleCloseDeleteModal();
    } catch (error) {
      toast.error("Something went wrong");
      handleCloseDeleteModal();
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    (<Link
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="text-muted text-primary-hover">
        {children}
    </Link>)
));

CustomToggle.displayName = 'CustomToggle';

  return (
    <div className="table-responsive d-flex justify-content-between  px-12 py-5">
      <Table className="text-nowrap table overflow-x-scroll align-middle">
        <thead className="table-dark justify-content-around">
          <tr>
            <th scope="col" className="text-white text-uppercase">
              category
            </th>
            <th scope="col" className="text-white text-uppercase">
              title
            </th>
            <th scope="col" className="text-white text-uppercase">
              author
            </th>
            <th scope="col" className="text-white text-uppercase">
              Copies
            </th>
            <th scope="col" className="text-white text-uppercase">
              publisher
            </th>
            <th
              scope="col"
              className="text-white text-uppercase justify-content-end"
            >
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td  className="align-middle">
                  {
                    category.find((category) => category.id === item.categoryId)
                      ?.name
                  }
                </td>
                <td className="align-middle">{item.title}</td>
                <td>
                  {
                   authors.find(author => author.id === item.authorId)?.firstName + " " + authors.find(author => author.id === item.authorId)?.lastName

                  }
                </td>

                <td className="align-middle"> {item.copies}</td>
                <td className="align-middle">{item.publisher}</td>
                <td className="align-middle">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-basic"
                      as={CustomToggle}
                     
                    >
                      <MoreVertical className="text-muted" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="right">
                      <Dropdown.Item
                        onClick={() => router.push(`books/${item.id}`)}
                      >
                        <Eye size={15} className="text-warning" /> View
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => handleUpdate(item)}>
                        <Pencil size={15} className="text-primary" /> Update
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShowDelete(item.id)}>
                        <Trash2 size={15} className="text-danger" /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                <div className="d-flex justify-content-center">
                  <span className="fs-4">No data available.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <DeleteModals
        showModal={showDelete}
        close={handleCloseDeleteModal}
        onConfirm={() => onDelete(categoryIdToDelete)}
      />

      <BooksModals
        showModal={showModal}
        onClose={() => setShowModal(false)}
        editData={editData}
      />
    </div>
  );
};

export default BooksTable;
