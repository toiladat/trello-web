import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
const theme = extendTheme({
  trello:{
    appBarHeight:'58px',
    boardBarHeigh:'60px'
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary:orange
    //   }
    // }
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
            backgroundColor:'#dcdde1',
            borderRadius:'8px'
          },
          '*::-webkit-scrollbar-thumb:hover':{
            backgroundColor:'white'
          }
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          textTransform:'none',
          borderWidth:'0.5px',
          '&:hover':{
            borderWidth:'2px'
          }
        }
      }
    },
    MuiOutlinedInput:{
      styleOverrides:{
        root: ({ theme }) => ({
          // color:theme.palette.primary.main,
          fontSize:'0.875rem',
          // '.MuiOutlinedInput-notchedOutline':{
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover':{
          //   '.MuiOutlinedInput-notchedOutline':{
          //     borderColor: theme.palette.primary.main
          //   }
          // },
          '& fieldset':{
            borderWidth:'0.5px !important' //border không đậm khi active
          },
          '&:hover fieldset':{
            borderWidth:'2px !important' //border không đậm khi active
          },
          '&.Mui-focused fieldset':{
            borderWidth:'2px !important' //border không đậm khi active
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
    // MuiSvgIcon:{
    //   styleOverrides:{
    //     root:({ theme }) => ({
    //       color:`${theme.palette.primary.main} !important`
    //     })
    //   }
    // }
  }
})
export default theme
