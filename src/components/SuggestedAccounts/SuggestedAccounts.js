import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import * as usersService from '~/services/usersService';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label}) {
    const [data, setData] = useState([]);
    const [allSuggestedUsers, setAllSuggestedUsers] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [page] = useState(1);
    const [perPage] = useState(15);
    const [seeMore, setSeeMore] = useState(false)
    useEffect(() => {
        const getAcounts = async () => {
            const result = await usersService.getSuggested(page, perPage);
            setAllSuggestedUsers(result);
            const lessResult = result.slice(0, 5);
            setSuggestedUsers(lessResult);
            setData(lessResult);

        };

        getAcounts();
    }, [page, perPage]);

    const handeLoadMore = async () => {
        seeMore ? setData(suggestedUsers) : setData(allSuggestedUsers)
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

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
