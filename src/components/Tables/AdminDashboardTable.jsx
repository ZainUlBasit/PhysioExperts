import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function AdminDashboardTable({ rows, columns }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ border: "2px solid #768A9E" }}>
        <TableHead
          style={{
            backgroundColor: "#56636F",
            border: "0px solid black",
          }}
        >
          <TableRow>
            {columns.map((col, i) => {
              return (
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.4rem",
                    fontFamily: "Quicksand",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    color: "white",
                    borderBottomLeftRadius: i === 0 ? "30px" : "0px",
                    borderBottomRightRadius:
                      i === columns.length - 1 ? "30px" : "0px",
                    borderWidth: 0,
                  }}
                  align="center"
                >
                  <div className="max767:text-[1.1rem] whitespace-nowrap">
                    {col.label}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((dt) => {
            return (
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.6rem",
                    fontFamily: "Quicksand",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    border: "2px solid #768A9E",
                    borderTop: "0px solid #768A9E",
                  }}
                  align="center"
                >
                  <div className="max767:text-[1.3rem]">{dt.no_of_doctors}</div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.6rem",
                    fontFamily: "Quicksand",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    border: "2px solid #768A9E",
                    borderTop: "0px solid #768A9E",
                  }}
                  align="center"
                >
                  <div className="max767:text-[1.3rem]">
                    {dt.no_of_patients}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.6rem",
                    fontFamily: "Quicksand",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    border: "2px solid #768A9E",
                    borderTop: "0px solid #768A9E",
                  }}
                  align="center"
                >
                  <div className="max767:text-[1.3rem]">
                    {dt.no_of_products}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.6rem",
                    fontFamily: "Quicksand",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    border: "2px solid #768A9E",
                    borderTop: "0px solid #768A9E",
                  }}
                  align="center"
                >
                  <div className="max767:text-[1.3rem]">
                    {dt.no_of_appointments}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
