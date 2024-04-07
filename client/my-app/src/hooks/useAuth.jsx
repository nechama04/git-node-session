import { useSelector } from "react-redux"
import { selectToken } from "../../src/features/auth/authSlice"
import {jwtDecode} from "jwt-decode"
import { useDebounce } from "primereact/hooks"
const useAuth = () => {
   const token = localStorage.getItem('token')
   let isAdmin = false
   let isUser = false
   if (token) {
      const userDecode = jwtDecode(token)
      console.log("userDecode", userDecode);
      const { _id, userName, name, email, phone, address, roles } = userDecode
      isAdmin = roles === "manager"
      isUser = roles === "regular"
      return { name: name }

   }
   return { _id: "", userName: "", isAdmin, isUser, address: "", roles: "", email: "", phone: 0,name:"aaa" }

}
export default useAuth