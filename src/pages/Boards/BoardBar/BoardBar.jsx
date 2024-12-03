import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterIcon from '@mui/icons-material/Filter'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
function BoardBar() {
  const MENU_STYLE = {
    color:'white',
    bgcolor:'transparent',
    border:'none',
    paddingX:'5px',
    borderRadius: '5px',
    '.MuiSvgIcon-root':{
      color:'white'
    },
    '&:hover':{
      bgcolor:'primary.50'
    }
  }
  return (
    <Box sx={{
      paddingX:2,
      width:'100%',
      height:( theme ) => theme.trello.boardBarHeigh,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:2,
      overflowX:'auto',
      borderBottom:'1px solid white',
      bgcolor:( theme ) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      '&::-webkit-scrollbar-track':{
        m:2
      }
    }}>

      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap:2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon/>} label="TienDatCode"
          clickable// or onclick
          onClick= {( ) => { }}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon/>} label="Public/Private Workspaces"
          clickable// or onclick
          onClick= {( ) => { }}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon/>} label="Add to Google Drive"
          clickable// or onclick
          onClick= {( ) => { }}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon/>} label="Automation"
          clickable// or onclick
          onClick= {( ) => { }}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<FilterIcon/>} label="Filters"
          clickable// or onclick
          onClick= {( ) => { }}
        />
      </Box>

      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon/>}
          sx={{
            color:'white',
            borderColor:'white',
            '&:hover':{
              borderColor:'white'
            }
          }}
        >
          invite
        </Button>

        <AvatarGroup
          max={1}
          total={ 1 }
          sx={{
            gap:'10px',
            '& .MuiAvatar-root':{
              width:'34px',
              height:'34px',
              fontSize:'16px',
              border:'none',
              color:'white',
              cursor:'pointer',
              '&:first-of-type':{
                bgcolor:'#a4b0be'
              }
            }
          }}>
          <Tooltip title='TienDatCode'>
            <Avatar alt="Đ" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>

      </Box>
    </Box>
  )
}

export default BoardBar
