/* eslint-disable react-hooks/rules-of-hooks */
import CategoryTable from "components/category/CategoryTable";
import { useEffect, useState } from "react";
import axios from "axios";

const category = () => {
  const [data, setData] = useState([]);

  const getCategoris = async () => {
    const response = await axios.get("http://localhost:8080/category");
    setData(response.data);
  };

  useEffect(() => {
    getCategoris();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-start p-5 align-items-start">
        <button className="btn btn-primary">Create New Category</button>

      </div>
      <CategoryTable data={data} />
    </div>
  );
};

export default category;
