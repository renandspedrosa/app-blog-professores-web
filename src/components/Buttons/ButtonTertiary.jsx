function ButtonTertiary(props) {
  return (
      <button 
          {...props}
          className={`mt-6 px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400`}
      >
          {props.children}
      </button>
  );
}

export default ButtonTertiary;
