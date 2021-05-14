import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, FormDetail } from '../index';

export default function Form() {
  return (
    <Wrapper>
      <FormDetail />
      <Link to="/">Click to go back</Link>
    </Wrapper>
  );
}
