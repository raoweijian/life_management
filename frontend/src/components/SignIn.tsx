import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import Checkbox from '@mui/material/Checkbox';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from "@mui/material/TextField";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    axios.post("/api/sign_in", formData).then(response => {
      const {data} = response;
      if (data.message === "ok") {
        navigate("/");
      } else {
        setError(data.message);
      }
    })
    .catch(_e => {
      setError("登录失败");
    });
  }

  return (
    <Box sx={{display: "inline-block"}}>
      <Card sx={{width: 400}}>
        <Box sx={{marginLeft: 4, marginRight: 4, marginTop: 1, marginBottom: 2}}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  label="账号"
                  type="email"
                  variant="standard"
                  value={formData.username}
                  onChange={event => setFormData({...formData, username: event.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  label="密码"
                  type="password"
                  variant="standard"
                  value={formData.password}
                  onChange={event => setFormData({...formData, password: event.target.value})}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
            <Grid container direction="row" justifyContent="center">
              <Button color="primary" variant="contained" onClick={onSubmit}>
                登录
              </Button>
            </Grid>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
}
