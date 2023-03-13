import React, { useState } from "react";
import StaticTable from './components/StaticTable';
import LiveTable from './components/LiveTable';
import ToggleSwitchButton from './components/ToggleSwitchButton';
import './App.css';
import styled from 'styled-components';


const SwitchButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;


function App() {
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="App">
      <ToggleSwitchButton
        isLive={isLive}
        onToggle={setIsLive}
        leftLabel={"Live"}
        rightLabel={"Static"}
      />
      {isLive 
      ? <LiveTable /> 
      : <StaticTable />}
    </div>
  );
}

export default App;
