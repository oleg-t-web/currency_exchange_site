import { CircularProgress } from '@mui/material';

import './styles/waitindicator.css';
const WaitIndicator = () => {
  return (
    <div className="waitIndicator">
      <CircularProgress />
    </div>
  );
};

export default WaitIndicator;
