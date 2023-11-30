import {
  Copy,
  Eye,
  MoreHorizontal,
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";

const StudentsTable = ({ data }) => {
  const [levels, setLevels] = useState([]);

  const token = Cookies.get("token");

  const getLevels = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/level`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setLevels(response.data);
    } catch (error) {
      console.error("Error fetching levels");
    }
  };

  useEffect(() => {
    getLevels();
  }, []);

  const CustomToggle = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<typeof Link>
  >(({ children, onClick }, ref) => (
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

  const router = useRouter();
  const isStudentRoute = router.pathname === "/students";

  return (
    <div className="">
      <Table className="text-nowrap table overflow-x-scroll align-middle">
        <thead className="table-dark justify-content-around">
          <tr>
            <th scope="col" className="text-white text-uppercase">
              fullname
            </th>
            <th scope="col" className="text-white text-uppercase">
              gender
            </th>
            <th scope="col" className="text-white text-uppercase">
              email
            </th>
            <th scope="col" className="text-white text-uppercase">
              student id
            </th>

            <th scope="col" className="text-white text-uppercase">
              level
            </th>
            {isStudentRoute && (
              <th
                scope="col"
                className="text-white text-uppercase justify-content-end"
              >
                action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item: any) => (
              <tr key={item.id}>
                <td>
                  {item.firstname} {item.lastname}
                </td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>{item.studentId}</td>
                <td>
                  {levels.find((level) => level.id === item.levelId)?.name}
                </td>
                {isStudentRoute && (
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="dropdown-basic"
                        as={CustomToggle}
                      >
                        <MoreVertical className="text-muted" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="start">
                        <Dropdown.Item>
                          <Eye
                            size={15}
                            className="text-success"
                            onClick={() => router.push(`students/${item.id}`)}
                          />{" "}
                          View
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Trash2 size={15} className="text-danger" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                <div className="d-flex justify-content-center">
                  <span className="fs-4">No data available.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentsTable;
