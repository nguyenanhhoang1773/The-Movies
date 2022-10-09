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
    <FontAwesomeIcon
      ref={loadingEle}
      className={`${className} text-[color:var(--primary)]`}
      icon={faSpinner}
    />
  );
}

export default Loading;
