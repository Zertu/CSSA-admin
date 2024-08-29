import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// import { DataGrid } from "@mui/x-data-grid";
function CustomTable({ data, itemsPerPage = 10, headers: userHeaders }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (userHeaders) {
      setHeaders(userHeaders);
    } else if (data.length > 0) {
      setHeaders(
        Object.keys(data[0]).map((key) => ({
          key,
          alias: key,
          width: "auto",
          render: (value) => value,
        }))
      );
    }
  }, [data, userHeaders]);

  function CustomNoRowsOverlay() {
    const StyledGridOverlay = styled("div")(({ theme }) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      "& .no-rows-primary": {
        fill: theme.palette.mode === "light" ? "#AEB8C2" : "#3D4751",
      },
      "& .no-rows-secondary": {
        fill: theme.palette.mode === "light" ? "#E8EAED" : "#1D2126",
      },
    }));
    return (
      <StyledGridOverlay>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width={96}
          viewBox="0 0 452 257"
          aria-hidden
          focusable="false"
        >
          <path
            className="no-rows-primary"
            d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
          />
          <path
            className="no-rows-secondary"
            d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
          />
        </svg>
        <Box sx={{ mt: 2 }}>No rows</Box>
      </StyledGridOverlay>
    );
  }
  return (
    <div className="table-responsive" style={{ backgroundColor: "#fff" }}>
      {/* <DataGrid
        rows={data}
        columns={headers}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        autoHeight
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        pageSizeOptions={[10, 20, 50]}
      /> */}
      {/* <Table className="table-hover">
        <thead>
          <tr>
            {headers.map(({ key, alias, width }) => (
              <th key={key} style={{ width }}>
                {alias}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getPageData().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map(({ key, render }) => (
                <td key={key}>{render ? render(row[key], row) : row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(pageCount())].map((p, i) => (
          <PaginationItem active={i === currentPage} key={i}>
            <PaginationLink onClick={(e) => handlePageClick(e, i)} href="#">
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination> */}
    </div>
  );
}

export default CustomTable;
