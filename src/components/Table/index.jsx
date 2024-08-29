import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Typography,
} from "@mui/material";

function CustomTable({ data, itemsPerPage = 10, headers: userHeaders }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (userHeaders) {
      setHeaders(userHeaders);
    } else if (data.length > 0) {
      setHeaders(
        Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key,
          width: "auto",
        }))
      );
    }
  }, [data, userHeaders]);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const getPageData = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const handlePageClick = (event, value) => {
    setCurrentPage(value - 1);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(({ field, headerName, width }) => (
                <TableCell key={field} style={{ width }}>
                  {headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getPageData().length > 0 ? (
              getPageData().map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map(
                    ({ field, renderCell, valueGetter, valueFormatter }) => {
                      let cellValue = row[field];

                      // 如果定义了 valueGetter，使用 valueGetter 处理值
                      if (valueGetter) {
                        cellValue = valueGetter({ field, row }, row);
                      }

                      // 如果定义了 valueFormatter，使用 valueFormatter 处理值
                      if (valueFormatter) {
                        cellValue = valueFormatter({ field, row }, row);
                      }

                      // 如果定义了 renderCell，使用 renderCell 渲染单元格
                      return (
                        <TableCell key={field}>
                          {renderCell ? renderCell({ field, row }) : cellValue}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length}>
                  <Typography align="center">No rows</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={currentPage + 1}
          onChange={handlePageClick}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
}

export default CustomTable;
