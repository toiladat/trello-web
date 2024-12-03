import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'


function Column() {
  const [anchorEl, setAncorEl] = React.useState(null)
  const open =Boolean(anchorEl)

  const handleClick = ( event ) => {
    setAncorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAncorEl(null)
  }
  return (
    <Box
      sx={{
        minWidth:'300px',
        maxWidth:'300px',
        bgcolor:( theme ) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
        ml:2, //marginleft co spacing =2 =>16px
        borderRadius:'6px',
        height:'fit-content', //fit theo content cua box,
        maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}
    >
      {/* Box header */}
      <Box
        sx={{
          height:(theme) => theme.trello.columnHeaderHeigh,
          p:2,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontSize:'1rem',
            fontWeight:'bold',
            cursor:'pointer'
          }}
        >
          Column title
        </Typography>
        <Box>
          <Tooltip title='More Options'>
            <ExpandMoreIcon
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                color:'text.primary',
                cursor:'pointer'
              }}
            />
          </Tooltip>

          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
          >
            <MenuItem>
              <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
              <ListItemText>Coppy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Box list card */}
      <ListCards/>

      {/* Box footer */}
      <Box
        sx={{
          height:(theme) => theme.trello.columnFooterHeigh,
          p:2,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}
      >
        <Button
          startIcon={<AddCardIcon/>}
        >
          Add new card
        </Button>
        <Tooltip title='Drag to move'>
          <DragHandleIcon sx={{ cursor:'pointer' }}/>
        </Tooltip>
      </Box>

    </Box>
  )
}

export default Column