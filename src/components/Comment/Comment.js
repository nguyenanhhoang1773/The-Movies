/* eslint-disable jsx-a11y/alt-text */
import style from "./Comment.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { userInforSelector } from "~/redux/Selector";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { db } from "~/firebase/config";
import { convertTimeStamp } from "~/hooks";

const cx = classNames.bind(style);
function Comment({
  name,
  photoUrl = "https://scontent.fdad1-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=cZ1PrPkQU1AAX85Phx1&_nc_ht=scontent.fdad1-4.fna&oh=00_AfBp-3Z-YAhwrv6Ved1TrYZHsf3CuLLm6DQaz2H-8LeGOg&oe=63C64678",
  message,
  room,
  write,
  email,
  timestamp,
}) {
  const isMoblie = useMediaQuery({ minWidth: 326, maxWidth: 600 });
  const userInfor = useSelector(userInforSelector);
  const isMyAccount = userInfor.email === email;
  const inputRef = useRef();
  const [time, setTime] = useState("");
  // const { seconds, nanoseconds } = timestamp;
  useEffect(() => {
    if (timestamp) {
      const timeConverted = convertTimeStamp(timestamp);
      setTime(timeConverted);
    }
  }, []);
  const handleSendMessage = async () => {
    const inputEle = inputRef.current;
    const text = inputEle.value;
    if (!text.trim()) {
      alert("Tin nhắn không được bỏ trống!");
      return;
    }
    inputEle.value = "";
    inputEle.focus();

    try {
      const docRef = await addDoc(collection(db, "message"), {
        name: name,
        email: email,
        photoURL: photoUrl,
        room: room,
        text: text,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      alert("Admin: Bạn phải đăng nhập để thực hiên tính năng này");
    }
  };
  return (
    <div
      className={`${cx("wrapper")} ${
        isMyAccount ? "flex-row-reverse" : ""
      }   flex items-center`}
    >
      <img
        className={` ${
          write ? "ml-[20px]  w-[42px] h-[42px]" : " w-[36px] h-[36px]"
        } ${isMyAccount ? "ml-[14px] " : "mr-[14px]"} rounded-full ${
          isMoblie ? "w-[28px] h-[28px] " : ""
        }`}
        src={photoUrl}
      />
      <div
        className={` flex ${write || isMoblie ? "flex-row-reverse " : ""} ${
          write ? "flex-1" : ""
        } px-[16px] py-[6px] items-center    rounded-2xl bg-slate-600`}
      >
        <div className="flex-1">
          <div
            className={`flex ${
              write && !isMoblie ? "justify-end " : "justify-between"
            } items-center`}
          >
            {write && isMoblie && (
              <button
                onClick={handleSendMessage}
                className={`${
                  isMoblie
                    ? "px-[8px] py-[4px] text-[10px] "
                    : "px-[12px] py-[4px] text-[20px] "
                }  hover:bg-green-500 bg-[color:var(--primary)] text-white text-shadow rounded-full mr-[14px] font-semibold `}
              >
                Send
              </button>
            )}
            {!isMyAccount && (
              <h3
                className={`${
                  isMoblie ? "text-[12px] " : "text-[20px] "
                } text-[color:var(--primary)] font-medium  `}
              >
                {name}
              </h3>
            )}
            {write && (
              <h3
                className={`${
                  isMoblie ? "text-[12px] " : "text-[20px] "
                }   font-medium text-[color:var(--primary)]`}
              >
                {name}
              </h3>
            )}
          </div>

          {write && (
            <div>
              <input
                placeholder={
                  name ? undefined : "Đăng nhập để trò chuyện cùng mọi người!"
                }
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    handleSendMessage();
                  }
                }}
                ref={inputRef}
                className={`${
                  isMoblie ? "text-[12px]" : ""
                } py-[4px] pl-[6px] w-full bg-slate-800 text-white text-shadow mt-[6px] rounded-md`}
                type="text"
              />
            </div>
          )}
          {!write && <p className="text-[16px] text-slate-300">{message}</p>}
          {time && (
            <span
              className={`${
                isMoblie ? "text-[10px]" : "text-[12px]"
              } inline text-slate-400 text-shadow`}
            >
              {time}
            </span>
          )}
        </div>

        {write && !isMoblie && (
          <button
            onClick={handleSendMessage}
            className={`
                 px-[12px] py-[4px] text-[20px] 
             hover:bg-green-500 bg-[color:var(--primary)] text-white text-shadow rounded-full mr-[14px] font-semibold `}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
