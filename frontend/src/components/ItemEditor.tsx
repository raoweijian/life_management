import { useState, useEffect } from "react";
import { useMutation, gql } from '@apollo/client';

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
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

import {Item} from "@/components/GoodsTable";

export type UpdateType = "amount" | "speed";

export default function ItemEditor({
  open,
  item,
  onClose,
}: {
  open: boolean,
  item: Item | null,
  onClose: () => void,
}) {
  const NEW_ITEM: Item = {
    id: 0,
    name: "",
    amountLogged: 0,
    amountLoggedAt: "",
    consumeSpeed: 0,
  };
  const [formData, setFormData] = useState<Item>(item || NEW_ITEM);

  useEffect(() => {
    setFormData(item || NEW_ITEM);
  }, [item, open]);

  const [updateType, setUpdateType] = useState<UpdateType>("amount");
  const [autoCalculate, setAutoCalculate] = useState(false);

  const updateField = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  const mutation = gql`
    mutation UpsertItem($dbid: Int!, $name: String!, $amountLogged: Int!, $consumeSpeed: Float!, $updateType: String!, $autoCalculate: Boolean!) {
      upsertItem(
      dbid: $dbid,
      name: $name,
      amountLogged: $amountLogged,
      consumeSpeed: $consumeSpeed,
      updateType: $updateType,
      autoCalculate: $autoCalculate,
      ) {
        item {
          id
        }
      }
    }
  `;

  const [onSubmit, { data, loading, error }] = useMutation(mutation, {
    variables: {
      dbid: formData.id,
      name: formData.name,
      amountLogged: formData.amountLogged,
      consumeSpeed: formData.consumeSpeed,
      updateType,
      autoCalculate,
    },
    onCompleted: onClose,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box sx={{marginLeft: 4, marginRight: 4, marginTop: 1, width: 400, minHeight: 400}}>
          <Grid container spacing={2} columnSpacing={10} direction="column" justifyContent="center">
            <Grid item columns={10}>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                label="????????????"
                type="email"
                variant="standard"
                value={formData.name}
                onChange={event => updateField("name", event.target.value)}
              />
            </Grid>

            <Grid item columns={10}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">??????????????????</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={updateType}
                  onChange={event => setUpdateType(event.target.value as UpdateType)}
                >
                  <FormControlLabel value="amount" control={<Radio />} label="????????????" />
                  <FormControlLabel value="speed" control={<Radio />} label="????????????" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {updateType === "amount" ? (
              <>
                <Grid item columns={10}>
                  <TextField
                    fullWidth
                    label="????????????"
                    type="number"
                    variant="standard"
                    value={formData.amountLogged}
                    onChange={event => updateField("amountLogged", parseInt(event.target.value))}
                  />
                </Grid>
                <Grid item columns={10}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autoCalculate}
                          onChange={event => setAutoCalculate(event.target.checked)}
                        />
                      }
                      label="????????????????????????"
                    />
                  </FormGroup>
                </Grid>
              </>
            ) : (
              <Grid item columns={10}>
                <TextField
                  fullWidth
                  id="outlined-number"
                  label="????????????(??????)"
                  type="number"
                  variant="standard"
                  value={formData.consumeSpeed}
                  onChange={event => updateField("consumeSpeed", parseFloat(event.target.value))}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <Box sx={{marginRight: 3, marginBottom: 2}}>
        <DialogActions>
          <Button onClick={onClose}>??????</Button>
          <Button
            variant="contained"
            onClick={() => onSubmit({
              variables: {
                ...formData,
                dbid: formData.id,
                updateType,
                autoCalculate,
              }
            })}
          >
            ??????
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
