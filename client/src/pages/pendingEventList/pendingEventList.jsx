import "./pendingEventList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function PendingEventList() {
  const [tableData, setTableData] = useState([]);
  const user = jwt_decode(localStorage.getItem("token"))["name"]; //change
  var logs;

  useEffect(() => {
    fetch("http://localhost:8000/api/showPendingEvents/" + user)
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  const handleDelete = (id) => {
    const res = axios.post("http://localhost:8000/api/rejectEvent/" + id);
    res.then((value) => {
      fetch("http://localhost:8000/api/showPendingEvents/" + user)
        .then((data) => data.json())
        .then((data) => setTableData(data));
      console.log(value);
    });
    // console.log(res["status"]);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Event Name",
      width: 200,
    },
    { field: "eventtype", headerName: "Event Type", width: 150 },
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
            {/* <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link> */}
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
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
