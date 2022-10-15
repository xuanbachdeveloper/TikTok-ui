import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { nickname } = useParams();
    var ProfileMargin = nickname === undefined ? '' : '250px';
    var ProfileWidth = nickname === undefined ? '' : '1000px';
    var HomeStyle = nickname === undefined ? 'center' : '';
    const [currentUser, setcurrentUser] = useState();

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('currentUser'));
        setcurrentUser(items);
    }, []);
    return (
        <div style={{ alignItems: HomeStyle }} className={cx('wrapper')}>
            <Header currentUser={currentUser} />
            <div className={cx('container')}>
                <Sidebar currentUser={currentUser} className={cx('sidebar')} />

                <div style={{ marginLeft: ProfileMargin, width: ProfileWidth }} className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
