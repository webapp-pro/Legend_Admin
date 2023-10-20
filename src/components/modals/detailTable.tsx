import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getDataByWallet } from "@/app/history/historySlice";
import { AnyAction } from "@reduxjs/toolkit";
import {useEffect} from 'react'
import {FaHistory} from '@react-icons/all-files/fa/FaHistory'
import { selectAccessToken } from "@/app/auth/authSlice";
export interface DataType {
    id: number | null;
    name: string | null;
    category: string | null;
    age: number | null;
}

interface PropsType {
    walletAddress: string
}
const DetailTable = ({walletAddress}: PropsType) => {
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const showData: DataType[] = useSelector(
        (state: RootState) => state.history.detail
    );
   
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'Date',
            headerName: 'Date',
            flex: 2,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'Time',
            headerName: 'Time',
            flex: 2,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'ipAddress',
            headerName: 'Ip Address',
            flex: 3,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'action_type',
            headerName: 'Action Type',
            flex: 3,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'detail',
            headerName: 'Detail Info',
            flex: 5,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        
    ];
    useEffect(()=>{
        dispatch(getDataByWallet({walletAddress,accessToken}) as unknown as AnyAction)
    },[walletAddress])
    return (
        <Box >
            <DataGrid
                rows={showData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}
export default DetailTable