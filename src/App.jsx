import { Button } from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutLineIcon from '@mui/icons-material/DarkModeOutlined'
import SettingBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { useColorScheme } from '@mui/material/styles'

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


function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const preferLightMode = useMediaQuery('(prefers-color-scheme: light)')
  // console.log(preferLightMode, prefersDarkMode)

  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}
function App() {
  return (
    <>
      <ModeSlect/>
      <hr />
      <ModeToggle/>
      <hr />
      <h1>tien dat</h1>
      <Typography variant='body2' color='text.secondary'>Test typographphy</Typography>
      <Button variant="contained">
        <AcUnitIcon sx={{ color: pink[100] }} />
      </Button>
    </>
  )
}

export default App
