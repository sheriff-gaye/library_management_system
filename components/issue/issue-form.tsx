import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const IssueForm = ({ editData }) => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  
  const [issueData, setIssueData] = useState({
    studentId: "",
    bookId: "",
    issueDate: new Date().toISOString().split("T")[0],
    returnDate: ""
  });

  const action = editData ? "Update Issue" : "Issue Book";

  useEffect(() => {

    if (editData) {      
      setIssueData({
        studentId: editData.studentId,
        bookId: editData.bookId,
        issueDate: editData.issueDate,
        returnDate: editData.returnDate
      });
    }
  }, [editData]);


  const onSubmit = async (e:any) => {
    e.preventDefault();
    try {
      if (editData) {
       
        await axios.patch(
          `${process.env.NEXT_PUBLIC_APP_URL}/issue/${editData.id}`,
          issueData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        router.refresh()
        toast.success("Issue updated successfully");
      } else {
       
        await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/issue`, issueData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        router.refresh();
        toast.success("Issue created successfully");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setIssueData({
      ...issueData,
      [name]: value
    });
  };

  useEffect(() => {
    const getBooks = async () => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_APP_URL + "/books",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setBooks(response.data);
    };
    const getStudents = async () => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_APP_URL + "/students",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setStudents(response.data);
    };
    getBooks();
    getStudents();
  }, [setBooks, setStudents,token]);

  const requiredFields = [
    issueData.bookId,
    issueData.returnDate,
    issueData.studentId
  ];

  const totalFields = requiredFields.length;

  const isComplete =
    requiredFields.filter(
      (field) =>
        field !== "" &&
        field !== "Select Book" &&
        field !== "Select Student" &&
        field && field).length === totalFields;

  return (
    <div>
     
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="studentId" className="mb-3">
            <Form.Label>Student</Form.Label>
            <Form.Control
              as="select"
              name="studentId"
              value={issueData.studentId}
              onChange={handleIssueChange}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option value={student.id} key={student.id}>
                  {student.firstname} {student.lastname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="bookId" className="mb-3">
            <Form.Label>Book</Form.Label>
            <Form.Control
              as="select"
              name="bookId"
              value={issueData.bookId}
              onChange={handleIssueChange}
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option value={book.id} key={book.id}>
                  {book.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="issueDate">
            <Form.Label>Issue Date</Form.Label>
            <Form.Control
              type="date"
              readOnly
              name="issueDate"
              onChange={handleIssueChange}
              value={issueData.issueDate}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="returnDate">
            <Form.Label>Return Date</Form.Label>
            <Form.Control
              type="date"
              name="returnDate"
              onChange={handleIssueChange}
              value={issueData.returnDate}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={!isComplete}>
              {action}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </div>
  );
};
