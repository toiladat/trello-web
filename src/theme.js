import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

const APP_BAR_HEIGHT='58px'
const BOARD_BAR_HEIGHT='60px'
const BOARD_CONTENT_HEIGHT=`calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const COLUMN_HEDER_HEIGH='50px'
const COLUMN_FOOTER_HEIGH='56px'

const theme = extendTheme({
  trello:{
    appBarHeight:APP_BAR_HEIGHT,
    boardBarHeigh:BOARD_BAR_HEIGHT,
    boardContentHeight:BOARD_CONTENT_HEIGHT,
    columnHeaderHeigh:COLUMN_HEDER_HEIGH,
    columnFooterHeigh:COLUMN_FOOTER_HEIGH
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
          fontSize:'0.875rem'
        })
      }
    },
    MuiTypography:{
      styleOverrides:{
        root:{
          '&.MuiTypography-body1':{
            fontSize:'0.875rem'
          }
        }
      }
    }
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
