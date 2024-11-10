import { Button } from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'

import { useColorScheme } from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
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
