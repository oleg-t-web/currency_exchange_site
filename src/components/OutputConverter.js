import React from 'react';
import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const OutputConverter = React.memo(
  ({ inputValueCaption, inputValue, handleInputChange, convertionResStr }) => {
    return (
      <div>
        <Box className="inputField">
          <TextField
            inputProps={{ 'data-testid': 'amountInput' }}
            label={inputValueCaption}
            value={inputValue}
            variant="standard"
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
            size="small"
          />
        </Box>
        <p data-testid="conversionResStr"> {convertionResStr}</p>
      </div>
    );
  }
);

OutputConverter.propTypes = {
  inputValueCaption: PropTypes.string,
  inputValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  convertionResStr: PropTypes.string
};
OutputConverter.displayName = 'OutputConverter';
OutputConverter.whyDidYouRender = true;

export default OutputConverter;
