import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './FollowingAccounts.module.scss';
import AccountItem from './AccountItem';
import * as usersService from '~/services/usersService';

const cx = classNames.bind(styles);

function FollowingAccounts({ label}) {
    const [data, setData] = useState([]);
    const [allFollowingUsers, setAllFollowingUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [page] = useState(1);
    const [seeMore, setSeeMore] = useState(false)
    useEffect(() => {
        const getAcounts = async () => {
            const result = await usersService.getFollowingsList(page);
            setAllFollowingUsers(result);
            const lessResult = result.slice(0, 5);
            setFollowingUsers(lessResult);
            setData(lessResult);

        };

        getAcounts();
    }, [page]);

    const handeLoadMore = async () => {
        seeMore ? setData(followingUsers) : setData(allFollowingUsers)
        setSeeMore(!seeMore)
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((data) => (
                <AccountItem key={data.id} data={data} />
            ))}

            <p className={cx('more-btn')} onClick={handeLoadMore}>
            {seeMore ? '   See less' : 'See more'}
            </p>
        </div>
    );
}

FollowingAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default FollowingAccounts;
