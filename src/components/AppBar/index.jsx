import ModeSlect from '~/components/ModeSelect'
import Box from '@mui/material/Box'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import { ReactComponent as trelloLogo } from '~/assets/mdi--trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Template from './Menus/Template'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'

function AppBar() {
  return (
    <Box px={2} sx={{
      width:'100%',
      height:( theme ) => theme.trello.appBarHeight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between'
    }}>
      <Box sx={{
        display:'flex',
        alignItems:'center',
        gap:2
      }}>
        <AppRegistrationIcon sx={{
          color:'primary.main'
        }}/>
        <Box sx={{
          display:'flex',
          alignItems:'center',
          gap:0.5
        }}>
          <SvgIcon component={trelloLogo} fontSize='small' sx={{
            color:'primary.main'
          }}/>
          <Typography variant='span' sx={{ fontSize: '1.3rem', fontWeight:'bold', color:'primary.main' }}>Trello</Typography>
        </Box>

        <Workspaces/>
        <Recent/>
        <Starred/>
        <Template/>

        <Button variant='outlined'>Create</Button>
      </Box>

      <Box sx={{
        display:'flex',
        alignItems:'center',
        gap:2
      }}>
        <TextField id="outlined-basic" label="Search..." size='small' variant="outlined" />

        <ModeSlect/>

        <Tooltip title="Notifications">
          <Badge color="secondary" sx={{ cursor:'pointer' }} variant="dot" invisible={false}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon />
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar
