import './App.css'
import GoodsTable from "@/components/GoodsTable";
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="lg" sx={{marginTop: 5}}>
          <GoodsTable/>
        </Container>
      </header>
    </div>
  )
}

export default App
