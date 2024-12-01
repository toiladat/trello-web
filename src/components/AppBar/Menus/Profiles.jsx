import Box from '@mui/material/Box'
import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

function Profiles() {
  const [anchorEl, setAncorEl] = React.useState(null)
  const open =Boolean(anchorEl)

  const handleClick = ( event ) => {
    setAncorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAncorEl(null)
  }
  return (
    <Box>

      <Tooltip title="Account settings" 
        id="demo-positioned-button-profiles"
        aria-controls={open ? 'demo-positioned-menu-profiles' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 34, height: 34 }}>M</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}

      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{marginRight:'10px' }} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles