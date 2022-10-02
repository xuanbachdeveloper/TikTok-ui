import styles from './Discover.module.scss';
import classNames from 'classnames/bind';
import DiscoverItem from './DiscoverItem/DiscoverItem';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Discover({ label }) {
    return (
        <div className={cx('Wrapper')}>
            <p className={cx('Label')}>{label}</p>
            <DiscoverItem label={'ABC'} />
            <DiscoverItem label={'ABC'} />
            <DiscoverItem label={'ABC'} />
            <DiscoverItem label={'ABC'} />
            <DiscoverItem label={'ABC'} />
            <DiscoverItem label={'ABC'} />
        </div>
    );
}

Discover.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Discover;
