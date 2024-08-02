import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
// import EditPayment from "../Modals/EditPayment";
import styled from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { MdRemoveRedEye } from "react-icons/md";

const BannerHeader = styled.h1.attrs({
  className:
    "relative bg-[#000] py-[20px] text-xl flex items-center rounded-t-lg pl-10 text-white justify-center font-[Roboto] font-[700] text-[1.4rem] select-none",
})`
  & {
    font-size: ${(props) => (props.fontSize ? props.fontSize : "1.4rem")};
    padding: ${(props) => (props.padding ? props.padding : "8px 0px")};
  }
`;

export const TableWrapper = styled.div`
  /* Tailwind="flex justify-center flex-col"> */
  margin-top: 1px;
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  // margin: 0px 120px;
  width: 100%;
  padding: ${(props) =>
    props.isAct ? "0px 20px 0px 140px" : "0px 20px 0px 20px"};
`;

export default function TableComp({
  rows,
  columns,
  setView,
  setSelectedId,
  setOpenEditModal,
  setOpenDeleteModal,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [SearchText, setSearchText] = useState("");
  const [Open, setOpen] = useState(false);
  // const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [Id, setId] = useState("");
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return rows.length == 0 ? (
    // <LoadingError />
    <></>
  ) : (
    <>
      {/* Search Bar */}
      <div className="flex">
        {/* <Search Value={Value} setValue={setValue} Placeholder={placeholder} /> */}
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          className="border-[2px] border-[#465462] border-t-white"
          sx={{ maxHeight: 550, borderRadius: "0px 0px 10px 10px" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    className="select-none"
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#465462",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      fontFamily: "'Roboto', sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length &&
                rows
                  .filter((data) => {
                    const lowercaseSearch = SearchText?.toLowerCase();
                    const lowerCaseName = data?.name?.toLowerCase();

                    return lowercaseSearch !== ""
                      ? lowerCaseName.includes(lowercaseSearch)
                      : true;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                      >
                        {columns.map((column) => {
                          let value;
                          // if (title === "Item Ledger Detail") {
                          //   if (column.id === "date")
                          //     value = new Date(
                          //       row[0][column.id] * 1000
                          //     ).toLocaleDateString();
                          //   else value = row[0][column.id];
                          // } else
                          if (
                            "companyId" === column.id ||
                            "categoryId" === column.id ||
                            "subcategoryId" === column.id ||
                            "itemId" === column.id
                          )
                            value = row[column.id]?.name;
                          else if (
                            "addeddate" === column.id ||
                            "date" === column.id
                          )
                            value = new Date(
                              row[column.id] * 1000
                            ).toLocaleDateString();
                          else if ("consult_type" === column.id)
                            value =
                              row[column.id] === 1
                                ? "Online"
                                : row[column.id] === 2 && "Physical";
                          else if (column.id !== "actions")
                            value = row[column.id];

                          const c_id = row["_id"];
                          return (
                            <TableCell
                              id={c_id}
                              // onClick={HandleDoubleClick}
                              className={
                                column.id === "contact"
                                  ? "font-[georgia] select-none"
                                  : "font-[Roboto] select-none"
                              }
                              key={column.id}
                              align={column.align}
                              style={{ fontWeight: "700", fontSize: "0.95rem" }}
                            >
                              {column.id === "actions" ? (
                                <div className="flex justify-center items-center gap-x-2">
                                  <BiEdit
                                    className="text-[1.5rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[green] transition-all duration-500"
                                    onClick={() => {
                                      setSelectedId(row._id);
                                      setOpenEditModal(true);
                                    }}
                                  />
                                  <RiDeleteBin5Line
                                    className="text-[1.5rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[red] transition-all duration-500"
                                    onClick={() => {
                                      setSelectedId(row._id);
                                      setOpenDeleteModal(true);
                                    }}
                                  />
                                </div>
                              ) : column.id === "view" ? (
                                <div className="flex justify-center items-center gap-x-2">
                                  <MdRemoveRedEye
                                    className="text-[1.6rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer text-custom-bg hover:text-custom-bg-hover transition-all duration-500"
                                    onClick={() => {
                                      setView(true);
                                      setSelectedId(row._id);
                                    }}
                                  />
                                </div>
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : column.id === "imageUrl" ? (
                                <img
                                  src={value}
                                  alt="Doctor Image"
                                  className="w-24 h-24 rounded-full border-2 border-custom-bg-hover relative"
                                />
                              ) : (
                                value || "N/A"
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
