import { useSelector } from "react-redux";
import CustomTable from "./customTable";
import PurchaseArea from "./purchaseArea";
import { selectLoginState } from "@/app/auth/authSlice";

export default function DataArea() {
  const loginState = useSelector(selectLoginState);

  return (
    <div>
      {loginState ? (
        <>
          <CustomTable />
          <PurchaseArea />
        </>
      ) : (
        <div className="w-full h-screen text-7xl uppercase flex justify-center items-center">
            You Don't Have Permission
        </div>
      )}
    </div>
  );
}
