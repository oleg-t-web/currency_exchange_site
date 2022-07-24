import { useSelector } from 'react-redux';

const useLoadIndicator = () => {
  return useSelector((state) => state.loadStatus);
};

export default useLoadIndicator;
