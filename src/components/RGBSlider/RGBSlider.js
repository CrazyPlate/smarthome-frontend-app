import React from 'react';
import {HuePicker } from 'react-color';

class RGBSlider extends React.Component {
    state = {
        background: '#fff',
      };
    
      handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
        console.log(color.rgb)
      };

  render() {
    return (
        <HuePicker
            {...this.props}
            onChange={ this.handleChangeComplete }
        />);
  }
}

export default RGBSlider;