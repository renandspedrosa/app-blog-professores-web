function ButtonPrimary(props) {
  return (
      <button 
          {...props}
          className={`mt-6 px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base`}
      >
          {props.children}
      </button>
  );
}

export default ButtonPrimary;
