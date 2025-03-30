import { NavLink } from "react-router-dom"

interface NavItemProps {
    name: string;
    path: string;
  }
  

function NavItem({name, path}: NavItemProps) {
    return (
        <li>
            <NavLink to = {path}>{name}</NavLink>
        </li>
    )
}

export default NavItem