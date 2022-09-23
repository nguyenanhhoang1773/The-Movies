function ButtonType({ title }) {
  return (
    <div className="text-center hover:text-green-100 cursor-pointer transition-all text-black inline-block text-[16px] font-normal p-1 w-[var(--type-btn-width)]">
      {title}
    </div>
  );
}

export default ButtonType;
