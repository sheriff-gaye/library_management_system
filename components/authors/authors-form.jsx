import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthorsForm = ({ editData }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: editData ? editData.firstName : "",
    lastName: editData ? editData.lastName : "",
  });

  const action = editData ? "Update" : "Save";
  const message = editData
    ? "Authors Updated Successfully"
    : "Authors Created Successfully";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_APP_URL}/authors/${editData.id}`,
          formData
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_APP_URL}/authors`,
          formData
        );
      }
      router.refresh();
      toast.success(message);

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isNameValid = formData.firstName.trim() !== "";

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter Firstname"
            autoFocus
          />
        </Form.Group>
         <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Lastname"
            autoFocus
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={!isNameValid} >
          {action}
        </Button>
      </Form>
    </>
  );
};

export default AuthorsForm;
