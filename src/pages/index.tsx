import Header from "@/components/header";
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import "@/app/globals.css"

import {useState , useEffect} from 'react'
import DataArea from "@/components/dataArea";
export default  function Home(){
    const [adminAddress,setAdminAddress] = useState("")
    return(
        <Provider store={store}>
            <div >
                <Header adminAddress={adminAddress} setAdminAddress = {setAdminAddress}></Header>
                <DataArea/>
            </div>
        </Provider>
        
    )
}