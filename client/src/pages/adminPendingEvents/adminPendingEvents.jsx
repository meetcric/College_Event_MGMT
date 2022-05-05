import "./adminPendingEvents.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPendingEvents() {
  const [tableData, setTableData] = useState([]);
  // const user = "shreyank"; //change
  // var logs;

  function approveEvent(id) {
    console.log(id);
    axios.post("http://localhost:8000/api/approveEvent/" + id);
  }

  function rejectEvent(id) {
    axios.post("http://localhost:8000/api/rejectEvent/" + id);
  }

  useEffect(() => {
    fetch("http://localhost:8000/api/showAllPendingEvents/")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  });

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
            <button
              className="userListEdit"
              onClick={() => approveEvent(params.row._id)}
            >
              Approve
            </button>
            <button
              className="userListEdit"
              onClick={() => rejectEvent(params.row._id)}
            >
              Reject
            </button>
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
