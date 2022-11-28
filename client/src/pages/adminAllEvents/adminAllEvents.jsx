import "./adminAllEvents.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

export default function AdminAllEvents() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/allEvents/")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  function deleteIt(id) {
    axios.post("http://localhost:8000/api/deleteAprEvent/" + id);
  }

  async function deleteEvent(id) {
    console.log("hello");
    const result = await deleteIt(id);
    console.log("bye");
    fetch("http://localhost:8000/api/allEvents/")
      .then((data) => data.json())
      .then((data) => setTableData(data));
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
            <Button
              variant="secondary"
              color="error"
              onClick={() => deleteEvent(params.row._id)}
            >
              Reject
            </Button>
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
