import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import FollowingAccounts from '~/components/FollowingAccounts/FollowingAccounts';
import config from '~/config';
import Button from '~/components/Button';
import Discover from '~/components/Discover';
import Footer from '~/components/Footer';

const cx = classNames.bind(styles);

function Sidebar({ currentUser, layout }) {
    return (
        <aside className={cx('wrapper')} style={{ width: layout === 'FullWidthLayout' ? '224px' : null  ,paddingRight: layout === 'FullWidthLayout' ? '15px' : null}}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            {currentUser ? (
                <>
                    {' '}
                    <SuggestedAccounts label="Suggested accounts" />
                    <FollowingAccounts label="Following accounts" />
                    <Discover label="Discover" />
                    <Footer />
                </>
            ) : (
                <>
                    {' '}
                    <div className={cx('currentUser-login')}>
                        <p className={cx('text-primary')}>Log in to follow creators, like videos, and view comments.</p>
                        <Button primary className={cx('primary-btn')} style={{ width: layout === 'FullWidthLayout' ? '190px' : null }}>
                            Log in
                        </Button>
                    </div>
                    <SuggestedAccounts label="Suggested accounts" />
                    <Discover label="Discover" />
                    <Footer />
                </>
            )}
        </aside>
    );
}

export default Sidebar;
