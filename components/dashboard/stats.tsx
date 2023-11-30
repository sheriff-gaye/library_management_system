import { Book, CassetteTape, List, User, Users } from "lucide-react";
import React from "react";
import { Row, Col, Card } from 'react-bootstrap';

const CardsStat = ({book,student,author,category}) => {
  return (
    <div>
      <Row>
        <Col xl={3} lg={6} md={6} sm={12} xs={12} className="mt-6">
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Students</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <Users/>
                    </div>
                </div>
                <div>
                    <h1 className="fw-bold">{student}</h1>
                    <p className="mb-0">completed</p>
                </div>
            </Card.Body>

            
        </Card>
        </Col>

        <Col xl={3} lg={6} md={6} sm={12} xs={12} className="mt-6">
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Books</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <Book/>
                    </div>
                </div>
                <div>
                    <h1 className="fw-bold">{book}</h1>
                    <p className="mb-0">completed</p>
                </div>
            </Card.Body>

            
        </Card>
        </Col>

        <Col xl={3} lg={6} md={6} sm={12} xs={12} className="mt-6">
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Categories</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <List/>
                    </div>
                </div>
                <div>
                    <h1 className="fw-bold">{category}</h1>
                    <p className="mb-0">completed</p>
                </div>
            </Card.Body>

            
        </Card>
        </Col>

        <Col xl={3} lg={6} md={6} sm={12} xs={12} className="mt-6">
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Authors</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <User/>
                    </div>
                </div>
                <div>
                    <h1 className="fw-bold">{author}</h1>
                    <p className="mb-0">completed</p>
                </div>
            </Card.Body>

            
        </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CardsStat;
