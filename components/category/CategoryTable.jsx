import { Edit,Trash2 } from "lucide-react";
import React from "react";
import { Table } from "react-bootstrap";
import formatDate from "../../helpers/format.date";
import { PencilFill } from "react-bootstrap-icons";

const CategoryTable = ({data}) => {

  const onDelete= async(id)=>{

    console.log(id);
  }

  return (

    <div className=" table-responsive justify-content-center p-5 ">
      <Table  className="text-nowrap table overflow-x-scroll align-middle">
        
        <thead className="table-dark">
          <tr>
           
            <th scope="col" className="text-white">NAME</th>
            <th scope="col" className="text-white">CREATED AT</th>
            <th scope="col" className="text-white">ACTION</th>
            
          </tr>
        </thead>
        <tbody>
         { 
          data.map((item)=>(
            <tr key={data.id}>
            <td>
             {item.name}
            </td>
            <td>
             {
              formatDate( (item.createdAt))
             }
            </td>
            <td>
             <div className="d-flex gap-3">
            <button className="btn btn-sm btn-primary">
            <Edit onClick={()=>onDelete(item.id)} size={15}/>
            </button>
            <button className="btn btn-sm btn-danger">
            <Trash2 size={15}/>
            </button>
             </div>
              
            </td>
           
          </tr>
          ))
         }
         
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryTable;
