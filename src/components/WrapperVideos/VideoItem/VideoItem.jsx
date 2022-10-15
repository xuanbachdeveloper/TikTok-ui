import { useRef, useState, useEffect } from 'react';
import styles from './VideoItem.module.scss';
import classNames from 'classnames/bind';
import { faMusic, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import useElementOnScreen from '~/hooks/useElementOnScreen'
import Button from '~/components/Button';

import Linkify from 'linkify-react';
import 'linkify-plugin-hashtag';

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
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    const optionsHashTag = {
        formatHref: {
            hashtag: (href) => '/hashtag/' + href.substr(1),
        },
    };

    const wrapperRef = useRef(null)
// eslint-disable-next-line
    const [wrapperElement, setWrapperElement] = useState(null)

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8,
    }

    const isVisibile = useElementOnScreen(options, wrapperRef)

    useEffect(() => {
        setWrapperElement(wrapperRef.current)
        return () => {}
    }, [])


    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <Tippy interactive delay={[800, 200]} offset={[125, 10]} placement="bottom" render={renderPreview}>
                <Link to={`/@${data.user.nickname}`} className={cx('link-avatar')}>
                    <Image className={cx('user-avatar')} src={data.user.avatar} alt={data.user.nickname} />
                </Link>
            </Tippy>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    {data.user.is_followed ? (
                        <>
                            <Button outline_black small className={cx('btn-unfollow')}>
                                Unfollow
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button outline small className={cx('btn-follow')}>
                                Follow
                            </Button>
                        </>
                    )}

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
                        <Linkify className={cx('content')} options={optionsHashTag} tagName="span">
                            {data.description}
                        </Linkify>
                        <h4 className={cx('video-music')}>
                            <Link to="/music/nhac-nen">
                                <FontAwesomeIcon icon={faMusic} /> Nhạc nền - {data.music}
                            </Link>
                        </h4>
                    </div>
                </header>
                <VideoPlayer data={data} isVisibile={isVisibile}/>
            </div>{' '}
        </div>
    );
}

export default VideoItem;
