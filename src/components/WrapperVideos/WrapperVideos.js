import React, { useEffect, useState } from 'react';
import { typeVideo } from '~/Api/Api.js';
import * as videoService from '~/services/videoService';
import InfiniteScroll from 'react-infinite-scroller';

import VideoItem from './VideoItem/VideoItem';

import classNames from 'classnames/bind';
import styles from './WrapperVideos.module.scss';
import { AniLoadingIcon } from '~/components/Icons';
const cx = classNames.bind(styles);

function WrapperVideos() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const getVideos = async () => {
        const result = await videoService.videosList(typeVideo.forYou, page);
        setData([...data, ...result]);
        setPage(page + 1);
    };

    useEffect(() => {
        getVideos();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('wrapperVideos')}>
            <InfiniteScroll
                className={cx('wrapperrr')}
                pageStart={0}
                hasMore={true || false}
                loadMore={getVideos}
                loader={
                    <div key={0} className={cx('loading-icon')}>
                        <AniLoadingIcon />
                    </div>
                }
            >
                <div className={cx('wrapper-container')}>
                    {data.map((video) => (
                        <VideoItem key={video.id} data={video} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default WrapperVideos;
