"use client";

import React, { useEffect, useState } from "react";
import { Card, Dropdown, Table } from "react-bootstrap";
import axios from "axios";
import { useParams } from "next/navigation";
import formatDate from "../../../helpers/format.date";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";

const SingleBook = () => {
  const params = useParams();

  const [bookData, setBookData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [category, setCategory] = useState([]);
  const token = Cookies.get('token');

  const fetchBook = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/books/${params.bookId}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setBookData(response.data);
    } catch (error) {
      console.log("Error in getting book details:");
    }
  };

  const getAuthors = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/authors`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/category`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    getAuthors();
    getCategories();
    fetchBook();
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
            <Card.Img variant="top" src="/images/background/2457.jpg" />
            <Card.Body>
              <Card.Title className="text-center fs-10 text-primary text-uppercase fw-bold">
                {bookData.title}
              </Card.Title>
              <Card.Text>
                <div className="d-grid grid-col-2">
                  <p>
                    <span className="fw-bold">Description : </span>
                    {bookData.description}
                  </p>
                  <p>
                    <span className="fw-bold">Category: </span>{" "}
                    {
                      category.find(
                        (category) => category.id === bookData.categoryId
                      )?.name
                    }
                  </p>
                  <p>
                    <span className="fw-bold">Author: </span>{" "}
                    {authors.find((author) => author.id === bookData.authorId)
                      ?.firstName +
                      " " +
                      authors.find((author) => author.id === bookData.authorId)
                        ?.lastName}
                  </p>
                  <p>
                    <span className="fw-bold">Publisher: </span>
                    {bookData.publisher}
                  </p>
                  <p>
                    <span className="fw-bold"> Number of Copies : </span>
                    {bookData.copies}
                  </p>
                  <p>
                    <span className="fw-bold">Published Date: </span>
                    {formatDate(new Date(bookData.publish_date))}
                  </p>
                </div>
              </Card.Text>
              <Card.Text>
                <small className="text-muted">
                  Created at {formatDate(bookData.createdAt)}
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title>Data of Students with The Book</Card.Title>
              <Table className="text-nowrap table overflow-x-scroll align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-white text-uppercase">
                      name
                    </th>
                    <th scope="col" className="text-white text-uppercase">
                      student no
                    </th>
                    <th scope="col" className="text-white text-uppercase">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>sheriff gaye</td>
                    <td>20456716</td>
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

export default SingleBook;
