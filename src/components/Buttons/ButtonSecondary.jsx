function ButtonSecondary(props) {
  return (
      <button 
          {...props}
          className={`px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base`}
      >
          {props.children}
      </button>
  );
}

export default ButtonSecondary;
