const FormError = ({ error }) => {
    return error ? <div className="text-red-500 text-sm mt-1">{error}</div> : null;
};

export default FormError;