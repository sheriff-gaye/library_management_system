import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const CreateForm = ({ editData }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: editData ? editData.name : ""
  });

  const action = editData ? "Update" : "Save";
  const message = editData
    ? "Category Updated Successfully"
    : "Category Created Successfully";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');

      if (editData) {
        
        await axios.patch(
          `${process.env.NEXT_PUBLIC_APP_URL}/category/${editData.id}`,
          formData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_APP_URL}/category`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
      }
      router.refresh();
      toast.success(message);

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setFormData({ name: e.target.value });
  };

  const isNameValid = formData.name.trim() !== "";

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Category"
            autoFocus
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={!isNameValid}>
          {action}
        </Button>
      </Form>
    </>
  );
};

export default CreateForm;
