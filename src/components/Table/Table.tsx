import { makeStyles } from "@material-ui/core/styles";
import { Table as MuiTable } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: "#F2F2F7",
  },
  columnHeader: {
    color: "#8E8E93",
    fontSize: 14,
  },
});

const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

type Column = {
  id: number;
  name: string;
  type: string;
};

const INITIAL_COLUMNS = [
  {
    id: 1,
    name: "Колонка 1",
    type: "string",
  },
  {
    id: 2,
    name: "Колонка 2",
    type: "number",
  },
];

const INITIAL_ROWS = [
  {
    id: 1,
    column1: "sssss",
    column2: 5,
  },
  {
    id: 2,
    column1: "фффф",
    column2: 10,
  },
];

const getColumnsDecs = (column: Column) =>
  column.type === "string" ? "" : "(%)";

export const Table = () => {
  const [columns, setColumns] = useState<Column[]>(() => INITIAL_COLUMNS);
  const [rows, setRows] = useState(() => INITIAL_ROWS);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <MuiTable
        className={classes.table}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell className={classes.columnHeader} align="left">
                  {column.name}
                  {getColumnsDecs(column)}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
          {rows.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell align="left">{row.column1}</TableCell>
                <TableCell align="left">{row.column2}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
