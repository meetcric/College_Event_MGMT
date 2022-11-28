import "./studentParticipatedEvents.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export default function StudentParticipatedEvents() {
  
  const [tableData, setTableData] = useState([]);
  const email =  jwt_decode(localStorage.getItem("token"))["email"];
  useEffect(() => {
    fetch("http://localhost:8000/api/showStudentParticipatedEvents/" + email)
    .then((data) => data.json())
    .then((data) => setTableData(data));
  }, [])
  
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
              {/* <button className="userListEdit" onClick={() => participate(params.row._id)}>Participate</button> */}
              {/* <button className="userListEdit" onClick={() => rejectEvent(params.row._id)}>Reject</button> */}
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
