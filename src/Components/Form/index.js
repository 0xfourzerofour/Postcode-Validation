import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, FormDetail, CardContainer } from '../index';
import styled from 'styled-components/macro';

const Title = styled.h3`
  color: #828282;
`;

export default function Form() {
  return (
    <Wrapper>
      <CardContainer>
        <Title>Post Code Validator</Title>

        <FormDetail />
      </CardContainer>
      <Link to="/">Back</Link>
    </Wrapper>
  );
}
