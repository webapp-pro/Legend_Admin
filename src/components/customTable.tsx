import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getAllData } from "@/app/history/historySlice";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { FaHistory } from "@react-icons/all-files/fa/FaHistory";
import Modal from "@mui/material/Modal";
import DetailTable from "./modals/detailTable";
import { selectAccessToken, selectLoginState } from "@/app/auth/authSlice";
export interface DataType {
  id: number | null;
  name: string | null;
  category: string | null;
  age: number | null;
}

const CustomTable = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const accessToken = useSelector(selectAccessToken)
  const showData: DataType[] = useSelector(
    (state: RootState) => state.history.data
  );
  const onHistoryBtn = (walletAddress: string) => {
    setSelectedWallet(walletAddress);
    setOpen(true);
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 2,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updatedAt",
      headerName: "UpdatedAt",
      flex: 2,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "walletAddress",
      headerName: "Wallet Address",
      flex: 2,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ipAddress",
      headerName: "IP Address",
      flex: 2,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Siren",
      headerName: "Siren",
      type: "number",

      flex: 2,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "eggs",
      headerName: "Resource",
      type: "number",
      flex: 1,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "resource",
      headerName: "Water",
      type: "number",
      flex: 1,
      editable: true,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "details",
      headerName: "details",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",

      renderCell: (params: GridCellParams) => (
        <strong
          className="w-full h-full flex justify-center items-center text-center cursor-pointer hover:bg-gray-200 duration-300"
          onClick={() => onHistoryBtn(params.row.walletAddress)}
        >
          {/* <Button variant="contained" color="primary" size="small" onClick={() => console.log(showData[params.row.id])}>
                        Click
                    </Button> */}
          <FaHistory />
        </strong>
      ),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];
  useEffect(() => {
        dispatch(getAllData(accessToken) as unknown as AnyAction);
  }, [accessToken]);
    return (
      <div className="pt-24">
        <Box
          sx={{
            height: "70%",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            overflowX: "hidden",
          }}
        >
          <DataGrid
            rows={showData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 20, 40]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="w-4/5 bg-white mx-auto rounded-3xl px-20 py-16 mt-24 shadow-2xl  ">
            <DetailTable walletAddress={selectedWallet} />
          </div>
          {/* <div style={{backgroundColor:'white'}}>asdf</div> */}
        </Modal>
      </div>
    );
    
};
export default CustomTable;
