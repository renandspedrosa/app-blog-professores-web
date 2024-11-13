const errorsMessage = (error, alert) => {
    if (error.response) {
        const { data } = error.response;

        if (data.errors) {
            const { errors } = data;
            Object.keys(errors).forEach((field) => {
                if (errors[field]._errors && errors[field]._errors.length > 0) {
                    errors[field]._errors.forEach((errorMsg) => {
                        alert.info(`Campo ${field}: ${errorMsg}`);
                    });
                }
            });
        } else {
            alert.info(data.message || "Ocorreu um erro inesperado.");
        }
    } else {
        alert.error(error.message || "Ocorreu um erro inesperado.");
    }
};

export default errorsMessage;
