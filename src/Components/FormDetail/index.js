import React, { useState } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';

const states = ['NSW', 'QLD', 'SA', 'NT', 'TAS', 'WA', 'VIC'];

const FormFields = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
  }

  select {
    margin-bottom: 10px;
  }
`;

export default function FormDetail() {
  const [formData, setFormData] = useState({
    postCode: '',
    suburb: '',
    state: '',
  });

  const [message, setMessage] = useState('');

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    var strUrl =
      'http://localhost:5000/location?' +
      Object.keys(formData)
        .filter(function (key) {
          return formData[key];
        })
        .map(function (key) {
          return key + '=' + formData[key];
        })
        .join('&');

    axios
      .get(strUrl, {
        headers: {
          'AUTH-KEY': '872608e3-4530-4c6a-a369-052accb03ca8',
        },
      })
      .then((res) => {
        validate(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (response) => {
    if (response.data.localities === '') {
      setMessage(
        `Suburb ${formData.suburb} does not exist in ${formData.state}`
      );
    } else if (
      response.data.localities.locality.location ===
      formData.suburb.toUpperCase()
    ) {
      setMessage('Suburb Matches postcode');
    } else if (
      response.data.localities.locality.location !==
      formData.suburb.toUpperCase()
    ) {
      setMessage(
        `Suburb ${formData.suburb} does not Match postcode ${formData.postCode}`
      );
    }
  };

  return (
    <div>
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
          <select onChange={onChange} name="state">
            {states.map((state) => {
              return (
                <option name="state" value={state}>
                  {state}
                </option>
              );
            })}
          </select>
        </FormFields>
        <button type="submit">Click Me</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
