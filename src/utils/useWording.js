import { useSelector } from 'react-redux';
import { _w } from './wordingSystem';

const useWording = (name) => {
  const { lang } = useSelector(state => state.language);
  const wording = _w(`${lang}.${name}`);

  return wording;
}


export default useWording;