import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import Logo from '../../Assets/lp-logo.png';
import { Wrapper } from '../index';

const LogoImage = styled.img`
  width: 300px;
`;

export default function Landing() {
  return (
    <div>
      <Wrapper>
        <LogoImage src={Logo} />
        <Link to="/form">Click for form</Link>
      </Wrapper>
    </div>
  );
}
