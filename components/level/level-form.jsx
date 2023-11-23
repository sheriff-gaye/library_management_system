import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LevelForm = ({ editData }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    code: editData ? editData.code : "",
    name: editData ? editData.name : ""
  });

  const action = editData ? "Update" : "Save";
  const message = editData
    ? "Level Updated Successfully"
    : "Level Created Successfully";

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      if (editData) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_APP_URL}/level/${editData.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/level`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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

  const isNameValid = formData.name.trim() !== "";

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="code">
          <Form.Label>Level Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter Category"
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Level Code</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Level name"
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

export default LevelForm;
