import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, FormDetail, CardContainer } from '../index';

export default function Form() {
  return (
    <Wrapper>
      <CardContainer>
        <FormDetail />
        <Link to="/">Click to go back</Link>
      </CardContainer>
    </Wrapper>
  );
}
