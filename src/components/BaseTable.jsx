import React from "react";
import PaginationComponent from "./PaginationComponent ";
import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }

  &:hover {
    transform: scale(1.02);
    background-color:lightgray;
  }
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  text-align: left;
  cursor: pointer;
`;

const TableCell = styled.td`
  padding: 8px;
`;

const BaseTable = ({ arrivals, handleSort, pagesCount, activePage, handlePageChange, label }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell onClick={() => handleSort('firstName')}>First Name</TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort('surName')}>Sur Name</TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort('email')}>Email</TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort('age')}>Age</TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort('manager')}>Manager</TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort('role')}>Role</TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort('teams')}>Teams</TableHeaderCell>
            <TableHeaderCell onClick={() => handleSort('arrivedAt')}>Arrived At</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrivals &&
            arrivals.length > 0 &&
            arrivals.map((row) => (
              <TableRow key={row.Id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.surName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.manager ? row.manager : '-'}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.teams && row.teams.length ? row.teams.join(',') : '-'}</TableCell>
                <TableCell>{row.arrivedAt}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <PaginationComponent
        pageCount={pagesCount}
        activePage={activePage}
        onPageChange={handlePageChange}
      />
    </TableContainer>
  );
}

export default BaseTable;