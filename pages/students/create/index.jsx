import React, { useState, useEffect } from "react";
import AuthLayout from "layouts/AuthLayout";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateStudent = () => {
  const [studentData, setStudentData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    date_of_birth: "",
    email: "",
    student_no: "",
    phone: "",
    levelId: ""
  });

  const router = useRouter();

  console.log(studentData)

  const [levels, setLevel] = useState([]);

  const getLevel = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/levels"
    );
    setLevel(response.data);
  };

  useEffect(() => {
    getLevel();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/createstudents`,
        studentData
      );
      router.refresh();
      toast.success("Student Registered Successfully");
    } catch (error) {
      toast.error("Student with this email already exist");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const requiredFields = [
    studentData.firstname,
    studentData.lastname,
    studentData.gender,
    studentData.phone,
    studentData.email,
    studentData.levelId,
    studentData.student_no,
    studentData.date_of_birth
  ];

  const totalFields = requiredFields.length;
  const compltedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${compltedFields}/${totalFields})`;
  const isComplete =
    requiredFields.filter(
      (field) =>
        field !== "" && field !== "Select Gender" && field !== "Select Level"
    ).length === totalFields;

  return (
    <Row className="align-items-center  d-flex justify-content-center g-0 min-vh-100 ">
      <Col xxl={4} lg={6} md={14} xs={12} className="py-8 py-xl-0"  style={{ width: '40rem' }}>
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/"></Link>
              <h3 className="fs-10 fw-bold text-center text-uppercase">
                school library
              </h3>
              <p className="mb-6 text-center">
                Add your information to the library
              </p>
              <h5 className="text-center">
                Completed Fields {completionText}{" "}
              </h5>
            </div>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  value={setStudentData.firstname}
                  placeholder="First Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={setStudentData.lastname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter address here"
                  value={setStudentData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="date_of_birth" className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  onChange={handleChange}
                  value={setStudentData.date_of_birth?.split("T")[0]}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter address here"
                  onChange={handleChange}
                  value={setStudentData.phone}
                />
              </Form.Group>

              <Form.Group controlId="gender" className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={setStudentData.gender}
                  onChange={handleChange}
                >
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="student_no">
                <Form.Label>Student No</Form.Label>
                <Form.Control
                  type="text"
                  name="student_no"
                  placeholder="Enter student no "
                  onChange={handleChange}
                  value={setStudentData.student_no}
                />
              </Form.Group>

              <Form.Group controlId="levelId" className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  as="select"
                  name="levelId"
                  value={setStudentData.levelId}
                  onChange={handleChange}
                >
                  <option>Select Level</option>

                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.level_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <div className="d-grid">
                <Button variant="success" type="submit" disabled={!isComplete}>
                  Create Account
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

CreateStudent.Layout = AuthLayout;

export default CreateStudent;
