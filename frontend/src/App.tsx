import {useEffect} from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css'
import GoodsTable from "@/components/GoodsTable";
import SignIn from "@/components/SignIn";
import Container from '@mui/material/Container';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/check_session").then(r => {
      if (r.data.message === "error") {
        navigate('/sign_in');
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="lg" sx={{marginTop: 5}}>
        <Routes>
          <Route path="/" element={<GoodsTable />} />
          <Route path="/sign_in" element={<SignIn />} />
        </Routes>
        </Container>
      </header>
    </div>
  )
}

export default App
