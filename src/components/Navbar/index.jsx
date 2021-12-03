import {
    NavLink
} from "react-router-dom";
import { Logout } from "../Logout";

import { FaStore, FaShoppingCart} from 'react-icons/fa';

import "./styles.css"
export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <NavLink exact={true} activeClassName="nav-selected" to="/"><FaStore/> Pets</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/cart"><FaShoppingCart/> My Cart</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/add-pet">Add Pet +</NavLink>
                </li>
                <li>
                    <Logout/>
                </li>
            </ul>
        </nav>
    )
}