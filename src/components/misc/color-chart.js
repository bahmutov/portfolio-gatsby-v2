import React, { useState } from 'react'
import { default as Chart } from 'react-color-contrast-table'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { colors as themeColors } from '../../config/colors'
import './color-chart.scss'

// I really don't love this, but whatever I guess.
// TODO can this get moved into context if its need other places?
let noJs
if (typeof window === 'undefined') {
  noJs = true
}

const ColorChart = props => {

  const { editable } = props

  const setCssColor = (colorName, colorValue) => {
    document.documentElement.style
    .setProperty(`--${colorName}`, colorValue)
  }


  const [colors, setColors] = useState(
    Object.entries(themeColors).map(color => {
      const [name, value] = color
      return { name: name, value: value}
    })
  )

  const handleInputChange = index => event => {
    const newColors = [...colors]
    const name = event.target.name
    const value = event.target.value
    newColors[index] = {name: name, value: value}
    setColors(newColors)
    setCssColor(name, value)
  }
  
  return (
    <section className='color-chart'>
      {editable &&
        <div className='color-chart__inputs'>
          {colors.map((color, index) => (
            <EditColor 
              key={index}
              index={index}
              {...color}
              onChange={handleInputChange}
            />
          ))}
        </div>
      }
      <div 
        className={cx(
          'color-chart__table',
          editable && 'color-chart__table--editable'
        )}
      >
        <Chart 
          defaultStyles
          colors={colors}
        />
      </div>
    </section>
  )
}

const EditColor = props => {
  const {
    name,
    value,
    index,
    onChange
  } = props
  
  return(
    <div className='color-chart__input'>
      <label htmlFor={name} className='color-chart__input-label'>
        <span className='color-chart__input-label--name'>{name}</span>
        <span className='color-chart__input-label--value'>{value}</span>
      </label>
      <input
        type='color'
        id={name}
        name={name}
        value={value}
        onChange={onChange(index)}
        disabled={noJs}
      />
    </div>
  )
}

ColorChart.propTypes = {
  editable: PropTypes.bool,
}

EditColor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ColorChart
