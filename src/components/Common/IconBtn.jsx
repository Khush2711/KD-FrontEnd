const IconBtn = ({ onClick, text }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-yellow-50 text-black font-bold rounded "
    >
      {text}
    </button>
  );
  
  export default IconBtn;
  