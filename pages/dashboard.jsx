"use client";
import { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import CardsStat from "../components/dashboard/stats";
import axios from "axios";
import Cookies from "js-cookie";
import { IssueTable } from "../components/issue/issue-table";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import BooksTable from "../components/books/BooksTable";
import StudentsTable from "../components/students/students-table"
import TasksPerformance from "../sub-components/dashboard/TasksPerformance"
const Home = () => {
  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  const [books, setBooks] = useState();
  const [bookData, setBooksData] = useState([]);
  const [studentData, setStudentsData] = useState([]);
  const [students, setStudents] = useState();
  const [authors, setAuthors] = useState();
  const [category, setCategory] = useState();
  const [issued, setIssued]=useState()
  const [returned , setReturned]=useState()


  console.log(issued,books,returned);

  const getBooks = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/books",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setBooks(response.data.length);
    const firstThreeItems = response.data.slice(0, 3);
    setBooksData(firstThreeItems);
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

    setStudents(response.data.length);
    const firstThreeItems = response.data.slice(0, 3);
    setStudentsData(firstThreeItems);


  };
  const getAuthors = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/authors",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setAuthors(response.data.length);
  };
  const getCategory = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/category",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setCategory(response.data.length);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/issue`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const issuedCount = response.data.filter(item => item.status === 'Issued').length;
    const returnedCount = response.data.filter(item => item.status === 'Returned').length;
    setIssued(issuedCount);
    setReturned(returnedCount);

    const firstThreeItems = response.data.slice(0, 3);

    setData(firstThreeItems);
  };

  useEffect(() => {
    fetchData();
    getBooks();
    getStudents();
    getAuthors();
    getCategory();
  }, []);

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6 py-4">
        {" "}
        <Row>
          <Col lg={12} md={12} xs={12}>
          
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  text-white">Dashboard</h3>
                </div>
              </div>
            </div>
          </Col>
          <CardsStat
            book={books}
            student={students}
            author={authors}
            category={category}
          />
        </Row>
        <div className="d-flex justify-content-between  py-5 align-items-start">
          <h4>Latest Issue Transactions</h4>
          <Button variant="ghost">
            <Link href="/issue">View All</Link>
          </Button>
        </div>
        <Card>
          <Card.Body className="p-0">
            <IssueTable data={data} />
          </Card.Body>
        </Card>
        <Row className="my-6">
          <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
           
            <TasksPerformance book={books}  issued={issued} returned={returned} />
          </Col>
         
          <Col xl={8} lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between py-4 align-items-start">
              <h4>Latest Books </h4>
              <Button variant="ghost">
                <Link href="/books">View All</Link>
              </Button>
            </div>
            <Card >
              <Card.Body className="p-0">
                <BooksTable data={bookData} />
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-between  py-5 align-items-start">
              <h4>Latest Students </h4>
              <Button variant="ghost">
                <Link href="/students">View All</Link>
              </Button>
            </div>
            <Card >
              <Card.Body className="p-0">
                <StudentsTable data={studentData} />
              </Card.Body>
            </Card>
          
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Home;
