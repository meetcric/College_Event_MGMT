import "./studentEvents.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navigate, useNavigate } from "react-router-dom";

export default function StudentEvents() {
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const email = jwt_decode(localStorage.getItem("token"))["email"];

  useEffect(() => {
    fetch("http://localhost:8000/api/showStudentsEvents/" + email)
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  function participate(id) {
    var res = axios.get(
      "http://localhost:8000/api/participate/" + id + "/" + email
    );
    toast.success("Participated Succesfull!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("../partEvents");
  }

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
              onClick={() => participate(params.row._id)}
            >
              Participate
            </button>
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
