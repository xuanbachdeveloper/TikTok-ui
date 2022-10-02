import styles from './DiscoverItem.module.scss';
import classNames from 'classnames/bind';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function DiscoverItem({ label }) {
    return (
        <div className={cx('discover-item')}>
            <Link to={cx('label')}>
                <FontAwesomeIcon className={cx('discover-icon')} icon={faHashtag} />
                <p className={cx('discover-text')}>{label}</p>
            </Link>
        </div>
    );
}

export default DiscoverItem;
