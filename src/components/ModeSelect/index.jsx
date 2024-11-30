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


export default ModeSlect
