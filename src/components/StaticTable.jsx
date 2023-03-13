import React, { useState, useMemo, useEffect } from "react";
import BaseTable  from "./BaseTable";

const PAGE_SIZE = 10;

const TableComponent = () => {
    const [arrivals, setArrivals] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [activePage, setActivePage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    useEffect(() => {
        async function fetchPagesCount() {
            try {
                const response = await fetch(`https://localhost:44319/arrival/count`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                let data = await response.json();
                let arrivalsCount = parseInt(data);
                console.log("arrivalsCount");
                console.log(arrivalsCount);

                let pagesCount = Math.ceil(arrivalsCount / PAGE_SIZE);
                setPagesCount(pagesCount);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        fetchPagesCount();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://localhost:44319/arrival/page/${activePage}?orderByField=${sortField}&isAscending=${sortDirection=='asc'}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const arrivals = await response.json();
                console.log(arrivals);
                setArrivals([...arrivals]);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        fetchData();

    }, [activePage,sortField, sortDirection])

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
        arrivals={arrivals}
        activePage={activePage}
        handlePageChange={handlePageChange}
        pagesCount={pagesCount}
        handleSort={handleSort}
        />
    );
}

export default TableComponent;