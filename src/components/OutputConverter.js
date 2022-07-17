import { Box, TextField } from '@mui/material';
const OutputConverter = ({ inputValueCaption, inputVal, convertionResStr }) => {
  return (
    <div>
      <Box className="inputField">
        <TextField
          inputProps={{ 'data-testid': 'amountInput' }}
          label={inputValueCaption}
          value={inputVal.amount}
          variant="standard"
          onChange={(e) => {
            inputVal.onAmountChange(e.target.value);
          }}
          size="small"
        />
      </Box>
      <p data-testid="conversionResStr"> {convertionResStr}</p>
    </div>
  );
};

export default OutputConverter;
