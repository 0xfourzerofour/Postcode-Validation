import React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function WrapperComponent(props) {
  return <Wrapper>{props.children}</Wrapper>;
}
