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
import Cookies from "js-cookie";

const AuthorsTable = ({ data }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [editData, setEditData] = useState();

  const handleUpdate = (category:any) => {
    setEditData(category);
    setShowModal(true);
  };

  const handleShowDelete = (categoryId) => {
    setShowDelete(true);
    setCategoryIdToDelete(categoryId);
  };

  const handleCloseDeleteModal = () => setShowDelete(false);

  const router = useRouter();

  const onDelete = async (id:string) => {
    const token = Cookies.get('token');

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/authors/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      router.refresh();
      toast.success("Author Deleted Successfully");
      handleCloseDeleteModal();
    } catch (error) {
      toast.error("Something went wrong");
      handleCloseDeleteModal();
    }
  };

  const CustomToggle = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ children, onClick }, ref) => (
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
    <div className="px-12 py-5  table-responsive">
      <Table className="text-nowrap table overflow-x-scroll align-middle" >
        <thead className="table-dark">
          <tr>
            <th scope="col" className="text-white text-uppercase">
              FullName
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
            data.map((item:any) => (
              <tr key={item.id}>
                <td>{item.firstName} {item.lastName}</td>
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

                    <Dropdown.Menu align="start">
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
              <td colSpan={3} className="text-center">
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
