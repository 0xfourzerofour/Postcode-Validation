import React, { useState } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';

const states = ['NSW', 'QLD', 'SA', 'NT', 'TAS', 'WA', 'VIC'];

const FormFields = styled.div`
  display: flex;
  flex-direction: column;

  input {
    background: none;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #d8d8d8;
  }

  select {
    background: none;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #d8d8d8;
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

  //passing request through to an express server to bypass cors
  //preflight error
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

  //validates the response based on infomaton returned from api
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

  const formComplete = () => {
    if (
      formData.postCode !== '' &&
      formData.state !== '' &&
      formData.suburb !== ''
    ) {
      return true;
    } else {
      return false;
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
            <option value="" defaultValue>
              Select State
            </option>
            {states.map((state, i) => {
              return (
                <option key={i} name="state" value={state}>
                  {state}
                </option>
              );
            })}
          </select>
        </FormFields>
        <button disabled={!formComplete()} type="submit">
          Click Me
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
