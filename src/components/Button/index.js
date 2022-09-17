import { useRef } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Button.module.scss";
const cx = classNames.bind(style);
function Button({ to, className, children }) {
  console.log(to);
  const Tag = to ? NavLink : "div";
  const handleActive = (nav) => {
    console.log(nav);
    // if (e.isActive) {
    // }
    return `${
      nav.isActive ? "active" : ""
    } text-[color:var(--primary)] transition-all font-medium text-lg p-3  ${className}`;
    // if (e.isActive) {
    //   return `text-[color:var(--primary)] transition-all font-medium text-lg p-3  ${className}`;
    // } else {
    //   return `text-white hover:text-[color:var(--primary)] transition-all font-medium text-lg p-3  ${className}`;
    // }
  };
  return (
    <NavLink className={handleActive} to={to}>
      {children}
    </NavLink>
  );
}
//   className={`text-white hover:text-[color:var(--primary)] transition-all font-medium text-lg p-3  ${className}`}
// Tag === NavLink
// : `text-white hover:text-[color:var(--primary)] transition-all font-medium text-lg p-3  ${className}`

export default Button;
