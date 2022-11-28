import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserList() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/allUserList")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);
  function deleteUser(id) {
    axios.post("http://localhost:8000/api/deleteUser/" + id);
  }
  async function handleDelete(id) {
    const result = await deleteUser(id);
    toast.success("User Deleted Succesfull!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    fetch("http://localhost:8000/api/allUserList")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }
  const columns = [
    { field: "email", headerName: "Email", width: 200, editable: true },
    {
      field: "phoneno",
      headerName: "Phone No.",
      width: 120,
    },
    {
      field: "role",
      headerName: "Role",
      width: 160,
    },
    {
      field: "course",
      headerName: "Course",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/user/" + params.row.id}> */}
            {/* <button
              className="userListEdit"
              onClick={() => enableEdit(params.row)}
            >
              Edit
            </button> */}
            {/* </Link> */}
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
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
