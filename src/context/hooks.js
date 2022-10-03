import { useContext } from 'react';
import VolumeContext from './VolumeContext';

export const useVolumeStore = () => {
    const [state, dispatch] = useContext(VolumeContext);

    return [state, dispatch];
};
