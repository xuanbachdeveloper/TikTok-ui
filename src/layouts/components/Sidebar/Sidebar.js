import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

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

function Sidebar({ currentUser }) {
    const { nickname } = useParams();
    var SidebarStyle = nickname === undefined ? '' : '250px';
    return (
        <aside
            style={{
                width: SidebarStyle,
            }}
            className={cx('wrapper')}
        >
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
                        <Button primary className={cx('primary-btn')}>
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
