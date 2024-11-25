const PaginationBtn = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`focus:outline-none font-medium text-sm rounded-lg border-0 py-2 px-5 text-white ${
        disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 shadow-sm hover:bg-indigo-500'
      }`}
    >
      {children}
    </button>
  );
};

export default PaginationBtn;
