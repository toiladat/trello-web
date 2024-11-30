import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
const theme = extendTheme({
  trello:{
    appBarHeight:'58px',
    boardBarHeigh:'60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary:orange
      }
    }
  },
  components:{
    MuiCssBaseline:{
      styleOverrides:{
        body : {
          '*::-webkit-scrollbar':{
            width:'8px',
            height:'8px'
          },
          '*::-webkit-scrollbar-thumb':{
            backgroundColor:'#bdc3c7',
            borderRadius:'8px'
          },
          '*::-webkit-scrollbar-thumb:hover':{
            backgroundColor:'#00b894'
          }
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          textTransform:'none'
        }
      }
    },
    MuiOutlinedInput:{
      styleOverrides:{
        root: ({ theme }) => ({
          color:theme.palette.primary.main,
          fontSize:'0.875rem',
          '.MuiOutlinedInput-notchedOutline':{
            borderColor: theme.palette.primary.light
          },
          '&:hover':{
            '.MuiOutlinedInput-notchedOutline':{
              borderColor: theme.palette.primary.main
            }
          },
          '& fieldset':{
            borderWidth:'1px !important' //border không đậm khi active
          }
        })
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:({ theme }) => ({
          color:theme.palette.primary.main,
          fontSize:'0,875rem'
        })
      }
    },
    MuiSvgIcon:{
      styleOverrides:{
        root:({ theme }) => ({
          color:`${theme.palette.primary.main} !important`
        })
      }
    }
  }
})
export default theme
