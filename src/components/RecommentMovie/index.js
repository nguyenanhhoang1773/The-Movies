import { Link, useNavigate } from "react-router-dom";
function RecommentMovie({ id, title, src, star }) {
  const navigate = useNavigate();
  return (
    <div className="flex mt-[16px] first:mt-0">
      <img
        src={src}
        onClick={() => {
          navigate(`/movies/${id}`);
        }}
        className="w-[180px] rounded-md hover:cursor-pointer "
      />
      <div className=" flex flex-col justify-between ml-[16px]">
        <h3 className="text-white text-[22px] mt-[14px] ml-[20px] font-[500]">
          {title}
        </h3>
        <div className="text-center inline text-black font-[600] text-[18px] p-[8px] ml-[10px] mb-[40px] w-[60px] bg-[color:var(--primary)] rounded-full">
          {Math.ceil(star * 10) / 10}
        </div>
      </div>
    </div>
  );
}

export default RecommentMovie;
