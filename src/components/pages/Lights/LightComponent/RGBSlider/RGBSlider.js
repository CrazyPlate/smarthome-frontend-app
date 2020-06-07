import React from 'react';
import { HuePicker } from 'react-color';

import './RGBSlider.css';

class RGBSlider extends React.Component {
  constructor() {
    super();

    this.state = {
      r: null,
      g: null,
      b: null,
      rgbValue: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.RGBswitchOFF = this.RGBswitchOFF.bind(this);
  }
    
      handleChange(color) {
        if (color.rgb.r < 100) {
          if (color.rgb.r < 10) {
            color.rgb.r = "0" + String(color.rgb.r)
          }
            color.rgb.r = "0" + String(color.rgb.r)
        }

        if (color.rgb.g < 100) {
          if (color.rgb.g < 10) {
            color.rgb.g = "0" + String(color.rgb.g)
          }
            color.rgb.g = "0" + String(color.rgb.g)
        }

        if (color.rgb.b < 100) {
          if (color.rgb.b < 10) {
            color.rgb.b = "0" + String(color.rgb.b)
          }
            color.rgb.b = "0" + String(color.rgb.b)
        }
        const rgbValue = ""+color.rgb.r + color.rgb.g + color.rgb.b

        this.setState({
          r: color.rgb.r,
          g: color.rgb.g,
          b: color.rgb.b,
          rgbValue: rgbValue
        });

        this.sendColor();
      };

      RGBswitchOFF() {
        this.setState({
          r: "0",
          g: "0",
          b: "0",
          rgbValue: "000000000"
        });

        this.sendColor();
      }

      sendColor() {
          const requestBody = {
            query: `
              mutation RGBWrite($rgbColor: String!) {
                rgbWrite(RGB: $rgbColor) {
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

        fetch("http://192.168.0.214:4000/graphql", {
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
        .catch(err => {
            console.log(err)
        })
      }

  render() {
    return (
        <div className="huePicker__container">
          <div className="button" onClick={ this.RGBswitchOFF }>SWITCH OFF</div>
          <HuePicker
            onChangeComplete={ this.handleChange }
          />
        </div>);
  }
}

export default RGBSlider;