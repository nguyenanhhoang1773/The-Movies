import { NavLink } from "react-router-dom";
import { forwardRef } from "react";
function Button({ to, className, children, onClick }, ref) {
  const Tag = to ? NavLink : "div";
  const handleActive = (nav) => {
    if (nav.isActive) {
      return `text-[color:var(--primary)] px-[20px]   transition-all font-medium text-lg p-3  ${className}`;
    } else {
      return `text-white hover:text-[color:var(--primary)] px-[20px]  cursor-pointer  transition-all font-medium text-lg p-3  ${className}`;
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
          : ` ${className} text-white text-center px-[20px] hover:text-[color:var(--primary)] cursor-pointer transition-all font-medium text-lg p-3  ${className}`
      }
    >
      {children}
    </Tag>
  );
}
export default forwardRef(Button);
