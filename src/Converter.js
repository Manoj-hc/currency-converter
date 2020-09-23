import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Currencies from './Currency';

function Converter({
    currencyList, 
    currencyFrom, 
    currencyTo, 
    currencyFromValue, 
    currencyToValue, 
    error, 
    loadingButton,
    handleCurrencySelection,
    handleInputAmountChange,
    handleCurrencyConversion
  }){
  return (
  <Grid container className="grid-items-converter">

    <Grid item container lg={4} xs={5} sm={4}>
      <Grid item xs={8} >
        <TextField
          className="text-field"
          label="Input Amount"
          onChange={handleInputAmountChange}
          value={currencyFromValue}
          type="number"
          required
        />
      </Grid>
      <Grid item xs={1}/>
      <Grid item xs={8} >
      <FormControl required className="select-items">
        <InputLabel>From</InputLabel>
        <Currencies
          currencyList={currencyList}
          handleCurrencySelection={event => handleCurrencySelection(event,'currencyFrom')}
          value={currencyFrom}
        />
      </FormControl>
    </Grid>

      </Grid>

      <Grid item container lg={4} xs={2} sm={4}>
      <Grid item xs={4} sm={6} className="grid-button">
      {loadingButton 
        ? <div>Converting...</div>
        : !error && !currencyToValue ? <Button 
            variant="contained" 
            className='button'
            fullWidth={true}
            onClick={()=>handleCurrencyConversion()}
          >
            Convert
          </Button>
          : <p className={error ? 'error' : 'result'}>{error}</p>
      }
    </Grid>
    </Grid>

      <Grid item container lg={4} xs={5} sm={4}>
      <Grid item xs={8}>
        <TextField
          className="text-field"
          label="Output Amount"
          onChange={handleInputAmountChange}
          value={currencyToValue}
          type="number"
          required
        />
      </Grid>
      <Grid item xs={1}/>
    <Grid item xs={8}>
      <FormControl required className="select-items">
        <InputLabel>To</InputLabel>
        <Currencies
          currencyList={currencyList}
          handleCurrencySelection={event => handleCurrencySelection(event,'currencyTo')}
          value={currencyTo}
        />
      </FormControl>
    </Grid>
      
      </Grid>
   
     
  </Grid>
  )
}

export default Converter;