function FormButton(props) {
    let color = 'bg-blue-600 hover:bg-blue-800';

    if(props.color == 'gray') {
        color = 'bg-red-600 hover:bg-red-800';
    }
    
    return (
        <button 
         {...props}
            className={`text-white border-0 py-2 px-8 focus:outline-none rounded text-lg  ${color} ${props.css}`}>
          {props.children}
        </button>
    );
  }
  
  export default FormButton;
  