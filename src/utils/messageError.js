const errorsMessage = (error, toast) => {
    if (error.response) {
        const { data } = error.response;

        if (data.errors) {
            const { errors } = data;
            Object.keys(errors).forEach((field) => {
                if (errors[field]._errors && errors[field]._errors.length > 0) {
                    errors[field]._errors.forEach((errorMsg) => {
                        toast.info(`Campo ${field}: ${errorMsg}`);
                    });
                }
            });
        } else {
            toast.info(data.message || "Ocorreu um erro inesperado.");
        }
    } else {
        toast.error(error.message || "Ocorreu um erro inesperado.");
    }
};

export default errorsMessage;
