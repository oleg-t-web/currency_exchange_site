import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import './styles/waitindicator.css';
const WaitIndicator = () => {
  const waitIndicatorVisible = useSelector((state) => state.loadStatus.isLoading);
  return <div className="waitIndicator">{!waitIndicatorVisible && <CircularProgress />}</div>;
};

export default WaitIndicator;
