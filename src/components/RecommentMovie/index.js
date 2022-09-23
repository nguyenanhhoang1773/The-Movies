function RecommentMovie({ title, src, star }) {
  return (
    <div className="flex mt-[16px]">
      <img src={src} className="w-[180px] " />
      <div className=" flex flex-col justify-between ml-[16px]">
        <h3 className="text-white text-[22px] font-[500]">{title}</h3>
        <div className=" inline text-white text-[18px] p-[8px] bg-[color:var(--primary)] rounded-full">
          {star}
        </div>
      </div>
    </div>
  );
}

export default RecommentMovie;
