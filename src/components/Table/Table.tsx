import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Table as MuiTable,
  Select,
  TextField,
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, useState } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: "#F2F2F7",
  },
  columnHeader: {
    color: "#8E8E93",
    fontSize: 14,
  },
  dialog: {
    minWidth: 450,
  },
  select: {
    width: "100%",
    marginTop: 25,
    marginBottom: 35,
    height: 50,
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});

type Column = {
  id: string;
  name: string;
  type: string;
};

type Row = Record<string, string | number>;

const INITIAL_COLUMNS = [
  {
    id: uuidv4(),
    name: "Колонка 1",
    type: "string",
  },
  {
    id: uuidv4(),
    name: "Колонка 2",
    type: "number",
  },
];

const INITIAL_ROWS = [
  // {
  //   id: uuidv4(),
  //   column1: "sssss",
  //   column2: 5,
  // },
  // {
  //   id: uuidv4(),
  //   column1: "фффф",
  //   column2: 10,
  // },
];

const getColumnsDecs = (column: Column) =>
  column.type === "string" ? "" : "(%)";

export const Table = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogState, setDialogSate] = useState({
    name: "",
    type: "",
  });
  const classes = useStyles();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleAddColumn = () => {
    const newColumns = [
      ...columns,
      {
        id: uuidv4(),
        ...dialogState,
      },
    ];

    if (rows.length) {
      const newRows = [
        ...rows.map((row) => {
          let newRow: Row = {};

          newColumns.forEach((e) => {
            newRow[e.name] = "";
          });

          return { id: uuidv4(), ...newRow, ...row };
        }),
      ];

      setRows(newRows);
    }

    const newRows = [];
    let newRow: Row = {
      id: uuidv4(),
    };

    newColumns.forEach((e) => {
      newRow[e.name] = "";
    });

    newRows.push(newRow);

    setColumns(newColumns);
    setRows(newRows);
    setIsOpen(false);
    setDialogSate({
      name: "",
      type: "",
    });
  };

  return (
    <TableContainer component={Paper} className={classes.table}>
      <div>
        <Button onClick={handleOpen}>Добавить колонку</Button>
        <Button onClick={handleEdit}>
          {isEdit ? "сохранить изменения" : "Редактировать содержимое"}
        </Button>
      </div>
      <MuiTable size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell
                  className={classes.columnHeader}
                  align="left"
                  key={column.id}
                >
                  {isEdit ? (
                    <>
                      <Input
                        value={column.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setColumns(
                            columns.map((editColum) => {
                              if (editColum.id === column.id) {
                                editColum.name = e.target.value;
                              }

                              return editColum;
                            })
                          )
                        }
                      />
                      <Select
                        id="demo-simple-select"
                        value={column.type}
                        onChange={(e) =>
                          setColumns(
                            columns.map((editColum) => {
                              if (editColum.id === column.id) {
                                editColum.type = String(e.target.value);
                              }

                              return editColum;
                            })
                          )
                        }
                        className={classes.select}
                      >
                        <MenuItem value="string">Строка</MenuItem>
                        <MenuItem value="number">Проценты</MenuItem>
                      </Select>
                    </>
                  ) : (
                    `${column.name}${getColumnsDecs(column)}`
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {Object.keys(row)
                  .slice(1)
                  .map((key) => {
                    return (
                      <TableCell align="left" key={key}>
                        {isEdit ? (
                          <Input
                            value={row[key as keyof typeof row]}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setRows(
                                rows.map((editRow) => {
                                  if (row.id === editRow.id) {
                                    editRow[key] = e.target.value;
                                  }

                                  return editRow;
                                })
                              );
                            }}
                          />
                        ) : (
                          row[key as keyof typeof row]
                        )}
                      </TableCell>
                    );
                  })}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialog}>
          Добавление колонки
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            id="outlined-basic"
            label="Заголовок"
            variant="outlined"
            value={dialogState.name}
            onChange={(e) =>
              setDialogSate({ ...dialogState, name: e.target.value })
            }
          />
          <Select
            labelId="demo-select-small-label"
            id="demo-simple-select"
            label="aaa"
            value={dialogState.type}
            onChange={(e) =>
              setDialogSate({ ...dialogState, type: String(e.target.value) })
            }
            className={classes.select}
          >
            <MenuItem value="string">Строка</MenuItem>
            <MenuItem value="number">Проценты</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button
            onClick={handleAddColumn}
            autoFocus
            disabled={Boolean(
              !dialogState.name.length && !dialogState.type.length
            )}
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};
