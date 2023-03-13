import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleSwitch = ({ isLive,onToggle,leftLabel,rightLabel }) => {
    const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = () => {
    const newIndex = (activeIndex + 1) % 2;
    setActiveIndex(newIndex);

    onToggle && onToggle(!isLive);
  };

  return (
    <Container onClick={handleToggle}>
      <Label>{leftLabel}</Label>
      <Switch activeIndex={activeIndex} />
      <Label>{rightLabel}</Label>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Label = styled.span`
  margin: 0 8px;
`;

const Switch = styled.div`
  position: relative;
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background-color: ${({ activeIndex }) => (activeIndex === 0 ? '#ccc' : '#4caf50')};
  transition: background-color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: ${({ activeIndex }) => (activeIndex === 0 ? '1px' : '25px')};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
    transition: left 0.3s ease;
  }
`;

export default ToggleSwitch;
