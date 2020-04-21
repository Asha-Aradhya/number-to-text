import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Output from './components/output';

describe('quantity input', () => {
  let props = {
    inputvalue:'',
    outputvalue:''
  };
  let wrapper;
  let wrapperoutput
  beforeEach(()=>{
    wrapper = shallow(<App />);
  })
  it('If the input is 1, the page should output “one”', () => {
    wrapper.find('#inVal').simulate('change',{target: {value:1}});
    expect(wrapper.state('outputvalue')).toBe('one');
  });
  it('If the input is 722, the page should output “seven hundred and twenty-two”', () => {
    wrapper.find('#inVal').simulate('change',{target: {value:722}});
    expect(wrapper.state('outputvalue')).toBe('seven hundred and twenty-two');
  });
  it('If the input is not a number, the input should be refused', () => {
    wrapper.find('#inVal').simulate('change',{target: {value:'veri'}});
    expect(wrapper.state('errormessage')).toBe('Please enter a +ve integer');
  });
  it('If the input is negative, the page should show an error', () => {
    wrapper.find('#inVal').simulate('change',{target: {value:-123}});
    expect(wrapper.state('errormessage')).toBe('Please enter a +ve integer');
  });
  it('Test Output component for props value "outputvalue"', () => { 
    wrapper.find('#inVal').simulate('change',{target: {value:777}});       
    wrapperoutput = wrapper.find(Output);
    expect(wrapperoutput.props().outputvalue).toBe("seven hundred and seventy-seven");
  });
  it('Test for the value zero', () => { 
    wrapper.find('#inVal').simulate('change',{target: {value:'0'}});       
    wrapperoutput = wrapper.find(Output);
    expect(wrapperoutput.props().outputvalue).toBe("Zero");;
  });  
  it('Number great than 100000', () => { 
    wrapper.find('#inVal').simulate('change',{target: {value:'100000'}});       
    expect(wrapper.state('errormessage')).toBe("Number greater than 99,999 is not supported");;
  });
  it('Test Output component for props value "inputvalue"', () => { 
    wrapper.find('#inVal').simulate('change',{target: {value:12345}});       
    wrapperoutput = wrapper.find(Output);
    expect(wrapperoutput.props().inputvalue).toBe(12345);;
  });
  it('Test output component classname show', () => { 
    wrapper.find('#inVal').simulate('change',{target: {value:12345}});       
    wrapperoutput = shallow(<Output {...props}/>);
    expect(wrapperoutput.hasClass('show'));
  });
  it('Test output component classname hide', () => { 
    wrapper.find('#inVal').simulate('change',{target: {value:''}});       
    wrapperoutput = shallow(<Output {...props}/>);
    expect(wrapperoutput.hasClass('hide'));
  });
});