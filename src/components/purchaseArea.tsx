import { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios'
import dayjs from 'dayjs';
import { text } from 'stream/consumers';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '@/app/auth/authSlice';
import { getAllData } from '@/app/history/historySlice';
export default function PurchaseArea() {
    const assetOptions = [
        { value: 'premium', label: 'Premium' },
        { value: 'Siren', label: 'Siren' },
        { value: 'eggs', label: 'Resource' },
        { value: 'resource', label: 'Water' }
    ]
    const dispatch = useDispatch<any>()
    const [selectedAssetValue, setSelectedAssetValue] = useState(assetOptions[0])
    const [dateValue,setDateValue] = useState('')
    const [inputValue,setInputValue] = useState('')
    const [walletAddress,setWalletAddress] = useState('')
    const accessToken = useSelector(selectAccessToken)
    const handleDateChange = (date:any) => {
        setDateValue(date.format('YYYY-MM-DD'));
      };
    const onSendBtn = ()=>{
        let value = selectedAssetValue.value==='premium'?dateValue:inputValue
        if(walletAddress&&selectedAssetValue.value&&value){
            axios.post("http://116.202.172.229:8443/api/v1/user/update",{
                object:selectedAssetValue.value,
                value,
                wallets:walletAddress,
                token: accessToken
            }).then(res=>{
                if(res.data.data===true){
                    alert('success')
                    dispatch(getAllData(accessToken))
                }
                else{
                    alert('bad action')
                }
                setWalletAddress('')
                setSelectedAssetValue(assetOptions[0])
                setDateValue('YYYY/MM/DD')
                setInputValue('')
            })
        }
    }
    return (
        <div className="w-4/5 mt-4 rounded-md border border-zinc-300 mx-auto mb-32">
            <div className="flex justify-between px-10 py-10">
                <div className="w-2/5  ">
                    <div className="text-3xl py-2">Update Users</div>
                    <div className="text-md py-2">Please update variables for following users</div>
                    <textarea className="w-full border border-zinc-300 rounded-md h-64 mt-2 p-3"
                        value={walletAddress} onChange={(evt)=>setWalletAddress(evt.target.value)}
                    ></textarea>
                </div>
                <div className="w-2/5 pt-10">
                    <div className="text-md py-2">Objects</div>
                    <CreatableSelect isClearable options={assetOptions} className='py-2' value={selectedAssetValue} onChange={(value: any) => setSelectedAssetValue(value)} />
                    <div className="text-md py-2">{selectedAssetValue.value === 'premium'?'Start Date':'Amount'}</div>
                    {selectedAssetValue.value === 'premium' ?
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker className='w-full py-2' value={dateValue} onChange={handleDateChange}/>
                        </LocalizationProvider> :
                        <div>
                            <input type="number" className='w-full border rounded-md border-zinc-300 py-2 outline-none px-2'
                            value={inputValue} onChange={(evt)=>setInputValue(evt.target.value)}/>
                        </div>
                    }
                    <button className='w-full h-20 rounded-full bg-gray-500 my-5 text-3xl uppercase text-white hover:bg-gray-400 duration-500'
                        onClick={onSendBtn}
                    >Send</button>
                </div>

            </div>
        </div>
    )
}