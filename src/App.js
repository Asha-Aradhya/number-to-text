import React from 'react';
import Output from './components/output';
import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputvalue: '',
      outputvalue: '',
      errormessage: 'No number entered'
    }
  }

  //This method is called when any data is entered into text box
  setvalue = (val) => {
    (+val > 0 && !isNaN(val)) ? this.checkForMaxNumber(val) : this.handleInvalidData(val);
  }
  //This method validates the data for any string/special characters and zero
  handleInvalidData(val) {
    let err = '';
    if (val === '0') {
      this.setState({ inputvalue: val, outputvalue: 'Zero', errormessage: "" });
    } else {
      err = (val === "") ? "No number entered" : "Please enter a +ve integer";
      this.setState({ inputvalue: val, errormessage: err });
    }
  }
  //check if the number entered is bigger than sextillion
  checkForMaxNumber(val) {
    let len = val.length;
    let inputval = +val;    
    let arr = [];
    while (val) {
      arr.push(val % 1000);
      val = parseInt(val / 1000, 10);
    }
    if (len > 5) {
      this.setState({ inputvalue: val, errormessage: "Number greater than 99,999 is not supported" });
    } else {
      this.convertNumberToText(inputval, arr)
    }
  }

  convertNumberToText(val,arr) {
    let onesOrhundrends;
    let tensOrones;
    let digitsToWords = {
      ones: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
      tens: ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
      int_sys: ['', ' thousand ']
    };
    let finalvalue = '';

    arr.forEach((item, i) => {
      let hundreds = Math.floor(item / 100);
      let tens = Math.floor(item / 10) % 10;
      let singleno = item % 10;

      if (tens === 0 && singleno === 0) {
        onesOrhundrends = (hundreds > 0 ? digitsToWords.ones[hundreds] + ' hundred ' : '');
      } else {
        onesOrhundrends = (hundreds > 0 ? digitsToWords.ones[hundreds] + ' hundred and ' : '');
      }
      if (tens >= 2) {
        tensOrones = (singleno !== 0) ? tensOrones = digitsToWords.tens[tens] + '-' + digitsToWords.ones[singleno] : tensOrones = digitsToWords.tens[tens] + '' + digitsToWords.ones[singleno];
      } else {
        tensOrones = digitsToWords.ones[10 * tens + singleno];
      }
      finalvalue = onesOrhundrends + tensOrones + digitsToWords.int_sys[i] + finalvalue;
    });
    this.setState({ inputvalue: val, outputvalue: finalvalue, errormessage: "" });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h2>Application for coverting number to  English-language representation</h2>
        </header>
        <section className="body">
          <form>
            <label>Enter the number:</label><br /><br />
            <input id="inVal" type="text"
              val={this.state.inputvalue}
              onChange={e => this.setvalue(e.target.value)} pattern="[0-9]" /><br /><br />
            <div className={this.state.errormessage ? 'show' : 'hide'}>{this.state.errormessage}</div>
            <Output inputvalue={this.state.inputvalue} outputvalue={this.state.outputvalue} />
          </form>
        </section>
      </div>
    );
  }
}

export default App;
