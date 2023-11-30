import { Trash2, Pencil, DatabaseBackup, MoreVertical } from "lucide-react";
import { Dropdown, Table } from "react-bootstrap";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DeleteModals } from "../modals/confirm-delete";
import toast from "react-hot-toast";
import { ReturnModals } from "./return-modal";
import { CreateIssueModal } from "./create-modal";
import { calculateDateDifference } from "../../helpers/return-days";
import { useRouter } from "next/router";

export const IssueTable = ({ data }) => {
  const router = useRouter();
  const isIssueRoute = router.pathname === "/issue";

  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [onEdit, setOnEdit] = useState([]);

  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [issueIdToReturn, setIssueIdToReturn] = useState(null);

  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  const token = Cookies.get("token");

  const handleShowDelete = (categoryId: any) => {
    setShowDelete(true);
    setCategoryIdToDelete(categoryId);
  };

  const handleCloseDeleteModal = () => setShowDelete(false);

  const handleCloseReturn = () => setShowReturn(false);

  const CustomToggle = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<typeof Link>
  >(({ children, onClick }, ref) => (
    <Link
      href=""
      ref={ref as any}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick(e as any);
        }
      }}
      className="text-muted text-primary-hover"
    >
      {children}
    </Link>
  ));
  CustomToggle.displayName = "CustomToggle";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, studentsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/books`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/students`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]);

        setBooks(booksResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const onReturnBook = async (returnData: any) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_APP_URL}/return/${returnData.id}`,
        returnData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      router.reload();
      toast.success("Book returned successfully");
      setShowReturn(false);
    } catch (error) {
      toast.error("Something went wrong");
      setShowReturn(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/issue/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.reload();
      toast.success("Category Deleted Successfully");
      handleCloseDeleteModal();
    } catch (error) {
      toast.error("Something went wrong");
      handleCloseDeleteModal();
    }
  };

  const handleUpdate = (issueData: any) => {
    setOnEdit(issueData);
    setShowModal(true);
  };

  const handleReturn = (item: any) => {
    setIssueIdToReturn(item);
    setShowReturn(true);
  };

  return (
    <>
      <div className="py-8">
        <Table className="text-nowrap table overflow-x-scroll align-middle">
          <thead className="table-dark justify-content-around">
            <tr>
              <th scope="col" className="text-white text-uppercase">
                Student
              </th>
              <th scope="col" className="text-white text-uppercase">
                Book Title
              </th>
              <th scope="col" className="text-white text-uppercase">
                Status
              </th>
              <th scope="col" className="text-white text-uppercase">
                Days Left
              </th>
              <th scope="col" className="text-white text-uppercase">
                Issue Date
              </th>
              <th scope="col" className="text-white text-uppercase">
                Return Date
              </th>
              {isIssueRoute && (
                <th
                  scope="col"
                  className="text-white text-uppercase justify-content-end"
                >
                  action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                <td className="align-middle">
                  {students.find((student) => student.id === item.studentId)
                    ?.firstname +
                    " " +
                    students.find((student) => student.id === item.studentId)
                      ?.lastname}
                </td>
                <td className="align-middle">
                  {books.find((book) => book.id === item.bookId)?.title}
                </td>
                <td className="align-middle w-full">
                  {item.status === "Issued" ? (
                    <span className="badge bg-primary w-full d-block">
                      {item.status}
                    </span>
                  ) : (
                    <span className="badge bg-success w-full d-block">
                      {item.status}
                    </span>
                  )}
                </td>

                <td className="align-middle">
                  {calculateDateDifference(item.returnDate, item.issueDate)}
                </td>

                <td>{item.issueDate}</td>
                <td className="align-middle">{item.returnDate}</td>
                {isIssueRoute && (
                  <td className="align-middle position-relative">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="dropdown-basic"
                        as={CustomToggle}
                      >
                        <MoreVertical className="text-muted" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="dropdown-menu-end"
                        align="start"
                      >
                        <Dropdown.Item onClick={() => handleUpdate(item)}>
                          <Pencil size={15} className="text-success" /> ReIssue
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => handleShowDelete(item.id)}
                        >
                          <Trash2 size={15} className="text-danger" /> Revoke
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => handleReturn(item)}
                          disabled={item.status == "Returned"}
                        >
                          <DatabaseBackup size={15} className="text-warning" />{" "}
                          Return Book
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <DeleteModals
          showModal={showDelete}
          close={handleCloseDeleteModal}
          onConfirm={() => onDelete(categoryIdToDelete)}
        />

        <ReturnModals
          showModal={showReturn}
          close={handleCloseReturn}
          onConfirm={() => onReturnBook(issueIdToReturn)}
        />

        <CreateIssueModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          returnData={onEdit}
        />
      </div>
    </>
  );
};
