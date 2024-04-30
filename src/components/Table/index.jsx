import { useState, useEffect } from "react";
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

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

  function handlePageClick(e, index) {
    e.preventDefault();
    setCurrentPage(index);
  }

  function pageCount() {
    return Math.ceil(data.length / itemsPerPage);
  }

  function getPageData() {
    const offset = currentPage * itemsPerPage;
    const pageData = data?.slice(offset, offset + itemsPerPage);
    return pageData || [];
  }

  return (
    <div className="table-responsive" style={{ backgroundColor: "#fff" }}>
      <Table className="table-hover">
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
                <td key={key}>{render(row[key], row)}</td>
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
      </Pagination>
    </div>
  );
}

export default CustomTable;
