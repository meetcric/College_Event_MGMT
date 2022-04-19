import "./pendingEventList.css";
import { DataGrid } from "@material-ui/data-grid";
import { CollectionsOutlined, ContactSupportOutlined, DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

// const a = [ {
//   addedby: "shreyank",
//   allowedusers: "Ph.D",
//   datetime: "2022-04-29T00:36",
//   eventtype: "seminar",
//   maxparticipation: "1002",
//   name: "Third Event",
//   otherinfo: "",
//   venue: "MMP",
//   __v: 0,
//   id: "62586f8a4546f83165534965",
// }]

export default function PendingEventList() {
  
  const [tableData, setTableData] = useState([]);
  const user = jwt_decode(localStorage.getItem("token"))["name"];   //change
  var logs;

  // async function getData() { 
  //   await axios.get("http://localhost:8000/api/showPendingEvents/" + user)
  //   .then(res => { 
  //     logs = res.data;
  //     setData(logs)       
       
  //     console.log(data);
  //     console.log(logs);        // console.log(res.data);
  //   })
  // }

  // getData();

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/showPendingEvents/" + user)
  //   .then((res) => res.data)
  //   .then((res) => logs=res)
  //   .then((res) => setData(res))
  //   .then((res) => console.log(data));
  // })

  // console.log(data);
  // console.log(typeof(data));
  // console.log(logs);

  useEffect(() => {
    fetch("http://localhost:8000/api/showPendingEvents/" + user)
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
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
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
