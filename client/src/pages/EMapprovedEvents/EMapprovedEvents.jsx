import "./EMapprovedEvents.css";
import { DataGrid } from "@material-ui/data-grid";
import { CollectionsOutlined, ContactSupportOutlined, DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export default function EMapprovedEvents() {
  
  const [tableData, setTableData] = useState([]);
  const user = "shreyank"   //change
  var logs;
  
  useEffect(() => {
    fetch("http://localhost:8000/api/showAllEMEvents/" + user)
    .then((data) => data.json())
    .then((data) => setTableData(data));
  })
  
  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Event Name",
      width: 200,
    },
    { field: "eventtype", headerName: "Event Type", width: 150 },
    { field: "addedby", headerName: "Added By", width: 150 },
    {
      field: "maxparticipation",
      headerName: "Maximum Participation",
      width: 120,
    },
    {
      field: "allowedusers",
      headerName: "Allowed Users",
      width: 160,
    },
    {
      field: "datetime",
      headerName: "Date & Time",
      width: 160,
    },
    {
      field: "venue",
      headerName: "Venue",
      width: 160,
    },
    {
      field: "otherinfo",
      headerName: "Other Info",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
              <button>Delete</button>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        disableSelectionOnClick
        columns={columns}
        // pageSize={8}
      />
    </div>
  );
}
