import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Portal from '../Portal';
const cx = classNames.bind(styles);

function Modal({ children, className, onCloseModal }) {
    const handleClose = () => {
        if (onCloseModal) {
            onCloseModal();
        }
    };
    const classes = cx('modal', {
        [className]: className,
    });

    return (
        <Portal>
            <div className={classes} onClick={handleClose}>
                {children}
            </div>
        </Portal>
    );
}

export function ModalContent({ onCloseModal, children }) {
    const handleClose = () => {
        if (onCloseModal) {
            onCloseModal();
        }
    };
    return (
        <div className={cx('modal-dialog')}>
            <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                <button className={cx('modal-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className={cx('modal-body')}>{children}</div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onCloseModal: PropTypes.func.isRequired,
};

ModalContent.propTypes = {
    children: PropTypes.node.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
