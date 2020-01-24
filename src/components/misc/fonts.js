import React, { useState } from 'react'

const Fonts = props => {

  const Font = props => {
    const [text, setText] = useState('The Five Boxing Wizards Jump Quickly');
    const [styleOptions, setStyleOptions] = useState({});

    const handleTextChange = event => setText(event.target.value)
    const handleStyleOptionChange = event => setStyleOptions({ ...styleOptions, [event.target.name]: event.target.value })

    const fontVariationSettings = Object.entries(styleOptions).map(option => {
      return `"${option[0]}" ${option[1]}`
    }).join(', ')

    const inputStyle = { 
      width: '100%',
      height: 'auto',
      padding: '.5em 0',
      border: '0',
      fontSize: '2.5em',
      lineHeight: '1.25',
      fontFamily: props.name,
      fontVariationSettings: fontVariationSettings
    }

    return (
      <section style={{marginBottom: '1rem'}}>

        <header><a href={props.url}>{props.name}</a></header>

        <textarea style={inputStyle} wrap="hard" value={text} onChange={handleTextChange}/>
        
        {Object.entries(props.options).map((option, index) => {
          const [name, [min, max]] = option
          return(
            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
              <label htmlFor={name} style={{marginRight: '1em'}}>{name}</label>
              <input type='range' id={name} name={name} min={min} max={max} onChange={handleStyleOptionChange} />
            </div>
          )
        })}
      </section>
    )
  }

  return (
    props.fonts.map((font,index) => {
      return (
        <Font key={index} {...font} />
      )
    })
  )
}

export default Fonts
