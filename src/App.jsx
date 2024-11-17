
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutLineIcon from '@mui/icons-material/DarkModeOutlined'
import SettingBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { useColorScheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
function ModeSlect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectedMode= event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-ligh-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-ligh-mode"
        id="select-dark-ligh-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value={'light'}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <LightModeIcon fontSize='smail'/> Light
          </div>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={{ display:'flex', alignItems:'center', gap: 1 }}>
            <DarkModeOutLineIcon fontSize='smail'/> Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={{ display:'flex', alignItems:'center', gap: 1 }}>
            <SettingBrightnessIcon fontSize='smail'/> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}


function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <Box sx={{
        backgroundColor:'primary.light',
        width:'100%',
        height:( theme ) => theme.trello.appBarHeight,
        display:'flex',
        alignItems:'center'
      }}>
        <ModeSlect/>
      </Box>
      <Box sx={{
        backgroundColor:'primary.dark',
        width:'100%',
        height:( theme ) => theme.trello.boardBarHeigh,
        display:'flex',
        alignItems:'center'
      }}>        Board Bar
      </Box>
      <Box sx={{
        backgroundColor:'primary.main',
        width:'100%',
        height:( theme ) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeigh})`,
        display:'flex',
        alignItems:'center'
      }}>        Board Content
      </Box>
    </Container>
  )
}

export default App
