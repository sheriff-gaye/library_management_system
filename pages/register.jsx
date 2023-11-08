import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Link from "next/link";
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import the router

const SignUp = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmpassword: "", // Add a confirmPassword field
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (userData.password !== userData.confirmpassword) {
      toast.error("The confirm-password field does not match the password field.");
      return;
    }

    try {
      // Remove "confirmPassword" from the data sent to the database
      const { confirmpassword, ...dataToSend } = userData;

       await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/register`,
        dataToSend
      );

      toast.success("User registered successfully");
      router.push("/");
    } catch (error) {
      
      toast.error("Something went wrong");
    }
  };

  const requiredFields = [userData.fullName, userData.email, userData.password, userData.confirmpassword];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.filter((field) => field !== "").length === totalFields;


  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
      
        <Card className="smooth-shadow-md">
         
          <Card.Body className="p-6">
            <div className="mb-4">
             <h3 className="text-center text-primary text-uppercase fw-bold">register</h3>
              <p className="mb-6  text-center">Please enter your user information.</p>
              <h3 className="text-center fw-bold">Completd Fields {completionText}</h3>
            </div>
           
            <Form onSubmit={onSubmit}>
           
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="User Name"
                  onChange={handleChange}
                  value={userData.fullName}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  placeholder="Enter address here"
                  onChange={handleChange}
                />
              </Form.Group>

           
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={useState.password}
                  name="password"
                  placeholder="**************"
                  onChange={handleChange}
                />
              </Form.Group>

             
              <Form.Group className="mb-3" controlId="confirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmpassword"
                  placeholder="**************"
                  onChange={handleChange}
                />
              </Form.Group>
              <div>
              
                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={!isComplete}>
                    Create Free Account
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/" className="fs-5">
                      Already member? Login{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/forget-password"
                      className="text-inherit fs-5"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
