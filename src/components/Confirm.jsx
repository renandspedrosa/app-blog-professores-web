import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Confirm = (title, message, onConfirm, onCancel = () => {}) => {
    confirmAlert({
        title,
        message,
        buttons: [
            {
                label: 'Não',
                onClick: onCancel,
            },
            {
                label: 'Sim',
                onClick: onConfirm,
            },
        ],
    });
};

export default Confirm;
