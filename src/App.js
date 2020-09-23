import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Converter from './Converter';
import Loading from './Loading';
import './style.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currencyList: [],
      currencyFrom: '',
      currencyTo: '',
      currencyFromValue: '',
      currencyToValue: '',
      error:'',
      loadingFullWidth: true,
      loadingButton: false,
    };
  }

  componentDidMount() {
    fetch('https://f5ce9ab0-b6b3-4118-b6f2-cdf0a94b80a7.mock.pstmn.io/v1/currency-rate')
      .then(function (response) {
        return response.json();
      })
      .then(responseJson => {
        let rates = responseJson.rates;
        const currencyList = [];
        for(let data in rates){
          currencyList.push(rates[data].currency);
        }
        
        const updatedCurrenyList = currencyList.slice(0);
        updatedCurrenyList.unshift(responseJson.base);
        updatedCurrenyList.unshift('');
        this.setState({
          currencyList: updatedCurrenyList,
          loadingFullWidth: false,
        })
      })
      .catch(error=> console.log(error));
   
  }

  handleCurrencySelection = (value, label) => {
    this.setState({
      [label]: value,
      error: '',
      currencyToValue: '',
    })
  }

  handleInputAmountChange = value => 
    this.setState({ 
      currencyFromValue: value,
      error: '', 
      currencyToValue: '',
    });

  handleCurrencyConversion = () => {
    const {
      currencyFrom, 
      currencyTo, 
      currencyFromValue, 
    } = this.state;

    if(!currencyFrom || !currencyTo || !currencyFromValue){
      this.setState({
        error: 'Invalid details',
      })
      return '';
    }
    if(currencyFrom === currencyTo){
      this.setState({
        error: 'Cannot have same currencies',
      })
      return '';
    }

    this.setState({
      loadingButton: true,
    })

    fetch('https://f5ce9ab0-b6b3-4118-b6f2-cdf0a94b80a7.mock.pstmn.io/v1/currency-rate')
      .then(function (response) {
        return response.json();
      })
      .then(data => {
        let count = 0;
        const rates = data.rates;
        rates.push({"currency":data.base, "rate":"1"})
        let toRate = 0, fromRate = 0;
        for(let item in rates){
          if(currencyFrom === rates[item].currency){
            fromRate = rates[item].rate;
            count++;
          }
          else if(currencyTo === rates[item].currency){
            toRate = rates[item].rate;
            count++;
          }
          if(count === 2)
            break;
        }
        const result = Math.ceil(toRate/fromRate * currencyFromValue * 1000) / 1000;
     
        this.setState({
          currencyToValue: result,
          loadingButton: false,
        })
        
      })
      .catch(error => console.log(error));
  }

  render() {
    const { 
      loadingFullWidth,
    } = this.state;
    return (
      <div>
        {loadingFullWidth ? <Loading /> 
        : (<div>
            <Grid container>
              <Grid item container lg={12} xs={12} sm={12}>
                <Grid item xs={12} className="data">
                  <Paper>
                  <h3 className="main">Currency Converter </h3>
                  <Converter 
                    {...this.state} 
                    handleCurrencySelection={(event,label) => this.handleCurrencySelection(event.target.value, label)}
                    handleInputAmountChange={event => this.handleInputAmountChange(event.target.value)}
                    handleCurrencyConversion={this.handleCurrencyConversion}
                  />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )
      }
      </div>
    );
  }
}

export default App;
