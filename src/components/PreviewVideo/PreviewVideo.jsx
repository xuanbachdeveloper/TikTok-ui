import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './PreviewVideo.module.scss';
import Image from '~/components/Image';
import { PlayIconOutLine } from '~/components/Icons';

const cx = classNames.bind(styles);

function PreviewVideo({ video }) {
    const [isHover, setIsHover] = useState(false);
    // eslint-disable-next-line
    const [videoElement, setVideoElement] = useState(null);

    const itemRef = useRef(null);
    const videoRef = useRef(null);

    const handleMouseOver = () => {
        setIsHover(true);
    };

    const handleMouseOut = () => {
        setIsHover(false);
    };

    useEffect(() => {
        if (videoRef) setVideoElement(videoRef.current);
    }, []);

    return (
        <div ref={itemRef} className={cx('item-container')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={cx('preview')}>
                <div className={cx('size-preview')}>
                    <div className={cx('thumb')}>
                        <Image src={video.thumb_url} />
                        {isHover && (
                            <video ref={videoRef} playsInline={true} autoPlay muted loop>
                                <source src={video.file_url} type="video/mp4" />
                            </video>
                        )}
                    </div>
                    <div className={cx('views-counter')}>
                        <PlayIconOutLine />
                        <span>{video.views_count}</span>
                    </div>
                </div>
            </div>
            <div className={cx('caption-line')} title={video.description}>
                {video.description}
            </div>
        </div>
    );
}

PreviewVideo.propTypes = {
    video: PropTypes.object.isRequired,
};
export default PreviewVideo;
