import { NavLink } from "react-router-dom";
import { forwardRef } from "react";
function Button({ to, className, children, onClick }, ref) {
  const Tag = to ? NavLink : "div";
  const handleActive = (nav) => {
    if (nav.isActive) {
      return `text-[color:var(--primary)] transition-all font-medium text-lg p-3  ${className}`;
    } else {
      return `text-white hover:text-[color:var(--primary)] cursor-pointer  transition-all font-medium text-lg p-3  ${className}`;
    }
  };
  return (
    <Tag
      onClick={onClick}
      ref={ref}
      to={to}
      className={
        Tag === NavLink
          ? handleActive
          : `text-white w-[140px] text-center hover:text-[color:var(--primary)] cursor-pointer transition-all font-medium text-lg p-3  ${className}`
      }
    >
      {children}
    </Tag>
  );
}
export default forwardRef(Button);
