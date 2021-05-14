import React, { useState } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';
import { api } from '../../Utils/constants';

const FormFields = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
  }
`;

export default function FormDetail() {
  const [formData, setFormData] = useState({
    postCode: '',
    suburb: '',
    state: '',
  });

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    axios.get(api).then((res) => {
      console.log(res);
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormFields>
        <input
          placeholder="Post Code"
          type="text"
          name="postCode"
          onChange={onChange}
          value={formData.postCode}
        />
        <input
          placeholder="Suburb"
          type="text"
          name="suburb"
          onChange={onChange}
          value={formData.suburb}
        />
        <input
          placeholder="State"
          type="text"
          name="state"
          onChange={onChange}
          value={formData.state}
        />
      </FormFields>
      <button type="submit">Click Me</button>
    </form>
  );
}
