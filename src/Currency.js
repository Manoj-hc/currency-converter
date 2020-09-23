import React from 'react';
import Select from '@material-ui/core/Select';

function Currencies({currencyList, handleCurrencySelection, value}){
  const showCurrencyList = () => 
    currencyList.map((currency,index)=>
      <option 
        key={currency+index} 
        value={currency}
        >
        {currency}
        </option>
  )
  return (
    <Select
      native
      value={value}
      onChange={handleCurrencySelection}
    >
    {showCurrencyList()}
    </Select>
  )
}

export default Currencies;