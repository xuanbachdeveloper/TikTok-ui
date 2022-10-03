import styles from './FooterItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function FooterItem({ text }) {
    return (
        <div className={cx('footer-item')}>
            <Link to={'/'} className={cx('footer-item')}>{text}</Link>
        </div>
    );
}

export default FooterItem;
