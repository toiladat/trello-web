import { Button } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
function App() {
  return (
    <>
      <h1>tien dat</h1>
      <Typography variant='body2' color='text.secondary'>Test typographphy</Typography>
      <Button variant="contained">
        <AcUnitIcon sx={{ color: pink[100] }} />
      </Button>
    </>
  )
}

export default App
