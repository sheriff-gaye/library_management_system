import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Dropdown } from "react-bootstrap";
import { MoreVertical } from "react-feather";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TasksPerformance = ({ book, issued, returned }) => {
   
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (book && issued  && returned !== undefined) {
      setChartData([book, issued, returned]);
    }
  }, [book, issued, returned]);
    

  const performanceChartOptions = {
    labels: ["Total Books", "Issued", "Returned"],
    colors: ["#28a745", "#ffc107", "#dc3545"],
    chart: {
      type: "pie" as const,
    },
  };

  const ActionMenu = () => (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <MoreVertical size="15px" className="text-muted" />
      </Dropdown.Toggle>
      <Dropdown.Menu align={"end"}>
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="mb-0">Tasks Performance</h4>
          </div>
          <ActionMenu />
        </div>
        <div className="mb-8">
          <Chart {...performanceChartOptions} options={performanceChartOptions!} series={chartData} type="pie" />
        </div>
        <div className="d-flex align-items-center justify-content-around">
          <TaskMetric icon="fe-check-circle" color="text-success" value={book} label="Total Books" />
          <TaskMetric icon="fe-trending-up" color="text-warning" value={issued} label="Issued" />
          <TaskMetric icon="fe-trending-down" color="text-danger" value={returned} label="Returned" />
        </div>
      </Card.Body>
    </Card>
  );
};

const CustomToggle = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<typeof Link>>(
  ({ children, onClick }, ref) => (
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
  )
);

CustomToggle.displayName = "CustomToggle";

const TaskMetric = ({ icon, color, value, label }) => (
  <div className="text-center">
    <i className={`fe ${icon} ${color} fs-3`}></i>
    <h1 className="mt-3 mb-1 fw-bold">{value}</h1>
    <p>{label}</p>
  </div>
);

TaskMetric.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

TasksPerformance.propTypes = {
  book: PropTypes.number.isRequired,
  issued: PropTypes.number.isRequired,
  returned: PropTypes.number.isRequired,
};

export default TasksPerformance;
