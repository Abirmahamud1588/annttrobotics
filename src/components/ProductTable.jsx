import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { deleteProduct } from "../redux/productsSlice";

const ProductTable = ({ onView }) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "regularPrice", headerName: "Price", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <Button onClick={() => onView(params.row)}>View</Button>
          <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={products} columns={columns} pageSize={5} />
    </div>
  );
};

export default ProductTable;
