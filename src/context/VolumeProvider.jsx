import { useReducer } from 'react';
import VolumeContext from './VolumeContext';
import VolumeReducer, { initialState } from './VolumeReducer';

function VolumeProvider({ children }) {
    const [state, dispatch] = useReducer(VolumeReducer, initialState);

    return <VolumeContext.Provider value={[state, dispatch]}>{children}</VolumeContext.Provider>;
}

export default VolumeProvider;
