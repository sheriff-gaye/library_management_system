import { MoreHorizontal, MoreVertical, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import formatDate from "../../helpers/format.date";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteModals } from "../modals/confirm-delete";
import { useRouter } from "next/navigation";
import { AuthorsModal } from "./author-modal";
import Link from "next/link";

const AuthorsTable = ({ data }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [editData, setEditData] = useState();

  const handleUpdate = (category) => {
    setEditData(category);
    setShowModal(true);
  };

  const handleShowDelete = (categoryId) => {
    setShowDelete(true);
    setCategoryIdToDelete(categoryId);
  };

  const handleCloseDeleteModal = () => setShowDelete(false);

  const router = useRouter();

  const onDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/authors/${id}`);
      router.refresh();
      toast.success("Author Deleted Successfully");
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
    <div className="table-responsive d-flex justify-content-between p-7">
      <Table className="text-nowrap table overflow-x-scroll align-middle" >
        <thead className="table-dark">
          <tr>
            <th scope="col" className="text-white text-uppercase">
              FirstName
            </th>
            <th scope="col" className="text-white text-uppercase">
              LastName
            </th>
            <th scope="col" className="text-white text-uppercase">
              created at
            </th>
            <th scope="col" className="text-white text-uppercase">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-basic"
                     as={CustomToggle}
                    >
                      <MoreVertical className="text-muted" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="right">
                      <Dropdown.Item onClick={() => handleUpdate(item)}>
                        <Pencil size={15} className="text-primary" /> Update
                      </Dropdown.Item>
                      <Dropdown.Item  onClick={() => handleShowDelete(item.id)}>
                        <Trash2 size={15} className="text-danger" /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
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

      <AuthorsModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        editData={editData}
      />

    </div>
  );
};

export default AuthorsTable;
