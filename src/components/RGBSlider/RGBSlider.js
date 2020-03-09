import React from 'react';
import { HuePicker } from 'react-color';

import './RGBSlider.css';

class RGBSlider extends React.Component {
    state = {
        r: null,
        g: null,
        b: null,
        rgbValue: null
      };
    
      handleChange = (color) => {
        if (color.rgb.r < 100) {
          if (color.rgb.r < 10) {
            color.rgb.r = "00" + color.rgb.r
          } else {
            color.rgb.r = "0" + color.rgb.r
          }
        }

        if (color.rgb.g < 100) {
          if (color.rgb.g < 10) {
            color.rgb.g = "00" + color.rgb.g
          } else {
            color.rgb.g = "0" + color.rgb.g
          }
        }

        if (color.rgb.b < 100) {
          if (color.rgb.b < 10) {
            color.rgb.b = "00" + color.rgb.b
          } else {
            color.rgb.b = "0" + color.rgb.b
          }
        }

        this.setState({
          r: color.rgb.r,
          g: color.rgb.g,
          b: color.rgb.b,
          rgbValue: ""+this.state.r + this.state.g + this.state.b
        });

          const requestBody = {
              query: `
                  mutation RGBWrite($rgbColor: String!) {
                      rgbWrite(rgbColor: $rgbColor) {
                          r
                          g
                          b
                      }
                  }
              `,
              variables: {
                rgbColor: this.state.rgbValue
              }
          }
  
          fetch("http://192.168.1.214:4000/graphql", {
             method: "POST",
             body: JSON.stringify(requestBody),
             headers: {
                "Content-Type": "application/json",
             },
          })
          .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                  throw new Error("Failed!");
              }
              return res.json();
          })
          .then(resData => {
              
          })
          .catch(err => {
              throw Error('RGB Error');
          })
      };

  render() {
    return (
        <div className="huePicker__container">
          <HuePicker
            onChange={ this.handleChange }
          />
        </div>);
  }
}

export default RGBSlider;