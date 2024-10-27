import { Button } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { pink } from "@mui/material/colors";
function App() {
  
  return (
    <>
      <h1>tien dat</h1>
      <Button variant="contained">
        <AcUnitIcon sx={{ color: pink[100] }} />
      </Button>
    </>
  );
}

export default App;
