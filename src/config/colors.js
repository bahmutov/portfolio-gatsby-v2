const colors = {
  // colorPrimary: '#192368',
  // colorDark: '#1e053f',
  // colorLight: '#fff7ff',
  // colorHighlight: '#7c1863',
  // colorActive: '#ed6554',
  // colorDisabled: '#2f323a'
  colorDark: '#0f0f0f',
  colorLight: '#ffffff',
  colorPrimary: 'rebeccapurple',
  // colorActive: 'rebeccapurple',
  // colorHighlight: 'rebeccapurple',
  colorDisabled: '#78757a'
}

const cssVars = Object.entries(colors).map(color => {
  const [name, value] = color
  return `--${name}: ${value};`
}).join('\n')

export { colors, cssVars }