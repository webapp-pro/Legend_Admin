import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoginState } from "@/app/auth/authSlice";
export default function Header({adminAddress,setAdminAddress}) {
  const handleConnect = async () => {
    try {
      // Check if MetaMask is installed and available
      if (typeof window.ethereum !== 'undefined') {
        // Request access to the user's accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        setAdminAddress(walletAddress)
        // Do something with the wallet address
      } else {
        // MetaMask is not installed or not available
        console.error('Please install MetaMask extension.');
      }
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };
  const dispatch = useDispatch()
  useEffect(()=>{
    
    if(adminAddress.startsWith('0x'))
      login(adminAddress,dispatch,()=>{
              
      })
  },[adminAddress])
  return (
    <div className="fixed z-10 bg-white w-full h-20 flex justify-end shadow-md px-20">
      <button className=" h-full hover:bg-gray-300 duration-300 cursor-pointer" onClick={handleConnect}>{adminAddress!==""?adminAddress:'Connect'}</button>
    </div>
  );
}