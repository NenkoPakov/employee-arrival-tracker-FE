import React, { useState, useMemo, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
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

const TableRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 8px;
  text-align: left;
  cursor: pointer;
`;

const TableCell = styled.td`
  padding: 8px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const PaginationButton = styled.button`
  padding: 8px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#0077ff" : "#f5f5f5")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#333333")};
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const PAGE_SIZE = 25;

const TableComponent = () => {
    const [connection, setConnection] = useState(null);
    const [arrivals, setArrivals] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [activePage, setActivePage] = useState(1);

    const sortedData = useMemo(() => {
        if (!sortField) {
            return arrivals;
        }
        const direction = sortDirection === "asc" ? 1 : -1;
        var a = [...arrivals]
        return [...arrivals].sort((a, b) =>
            a[sortField].toString().localeCompare(b[sortField]) * direction
        );
    }, [sortField, sortDirection]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:44319/hubs/employees")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        const connect = async () => {
            try {
              await connection.start();
              console.log("Connected!");
        
              connection.on("ReceiveArrivals", (recentArrivals) => {
                setArrivals((arrivals) => [...JSON.parse(recentArrivals), ...arrivals]);
              });
            } catch (ex) {
              console.log(ex);
            }
        };

        connection && connect();
    }, [connection])

    const pageCount = Math.ceil(arrivals.length / PAGE_SIZE);
    const startIndex = (activePage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const pageData = sortedData.slice(startIndex, endIndex);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell onClick={() => handleSort('FirstName')}>First Name</TableHeaderCell>
                        <TableHeaderCell onClick={() => handleSort('SurName')}>Sur Name</TableHeaderCell>
                        <TableHeaderCell onClick={() => handleSort('Email')}>Email</TableHeaderCell>
                        <TableHeaderCell onClick={() => handleSort('Age')}>Age</TableHeaderCell>
                        <TableHeaderCell onClick={() => handleSort('Manager')}>Manager</TableHeaderCell>
                        <TableHeaderCell onClick={() => handleSort('RoleTitle')}>Role</TableHeaderCell>
                        <TableHeaderCell onClick={() => handleSort('Teams')}>Teams</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {arrivals && arrivals.length && arrivals.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE).map((row) => (
                        <TableRow key={row.Id}>
                            <TableCell>{row.FirstName}</TableCell>
                            <TableCell>{row.SurName}</TableCell>
                            <TableCell>{row.Email}</TableCell>
                            <TableCell>{row.Age}</TableCell>
                            <TableCell>{row.Manager}</TableCell>
                            <TableCell>{row.RoleTitle}</TableCell>
                            <TableCell>{row.Teams && row.Teams.length ? row.Teams.join(',') : '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationContainer>
                <button
                    onClick={() => handlePageChange(activePage - 1)}
                    disabled={activePage === 1}
                >
                    Previous
                </button>
                {arrivals.length &&
                    Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={page === activePage}
                        >
                            {page}
                        </button>
                    ))
                }
                <button
                    onClick={() => handlePageChange(activePage + 1)}
                    disabled={activePage === pageCount}
                >
                    Next
                </button>
            </PaginationContainer>
        </TableContainer>
    );
}

export default TableComponent;