import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/login`,
        loginData
        
      );
     
      if (response.status === 200) {
        const { token } = response.data;
        const decoded = jwtDecode(token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Cookies.set('token', token, { expires: decoded.exp, sameSite: 'none', secure: true });


        toast.success("User Login successfully");
        router.push("/dashboard");
      } else {
        toast.error("Incorrect Username or Password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const requiredFields = [loginData.email, loginData.password];

  const totalFields = requiredFields.length;
  const compltedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${compltedFields}/${totalFields})`;
  const isComplete =
    requiredFields.filter((field) => field !== "").length === totalFields;

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <h3 className="text-center text-uppercase fw-bold text-primary">
                Login
              </h3>
              <p className="mb-6 text-center">
                Please enter your user information.
              </p>
            </div>

            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter address here"
                  onChange={handleChange}
                  value={loginData.email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="**************"
                  onChange={handleChange}
                  value={loginData.password}
                />
              </Form.Group>
              <div>
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isComplete}
                  >
                    Sign In
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/register" className="fs-5">
                      Create An Account{" "}
                    </Link>
                  </div>
                  <div>
                    <Link href="/forget-password" className="text-inherit fs-5">
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

SignIn.Layout = AuthLayout;

export default SignIn;
