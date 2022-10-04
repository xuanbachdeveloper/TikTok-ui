import styles from './VideoPlayer.module.scss';
import classNames from 'classnames/bind';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { CommentIcon, HeartIcon, ShareIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import Tippy from '@tippyjs/react/headless';
import useElementOnScreen from '~/hooks/useElementOnScreen';

import ScrollTrigger from 'gsap/ScrollTrigger';
import TrackSlider from './TrackSlider';
import VolumeSlider from './VolumeSlider';
const cx = classNames.bind(styles);

gsap.registerPlugin(ScrollTrigger);

function VideoPlayer({ data, isVisibile }) {
    const videoRef = useRef(null);
    const [videoElement, setVideoElement] = useState(null);
    const [wrapperElement, setWrapperElement] = useState(null)
    const wrapperRef = useRef(null)


    const [duration, setDuration] = useState(data.meta.playtime_seconds);

    const [percentDurationSlider, setPercentDurationSlider] = useState(0);
    const [percentVolumeSlider, setPercentVolumeSlider] = useState(0);
    const [lastPercentVolumeSlider, setLastPercentVolumeSlider] = useState(0);
    const [timeDuration, setTimeDuration] = useState(data.meta.playtime_strings);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [isPlaying, setIsPlaying] = useState(false);
    const [ratioVideo, setRatioVideo] = useState()

    useEffect(() => {
        const ratio = data.meta.video.resolution_x / data.meta.video.resolution_y
        setRatioVideo(ratio)
        setWrapperElement(wrapperRef.current)
        setVideoElement(videoRef.current)
    }, [data, isVisibile])
    const play = useCallback(() => {
        if (videoElement) {
            videoElement.play()
        }
        setIsPlaying(true)
    }, [videoElement])

    const pause = useCallback(() => {
        if (videoElement) videoElement.pause()
        setIsPlaying(false)
    }, [videoElement])

    useEffect(() => {
        if (wrapperElement)
            if (videoElement) {
                if (isVisibile) {
                    if (!isPlaying) {
                        play()
                    }
                } else {
                    if (isPlaying) {
                        pause()
                    }
                }
            }
    }, [isVisibile, wrapperElement, videoElement])

    useEffect(() => {
        setVideoElement(videoRef.current);
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            pause()
        } else {
            play()
        }
    }

    const handleBtnPlay = () => {
        togglePlay();
    };

    const handleValueTrackChange = (e) => {
        const percent = parseInt(e.target.value);
        videoElement.currentTime = (percent * videoElement.duration) / 100;
        setPercentDurationSlider(e.target.value);
    };

    const handleValueVolumeChange = (e) => {
        const currentVolume = parseInt(e.target.value);
        if (currentVolume > 0) videoElement.muted = false;
        setPercentVolumeSlider(() => currentVolume);
        videoElement.volume = currentVolume / 100;
    };

    const handleMuted = () => {
        if (videoElement.muted) {
            setPercentVolumeSlider(lastPercentVolumeSlider);
        } else {
            setLastPercentVolumeSlider(videoElement.volume * 100);
            setPercentVolumeSlider(0);
        }
        videoElement.muted = !videoElement.muted;
    };

    const handleLoadedVideo = () => {
        const duraM = Math.floor(videoElement.duration / 60);
        const duraS = Math.floor(videoElement.duration % 60);
        setDuration(() => videoElement.duration);
        setTimeDuration(() => `${duraM < 10 ? `0${duraM}` : duraM}:${duraS < 10 ? `0${duraS}` : duraS}`);
    };

    const handleTimeUpdate = () => {
        const currentTimeM = Math.floor(videoElement.currentTime / 60);
        const currentTimeS = Math.floor(videoElement.currentTime % 60);
        const percent = (videoElement.currentTime / duration) * 100;
        setCurrentTime(
            () =>
                `${currentTimeM < 10 ? `0${currentTimeM}` : currentTimeM}:${
                    currentTimeS < 10 ? `0${currentTimeS}` : currentTimeS
                }`,
        );
        setPercentDurationSlider(percent);
    };

    const sizeVideo = styles.sizeVideo;

    return (
        <div className={cx('container')} ref={wrapperRef}>
            <div className={cx('video-container')}>
                <video
                    ref={videoRef}
                    className={cx('video-player')}
                    loop
                    muted={true}
                    onLoadedMetadata={handleLoadedVideo}
                    onTimeUpdate={handleTimeUpdate}
                    style={{
                        width: ratioVideo < 1 ? `calc(${sizeVideo}*${ratioVideo})` : '',
                        height: ratioVideo > 1 ? `calc(${sizeVideo}/${ratioVideo})` : '',
                    }}
                >
                    <source src={data.file_url} type="video/mp4" />
                </video>
                <div className={cx('controls')}>
                <button className={cx('btn-play')} onClick={handleBtnPlay}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <div className={cx('volume')}>
                        <VolumeSlider
                            percent={percentVolumeSlider}
                            onValueChange={handleValueVolumeChange}
                            onMuted={handleMuted}
                        />
                    </div>

                    <div className={cx('duration')}>
                        <TrackSlider percent={percentDurationSlider} onValueChange={handleValueTrackChange} />
                        <div className={cx('time')}>
                            {currentTime}/{timeDuration}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('action-icon-container')}>
                <button className={cx('action-icon-btn')}>
                    <span className={cx('heart-icon')}>
                        <HeartIcon />
                    </span>
                    <p className={cx('value')}>{data.likes_count}</p>
                </button>
                <button className={cx('action-icon-btn')}>
                    <span className={cx('comment-icon')}>
                        <CommentIcon />
                    </span>
                    <p className={cx('value')}>{data.comments_count}</p>
                </button>
                <button className={cx('action-icon-btn')}>
                    <span className={cx('share-icon')}>
                        <ShareIcon />
                    </span>
                    <p className={cx('value')}>{data.shares_count}</p>
                </button>
            </div>
        </div>
    );
}

export default VideoPlayer;
