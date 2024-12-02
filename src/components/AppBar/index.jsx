import ModeSlect from '~/components/ModeSelect'
import Box from '@mui/material/Box'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import { ReactComponent as trelloLogo } from '~/assets/mdi--trello.svg'
import { useState } from 'react'
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar() {
  const [searchValue, setSearchValue]=useState('')
  return (
    <Box px={2} sx={{
      width:'100%',
      height:( theme ) => theme.trello.appBarHeight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:2,
      overflowX:'auto',
      bgcolor:(theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
      '&::-webkit-scrollbar-track':{
        m:2
      }
    }}>
      <Box sx={{
        display:'flex',
        alignItems:'center',
        gap:2
      }}>
        <AppRegistrationIcon sx={{
          color:'white'
        }}/>
        <Box sx={{
          display:'flex',
          alignItems:'center',
          gap:0.5
        }}>
          <SvgIcon component={trelloLogo} fontSize='small' sx={{
            color:'white'
          }}/>
          <Typography variant='span' sx={{ fontSize: '1.3rem', fontWeight:'bold', color:'white' }}>Trello</Typography>
        </Box>

        <Box sx={{ display:{ xs:'none', md:'flex' }, gap:1 }}>
          <Workspaces/>
          <Recent/>
          <Starred/>
          <Template/>

          <Button
            variant='outlined'
            startIcon={<LibraryAddIcon/>}
            sx={{
              color:'white',
              border: 'none',
              '&:hover':{
                border:'none'
              }
            }}
          >
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{
        display:'flex',
        alignItems:'center',
        gap:2
      }}>
        <TextField
          id="outlined-basic"
          label="Search..."
          size='small'
          variant="outlined"
          type='text'
          value={searchValue}
          onChange={( e ) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ color:'white' }} position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment:(
              <CloseIcon
                sx={{ color:searchValue ? 'white' : 'transparent', fontSize:'', cursor:'pointer' }}
                onClick={ ( ) => setSearchValue('') }
              />
            )
          }}
          sx={{
            minWidth:'120px',
            maxWidth:'170px',
            '& label':{
              color:'white'
            },
            '& input':{
              color:'white'
            },
            '& label.Mui-focused':{
              color:'white'
            },
            '& .MuiOutlinedInput-root':{
              '& fieldset':{
                borderColor:'white'
              },
              '&:hover fieldset':{
                borderColor:'white'
              },
              '&.Mui-focused fieldset':{
                borderColor:'white'
              }
            }

          }}
        />

        <ModeSlect/>

        <Tooltip title="Notifications">
          <Badge color="warning" sx={{ cursor:'pointer', color:'white' }} variant="dot" invisible={false}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color:'white' }} />
        </Tooltip>

        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar
