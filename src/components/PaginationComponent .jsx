import React from "react";
import styled from "styled-components";

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

const PaginationComponent = ({ pageCount, activePage, onPageChange }) => {
    const pageNumbers = [];
    const range = 1;
  
    // create an array of page numbers to render in pagination
    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= activePage - range && i <= activePage + range)
      ) {
        pageNumbers.push(i);
      } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
        pageNumbers.push("...");
      }
    }
  
    return (
      <PaginationContainer>
        <PaginationButton
          disabled={activePage === 1}
          onClick={() => onPageChange(activePage - 1)}
        >
          Prev
        </PaginationButton>
        {pageNumbers.map((pageNumber, index) => (
          <PaginationButton
            key={index}
            isActive={pageNumber === activePage}
            onClick={() =>
              typeof pageNumber === "number" && onPageChange(pageNumber)
            }
          >
            {pageNumber}
          </PaginationButton>
        ))}
        <PaginationButton
          disabled={activePage === pageCount}
          onClick={() => onPageChange(activePage + 1)}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    );
  };
  
export default PaginationComponent;