import styles from './VideoItem.module.scss';
import classNames from 'classnames/bind';
import { faMusic, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import AccountPreview from '../AccountPreview/index';
import Tippy from '@tippyjs/react/headless';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

function VideoItem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview
                        data={data}
                    />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            
            
            <Tippy
                            interactive
                            delay={[800, 200]}
                            offset={[110, 0]}
                            placement="bottom"
                            render={renderPreview}
                        >
            <Link to={`/@${data.user.nickname}`} className={cx('link-avatar')}>
                <Image className={cx('user-avatar')} src={data.user.avatar} alt={data.user.nickname} />
            </Link></Tippy>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <Button outline small className={cx('btn-follow')}>
                        Follow
                    </Button>
                    <div className={cx('info')}>
                            <Link to={`/@${data.user.nickname}`} className={cx('user')}>
                                <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                                {data.tick ? (
                                    <>
                                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                    </>
                                ) : (
                                    <></>
                                )}
                                <p className={cx('fullname')}>{`${data.user.first_name} ${data.user.last_name}`}</p>
                                {/* .<span className={cx('time')}>{data.published_at}</span> */}
                            </Link>
                        <div className={cx('content')}>
                            <span className={cx('text')}>{data.description}</span>
                        </div>
                        <h4 className={cx('video-music')}>
                            <Link to="/music/nhac-nen">
                                <FontAwesomeIcon icon={faMusic} /> Nhạc nền - {data.music}
                            </Link>
                        </h4>
                    </div>
                </header>
                <VideoPlayer data={data} />
            </div>{' '}
        </div>
    );
}

export default VideoItem;
