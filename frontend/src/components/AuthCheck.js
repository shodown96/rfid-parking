import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

export default function AuthCheck({token}) {
    const history = useHistory();
    const {pathname} = useLocation();
    alert("Done");
  useEffect(() => {
    if(!pathname.includes("login")){
        if (!token || token === ""){
            toast("Login Required", {type:toast.TYPE.ERROR})
            if(pathname.includes("user")) history.push("/user/login")
            else history.push("/parkapp/login")
        }
    }
    else{
        if(token){
            if(pathname.includes("user")) history.replace("/user/profile")
            else history.replace("/parkapp/rfid")
        }
    }
  }, [token, pathname, history]);

  return null;
}