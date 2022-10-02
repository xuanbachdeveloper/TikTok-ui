import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={data.user.avatar} alt="user-avatar" />
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <Link to={`/@${data.user.nickname}`}><strong>{data.user.nickname}</strong></Link>
                    {data.user.tick ? (
                        <>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </>
                    ) : (
                        <></>
                    )}
                </p>
                <Link to={`/@${data.user.nickname}`}><p className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</p></Link>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.user.followers_count} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.user.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
                <div className={cx('bio')}>
                    <p>{data.user.bio}</p>
                </div>
            </div>
        </div>
    );
}

export default AccountPreview;
