import styles from './SharePreview.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function SharePreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <ul>
                <li><FontAwesomeIcon icon={faCode}/>Embed</li>
                <li>Send to friends</li>
                <li>Share to Facebook</li>
                <li>Share to WhatsApp</li>
                <li>Copy link</li>
            </ul>
        </div>
    );
}

export default SharePreview;
