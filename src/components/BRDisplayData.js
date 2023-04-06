import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BRDisplayData(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ลำดับที่</TableCell>
            <TableCell align="left">ชื่อสินค้า</TableCell>
            <TableCell align="right">จำนวนที่ส่งมา</TableCell>
            <TableCell align="right">จำนวนที่นำเข้าไปแล้ว</TableCell>
            <TableCell align="right">หน่วย</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">ProductId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => {
            let colors = '';
            if (row.qty !== "0") {
              colors = 'aquamarine'
            }
           return <TableRow
              key={row.rowcount}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ backgroundColor: colors }}
            >
              <TableCell component="th" scope="row">
                {row.rowcount}
              </TableCell>
              <TableCell align="left">{row.productname}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.importedqty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.gritemid}</TableCell>
              <TableCell align="right">{row.productid}</TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
