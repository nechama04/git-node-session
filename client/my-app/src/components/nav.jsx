import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { useSelector,useDispatch } from 'react-redux';
import { removeToken } from '../features/auth/authSlice';
import Home from './home';
import { Routes, Route, Router, Link, NavLink, useNavigate } from 'react-router-dom'
import apiSlice from '../app/apiSlice';
import useAuth from '../hooks/useAuth';


const Nav = () => {
    
const isUserLoggedIn=useSelector((state)=>state.auth)
const dispatch=useDispatch()
const {name}=useAuth()

const navigate=useNavigate()
const handleLogoutClick=()=>{
    dispatch(removeToken())
    dispatch(apiSlice.util.resetApiState())
    navigate("/home")

}

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>)
    const items = [
        {
           label: 'Home',
            // label:<Link to="./home" style={{ color: 'white', my: 2 }}>Home</Link>,
            icon: 'pi pi-home',
            //url:'../home'
            command:()=>navigate("/")
        },
        {
            label: 'login',
            icon: 'pi pi-circle',
            //url:'../features/auth/Login'
            command:()=>navigate("/login")
        },
        {
            label: 'register       ',
            icon: 'pi pi-cog',
            // url:'features/auth/Register'
            command:()=>navigate("/register")
        },
        {
            label: 'Logout       ',
            icon: 'pi pi-star'
        },
        {
            label:'Orders history',
            icon:"pi pi-history",
            command:()=>navigate("/history")
        },
        {
            label: 'Basket',
            icon: 'pi pi-cart-plus',
            badge: 1,
            template: itemRenderer,
            command:()=>navigate("/basket")
        },
        // {          
        //     label:<i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i>
            
        // },

        {          
            label:`hello ${name}`,
            icon:"pi pi-thumbs-up-fill"

        }

    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            {/* <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> */}
        </div>
    );
    return (
        <>
            {/* <NavLink to="/home" style={{ color: 'white', my: 2 }}>Home</NavLink> */}
            {/* {!isUserLoggedIn && <NavLink to="/home" style={{ color: 'white', my: 2 }}>Register</NavLink>} */}
            {!isUserLoggedIn && <NavLink to="/home" style={{ color: 'white', my: 2 }}>Login</NavLink>}
           
            {/* <NavLink to="/home" style={{ color: 'white', my: 2 }}>Basket</NavLink> */}
            {isUserLoggedIn &&<a onClick={handleLogoutClick}>Logout</a>}

            <div className="card">
                <Menubar model={items}
                    //start={start} 
                    end={end} />
            </div>
        </>
    )
}
export default Nav