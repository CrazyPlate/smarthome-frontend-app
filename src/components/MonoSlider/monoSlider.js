import React from 'react';
import Slider from '@material-ui/core/Slider';

import './monoSlider.css';

export default function monoSlider() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState(50);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };    
    
    return (
        <Slider
          className="slider"
          value={value}
          onChange={handleChange}
          aria-labelledby="continuous-slider"
        />
    )
}