import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopHelper = () => {

    const location = useLocation();
    const [ nowLocal, setLocal ] = useState('');

    if (nowLocal !== location.pathname) {
        setLocal(location.pathname);
        window.scrollTo(0, 0);
    }

    return null;
}

export default ScrollToTopHelper;
