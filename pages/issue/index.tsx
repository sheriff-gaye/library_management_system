"use client";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { IssueTable } from "../../components/issue/issue-table";
import { CreateIssueModal } from "../../components/issue/create-modal";

const IssuePage = () => {
  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/issue`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            status: searchTerm
          }
        }
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <div className="d-flex justify-content-between  py-7 px-12 align-items-start">
        <CreateIssueModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          returnData={undefined}
        />
       
        <Form>
          <Form.Group className="w-full w-[300px]" controlId="status">
            <Form.Control
              as="select"
              name="status"
              className="w-[400px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="">All</option>
              <option value="Issued">Issued</option>
              <option value="Returned">Returned</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={() => setShowModal(!showModal)}>
          Issue Book
        </Button>
      </div>
     <div className="px-12">
     <IssueTable data={data} />
     </div>
    </div>
  );
};

export default IssuePage;
