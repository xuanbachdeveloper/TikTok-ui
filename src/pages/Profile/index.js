import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewVideo from '~/components/PreviewVideo';
import * as usersService from '~/services/usersService';
import styles from './Profile.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { LinkIcon, LockIcon, LockIconOutLine, UnFollowIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Profile() {
    const [state, setState] = useState(false);
    setTimeout(()=>setState(true), 300)
    const { nickname } = useParams();
    const [data, setData] = useState({});

    const lineRef = useRef(null);

    const [showUserVideos, setShowUserVideos] = useState(true);
    const [showUserLikedVideos, setShowUserLikedVideos] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const result = await usersService.getUser(nickname);
            setData(result);
        };
        getUser();
    }, [nickname]);

    const handleShowUserVideos = () => {
        const lineElement = lineRef.current;
        setShowUserVideos(true);
        setShowUserLikedVideos(false);
        lineElement.style.transform = 'translateX(0)';
    };

    const handleShowUserLikedVideos = () => {
        const lineElement = lineRef.current;
        setShowUserVideos(false);
        setShowUserLikedVideos(true);
        lineElement.style.transform = 'translateX(100%)';
    };
    return (
        <div className={cx('user-page')}>
           {state === true ? <div>
            <div className={cx('header')}>
                 <div className={cx('info')}>
                    <Image className={cx('userAvatar')} src={data.avatar} />
                    <div className={cx('title')}>
                        <h3 className={cx('nickname')}>
                            <span>{data.nickname}</span>
                            {data.tick && <FontAwesomeIcon icon={faCheckCircle} />}
                        </h3>
                        <h1 className={cx('username')}>{`${data.first_name} ${data.last_name}`}</h1>
                        {data.is_followed ? (
                            <div className={cx('btns')}>
                                <Button outline className={cx('btn-ib')}>
                                    Tin nhắn
                                </Button>
                                <Button className={cx('btn-unfollow')}>
                                    <UnFollowIcon />
                                </Button>
                            </div>
                        ) : (
                            <Button primary className={cx('btn-follow')}>
                                Follow
                            </Button>
                        )}
                    </div>
                </div> 
                <h2 className={cx('conuter')}>
                    <div className={cx('number')}>
                        <strong>{data.followings_count}</strong>
                        <span>Đang Follow</span>
                    </div>
                    <div className={cx('number')}>
                        <strong>{data.followers_count}</strong>
                        <span>Follower</span>
                    </div>
                    <div className={cx('number')}>
                        <strong>{data.likes_count}</strong>
                        <span>Thích</span>
                    </div>
                </h2>
                <div className={cx('desc')}>{data.bio ? data.bio : 'Chưa có tiểu sử.'}</div>
                <div className={cx('links')}>
                    {data.facebook_url ? (
                        <a href={data.facebook_url}>
                            <LinkIcon />
                            <span>{data.facebook_url}</span>
                        </a>
                    ) : null}
                    {data.instagram_url ? (
                        <a href={data.instagram_url}>
                            <LinkIcon />
                            <span>{data.instagram_url}</span>
                        </a>
                    ) : null}
                    {data.twitter_url ? (
                        <a href={data.twitter_url}>
                            <LinkIcon />
                            <span>{data.twitter_url}</span>
                        </a>
                    ) : null}
                    {data.website_url ? (
                        <a href={data.website_url}>
                            <LinkIcon />
                            <span>{data.website_url}</span>
                        </a>
                    ) : null}
                    {data.youtube_url ? (
                        <a href={data.youtube_url}>
                            <LinkIcon />
                            <span>{data.youtube_url}</span>
                        </a>
                    ) : null}
                </div>
            </div>
            <div className={cx('main')}>
                <div className={cx('tabs')}>
                    <div className={cx('tab', { active: showUserVideos })} onClick={handleShowUserVideos}>
                        Video
                    </div>
                    <div className={cx('tab', { active: showUserLikedVideos })} onClick={handleShowUserLikedVideos}>
                        <LockIcon />
                        <span>Đã thích</span>
                    </div>
                    <div ref={lineRef} className={cx('bottom-line')} />
                </div>
                <div className={cx('container')}>
                    {showUserVideos && (
                        <div className={cx('video-feed')}>
                            {data.videos?.map((video) => (
                                <PreviewVideo key={video.id} video={video} />
                            ))}
                        </div>
                    )}

                    {showUserLikedVideos && (
                        <div className={cx('video-liked')}>
                            <LockIconOutLine className={cx('icon')} width="90px" height="90px" />
                            <p className={cx('like-title')}>Video đã thích của người dùng này ở trạng thái riêng tư</p>
                            <p className={cx('like-desc')}>
                                {`Các video được thích bởi ${data.nickname} hiện đang ẩn`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>: <></>}
        </div>
    );
}

export default Profile;
