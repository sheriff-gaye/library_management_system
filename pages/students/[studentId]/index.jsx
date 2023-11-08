"use client";
import React, { useEffect, useState } from "react";
import { Card, Dropdown, Table } from "react-bootstrap";
import axios from "axios";
import { useParams } from "next/navigation";
import formatDate from "../../../helpers/format.date";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const SingleStudent = () => {
  const params = useParams();

  const [studentData, setStudentData] = useState([]);
  const [levels, setLevels] = useState([]);

  console.log(params.studentId)


  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/students/${params.studentId}`
      );
      setStudentData(response.data);
    } catch (error) {
      console.log("Error in getting book details");
    }
  };

  const getLevels = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/levels`
      );
      setLevels(response.data);
    } catch (error) {
      console.error("Error fetching levels");
    }
  };

 

  useEffect(() => {
    getLevels();
    fetchStudent();
  }, []);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-muted text-primary-hover"
    >
      {children}
    </Link>
  ));

  CustomToggle.displayName = "CustomToggle";

  return (
    <div className="container py-8 px-5">
      <div className="row  ">
        <div className="col-md-6">
          <Card>
            <Card.Img variant="top" src="/images/background/slider-img-1.jpg" />
            <Card.Body>
              <Card.Title className="text-center fs-10 text-primary text-uppercase fw-bold">
                {studentData.firstname} {studentData.lastname}
              </Card.Title>
              <Card.Text>
                <div className="d-grid grid-col-2">
                <p>
                    <span className="fw-bold">Email : </span>
                    {studentData.email}
                  </p>
                  <p>
                    <span className="fw-bold">Phone : </span>
                    {studentData.phone}
                  </p>
                  <p>
                    <span className="fw-bold">Gender : </span>
                    {studentData.gender}
                  </p>
                  <p>
                    <span className="fw-bold">Date of Birth : </span>
                    {studentData.date_of_birth}
                  </p>

                  <p>
                    <span className="fw-bold">Student No : </span>
                    {studentData.student_no}
                  </p>
                  <p>
                    <span className="fw-bold">Category: </span>{" "}
                    {
                      levels.find(
                        (level) => level.id === studentData.levelId
                      )?.level_name
                    }
                  </p>
                 
                  
                </div>
              </Card.Text>
              <Card.Text>
                <small className="text-muted">
                  Created at {formatDate(studentData.createdAt)}
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title>Data of Books with Student</Card.Title>
              <Table className="text-nowrap table overflow-x-scroll align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-white text-uppercase">
                      title
                    </th>
                    <th scope="col" className="text-white text-uppercase">
                      category
                    </th>
                    <th scope="col" className="text-white text-uppercase">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>games of trones</td>
                    <td>movie</td>
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
                          <Dropdown.Item>
                            <Pencil size={15} className="text-primary" /> Update
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Trash2 size={15} className="text-danger" /> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
