import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const BookForm = ({ editData }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState([]);

  const [formData, setFormData] = useState({
    title: editData ? editData.title : "",
    description: editData ? editData.description : "",
    categoryId: editData ? editData.categoryId : "",
    authorId: editData ? editData.authorId : "",
    publisher: editData ? editData.publisher : "",
    publish_date: editData ? editData.publish_date : "",
    copies: editData ? editData.copies : ""
  });
  const token = Cookies.get('token');

  const getCategoris = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/category",{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    setData(response.data);
  };

  const getAuthor = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_APP_URL + "/authors",{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    setAuthor(response.data);
  };

  const action = editData ? "Update" : "Save";
  const message = editData
    ? "Book Updated Successfully"
    : "Book Created Successfully";

  useEffect(() => {
    getCategoris();
    getAuthor();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    try {
      if (editData) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_APP_URL}/books/${editData.id}`,
          formData,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/books`, formData,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      router.refresh();
      toast.success(message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const requiredFields = [
    formData.title,
    formData.description,
    formData.authorId,
    formData.categoryId,
    formData.copies,
    formData.publish_date,
    formData.publisher
  ];

  const totalFields = requiredFields.length;
  const compltedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${compltedFields}/${totalFields})`;
  const isComplete =
    requiredFields.filter(
      (field) =>
        field !== "" && field !== "select category" && field !== "select author"
    ).length === totalFields;
  

  return (
    <>
    <h3 className="d-flex justify-content-center">Completed Fields {completionText}</h3>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="title" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Title"
          autoFocus
        />
      </Form.Group>

      <Form.Group controlId="description" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Description"
        />
      </Form.Group>

      <Form.Group controlId="categoryId" className="mb-3">
        <Form.Label>Book Category</Form.Label>
        <Form.Control
          as="select"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="authorId" className="mb-3">
        <Form.Label>Authors</Form.Label>
        <Form.Control
          as="select"
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
        >
          <option value="">Select Author</option>
          {author.map((item) => (
            <option key={item.id} value={item.id}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="publisher" className="mb-3">
        <Form.Label>Publisher</Form.Label>
        <Form.Control
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="Enter Publisher"
        />
      </Form.Group>

      <Form.Group controlId="publish_date" className="mb-3">
        <Form.Label>Published Date</Form.Label>
        <Form.Control
          type="date"
          name="publish_date"
          value={formData.publish_date.split("T")[0]}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="copies" className="mb-3">
        <Form.Label>Number of Copies</Form.Label>
        <Form.Control
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
          placeholder="Enter Number of Copies"
        />
      </Form.Group>
      <div className="d-grid">
      <Button variant="primary" type="submit" disabled={!isComplete}>
        {action}
      </Button>
      </div>
    </Form>
    </>
  );
};

export default BookForm;
