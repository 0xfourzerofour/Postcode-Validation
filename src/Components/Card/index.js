import React from 'react';
import styled from 'styled-components/macro';

const CardContainer = styled.div`
  width: 500px;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.15);
  background-color: #f5f5f5;

  @media only screen and (max-width: 600px) {
    width: 80%;
  }
`;

export default function Card(props) {
  return <CardContainer>{props.children}</CardContainer>;
}
