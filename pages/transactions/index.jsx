import React, { useState, useEffect } from "react";
import { Button, Card, Dropdown, Form, Table } from "react-bootstrap";
import axios from "axios";

const IssuePage = () => {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [issueData, setIssueData] = useState({
    student: "",
    book: "",
    issue_date: "",
    return_date: ""
  });

  const [returnData, setReturnData] = useState({
    student: "",
    book: "",
    return_date: ""
  });

  const getStudents = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/students"
    );
    setData(response.data);
  };

  const getBooks = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/books"
    );
    setBooks(response.data);
  };

  useEffect(() => {
    getStudents();
    getBooks();
  }, []);

  const onSubmit = () => {
    console.log("hello");
  };
  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setIssueData({
      ...issueData,
      [name]: value
    });
  };

  const handleReturnChange = (e) => {
    const { name, value } = e.target;
    setIssueData({
      ...issueData,
      [name]: value
    });
  }

  return (
    <div className="container py-8 px-5">
      <div className="row  ">
        <div className="col-md-6">
          <Card>
            <Card.Img variant="top" src="/images/background/slider-img-1.jpg" />
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="student" className="mb-3">
                  <Form.Label>Student</Form.Label>
                  <Form.Control
                    as="select"
                    name="student"
                    value={issueData.student}
                    onChange={handleIssueChange}
                  >
                     <option value="">Select Student</option>
                    {data.map((student) => (
                      <option value={student.id} key={student.id}>
                        {student.firstname} {student.lastname}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="book" className="mb-3">
                  <Form.Label>Book</Form.Label>
                  <Form.Control
                    as="select"
                    name="book"
                    value={issueData.book}
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

                <Form.Group className="mb-3" controlId="return_date">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="return_date"
                    onChange={handleIssueChange}
                      value={issueData.issue_date}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="return_date">
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="return_date"
                    onChange={handleIssueChange}
                      value={issueData.rreturn_date}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                  >
                    Issue Book
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          <Card>
            <Card.Img variant="top" src="/images/background/2457.jpg" />
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="student" className="mb-3">
                  <Form.Label>Student</Form.Label>
                  <Form.Control
                    as="select"
                    name="student"
                    value={returnData.student}
                    onChange={handleReturnChange}
                  >
                    <option value="">Select Student</option>
                    {data.map((student) => (
                      <option value={student.id} key={student.id}>
                        {student.firstname} {student.lastname}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="book" className="mb-3">
                  <Form.Label>Book</Form.Label>
                  <Form.Control
                    as="select"
                    name="book"
                    value={returnData.book}
                    onChange={handleReturnChange}
                  >
                    <option value="">Select Book</option>
                    {books.map((book) => (
                      <option value={book.id} key={book.id}>
                        {book.title}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="return_date">
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="return_date"
                    onChange={handleReturnChange}
                      value={returnData.return_date}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="success"
                    type="submit"
                   
                  >
                    Return  Book
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
