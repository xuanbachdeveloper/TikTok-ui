import { SET_VOLUME, TURN_OFF_VOLUME, TURN_ON_VOLUME } from './constants'

export const turnOffVolume = () => ({
    type: TURN_OFF_VOLUME,
})
export const turnOnVolume = () => ({
    type: TURN_ON_VOLUME,
})
export const setVolume = (percent) => ({
    type: SET_VOLUME,
    payload: percent,
})
