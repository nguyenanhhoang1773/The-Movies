function SearchItem({ src, title, star }) {
  return (
    <div className="flex p-[8px] hover:bg-slate-800 hover:cursor-pointer border-b-2 border-slate-800 bg-slate-900">
      <img src={src} className="w-[100px] rounded-md " />
      <div className="flex flex-col justify-between text-white ">
        <h3 className="text-[24px] font-[600] mt-[14px] max-h-[72px] ml-[20px] overflow-hidden">
          {title}{" "}
        </h3>
        <button className=" text-[20px] w-[60px] text-[color:var(--primary)] font-[500] p-[2px] rounded-lg border border-white border-[2px] ml-[20px] mb-[12px]">
          {star}
        </button>
      </div>
    </div>
  );
}

export default SearchItem;
