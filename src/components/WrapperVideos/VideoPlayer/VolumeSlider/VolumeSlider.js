import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './VolumeSlider.module.scss'
import { VolumeIcon, VolumeOffIcon } from '~/components/Icons'


const cx = classNames.bind(styles)

function VolumeSlider({ percent, onValueChange, onMuted }) {
    const [marginLeft, setMarginLeft] = useState(percent)

    useEffect(() => {
        setMarginLeft(-(percent / 100) * 12 + 6)
    }, [percent])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon')} onClick={onMuted}>
                {percent === 0 ? <VolumeOffIcon /> : <VolumeIcon />}
            </div>
            <div className={cx('progress')}>
                <div style={{ width: `${percent}%` }} className={cx('progress_bar')}></div>
                <div
                    style={{ left: `${percent}%`, marginLeft: `${marginLeft}px` }}
                    className={cx('progress_circle')}
                ></div>
                <input
                    defaultValue={100}
                    type="range"
                    name=""
                    className={cx('range')}
                    onChange={(e) => onValueChange(e)}
                />
            </div>
        </div>
    )
}

VolumeSlider.propTypes = {
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onValueChange: PropTypes.func,
}

export default VolumeSlider
