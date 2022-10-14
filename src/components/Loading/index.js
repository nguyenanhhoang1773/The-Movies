import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function Loading({ className }) {
  const loadingEle = useRef();
  useEffect(() => {
    loadingEle.current.animate(
      [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
      {
        duration: 1000,
        iterations: Infinity,
      }
    );
  }, []);
  return (
    <div className="absolute top-[40%] left-[50%] translateCenter">
      <FontAwesomeIcon
        ref={loadingEle}
        className={`${className} w-[80px] h-[80px]   text-[color:var(--primary)]`}
        icon={faSpinner}
      />
    </div>
  );
}

export default Loading;
