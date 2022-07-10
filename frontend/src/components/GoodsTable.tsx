import { useState } from "react";

import moment from "moment";
import { useQuery, useMutation, gql } from '@apollo/client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import ItemEditor from "@/components/ItemEditor";

export interface Item {
  id: number;
  name: string;
  amountLogged: number;
  amountLoggedAt: string;
  consumeSpeed: number;
}

function calculateRemanent(
  amountLogged: number,
  amountLoggedAt: string,
  consumeSpeed: number,
): string {
  const now = moment();
  const duration = moment.duration(now.diff(moment(amountLoggedAt)));
  const hours = duration.asHours();
  const amountConsumed = consumeSpeed * hours / 24;
  return (amountLogged - amountConsumed).toFixed(2);
}

export default function BasicTable() {
  const [editing, setEditing] = useState(false);
  const [itemEditing, setItemEditing] = useState<Item | null>(null);
  const query = gql`
    query GetItems {
      items {
        id
        name
        amountLogged
        amountLoggedAt
        consumeSpeed
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(query);

  if (loading) {
    return (<p>Loading...</p>);
  }
  if (error) {
    return(<p>Error :(</p>);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>物资名</TableCell>
              <TableCell>上次记录剩余量</TableCell>
              <TableCell>上次记录时间</TableCell>
              <TableCell>消耗速度(每天)</TableCell>
              <TableCell>预估剩余量</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.items.map((row: Item) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.amountLogged}</TableCell>
                <TableCell>{moment(row.amountLoggedAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{row.consumeSpeed}</TableCell>
                <TableCell>{calculateRemanent(row.amountLogged, row.amountLoggedAt, row.consumeSpeed)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setItemEditing(row);
                      setEditing(true);
                    }}
                  >
                    更新
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ItemEditor
        open={editing}
        item={itemEditing}
        onClose={() => {
          refetch();
          setEditing(false);
        }}
      />
    </>
  );
};
