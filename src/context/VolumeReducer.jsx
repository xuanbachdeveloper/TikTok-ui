import { SET_VOLUME, TURN_OFF_VOLUME, TURN_ON_VOLUME } from './constants';

const initialState = {
    muted: true,
    volume: 0,
    prevVolume: 100,
};

function VolumeReducer(state, action) {
    switch (action.type) {
        case TURN_OFF_VOLUME:
            return {
                muted: true,
                prevVolume: state.volume,
                volume: 0,
            };
        case TURN_ON_VOLUME:
            return {
                muted: false,
                volume: state.prevVolume,
                prevVolume: 0,
            };
        case SET_VOLUME:
            return {
                muted: action.payload === 0,
                volume: action.payload,
                prevVolume: state.volume,
            };

        default:
            throw new Error('Invalid action');
    }
}

export { initialState };

export default VolumeReducer;
