import React, { useState, useMemo, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import styled from "styled-components";
import BaseTable from "./BaseTable";

const PAGE_SIZE = 10;

const TableComponent = () => {
    const [connection, setConnection] = useState(null);
    const [arrivals, setArrivals] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [activePage, setActivePage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [pageData, setPageData] = useState([]);

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

        async function subscribe() {
            try {
                const response = await fetch("https://localhost:44319/subscription/subscribe");
                if (!response.ok) {
                    throw new Error('Unsuccessful try to subscribe');
                }

                console.log("SUBSCRIBED");
            } catch (error) {
                console.log(error)
            }
        }

        subscribe();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        const connect = async () => {
            try {
                await connection.start();
                console.log("Connected!");

                connection.on("ReceiveArrivals", (recentArrivals) => {
                    setArrivals((arrivals) => [...JSON.parse(recentArrivals), ...arrivals].slice(0, 100));
                });
            } catch (ex) {
                console.log(ex);
            }
        };

        connection && connect();
    }, [connection])

    useEffect(() => {
        setPagesCount(Math.ceil(arrivals.length / PAGE_SIZE))

        const startIndex = (activePage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;

        console.log([...arrivals.slice(startIndex, endIndex)]);

        setPageData(() => [...arrivals.slice(startIndex, endIndex)]);
    }, [arrivals, activePage])


    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handlePageChange = (page) => {
        console.log("handlePageChange");
        console.log(page);
        setActivePage(page);
    };

    return (
        <BaseTable
            arrivals={pageData}
            activePage={activePage}
            handlePageChange={handlePageChange}
            pagesCount={pagesCount}
            handleSort={handleSort}
            label={"Live"}
        />
    );
}

export default TableComponent;