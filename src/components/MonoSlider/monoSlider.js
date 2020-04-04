import React from 'react';
import Slider from '@material-ui/core/Slider';

import './monoSlider.css';

export default function monoSlider() {
    const pin = "11";
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState(50);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
      const requestBody = {
        query: `
            mutation LedWrite($pin: String!, $data: String!) {
                ledWrite(order: "W", pin: $pin, data: $data) {
                    pin
                    data
                }
            }
        `,
        variables: {
            pin: pin,
            data: "A" + value
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
      .then(resData => {
        
      })
      .catch(err => {
          throw Error('Dimmer Pin Error');
      })
    }  
    
    return (
        <Slider
          className="slider"
          value={value}
          onChange={handleChange}
          aria-labelledby="continuous-slider"
          min={0}
          max={255}
        />
    )
}