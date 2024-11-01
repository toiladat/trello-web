
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode:'light', //light is default
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    text: {
      secondary: '#19857b'
    }
  }
})

export default theme
