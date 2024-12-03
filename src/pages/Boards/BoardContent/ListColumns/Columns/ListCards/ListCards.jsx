import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {

  return (
    <Box
      sx={{
        p:'0 5px', //trick scroll bar column
        m:'0 5px',
        display:'flex',
        flexDirection:'column',
        gap:1,
        overflowX:'hidden',
        overflowY:'auto',
        maxHeight:(theme) => `calc( ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeigh} - ${theme.trello.columnFooterHeigh})`,
        '&::-webkit-scrollbar-thumb':{
          backgroundColor:'#ced0da',
          borderRadius:'8px'
        },
        '&::-webkit-scrollbar-thumb:hover':{
          backgroundColor:'#bfc2cf'
        }
      }}
    >
      <Card/>
      <Card temporaryHidenMedia/>


    </Box>
  )
}

export default ListCards