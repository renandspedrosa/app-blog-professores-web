function Button(props) {

    let color = props.color || "indigo";
  return (
      <button 
          {...props}
          className={`rounded-md bg-${color}-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${color}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-600`}
      >
          {props.children}
      </button>
  );
}

export default Button;
