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

const Button = styled.button`
  background: ${(props) => (props.ready ? '#0175be' : 'grey')};
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
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
    setMessage('');

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
  //this validation is a bit messy as the api returns an array or an object
  //based on the input so you need to check for both

  const validate = (res) => {
    if (res.data.name === 'Error') {
      setMessage(`postcode ${formData.postCode} does not exist`);
    } else if (res.data.localities === '') {
      setMessage(
        `Suburb ${formData.suburb} with the postcode ${formData.postCode} does not exist in ${formData.state}`
      );
    } else if (res.data.localities.locality[0] !== undefined) {
      const filterArray = res.data.localities.locality.filter((element) => {
        return element.location === formData.suburb.toLocaleUpperCase();
      });

      if (filterArray.length !== 0) {
        setMessage(
          `Suburb ${formData.suburb} with the postcode ${formData.postCode} is a valid address in ${formData.state}`
        );
      } else {
        setMessage(
          `${formData.postCode} is a valid postcode in ${formData.state}, however the suburb name does not match ${formData.suburb}`
        );
      }
    } else {
      if (
        res.data.localities.locality.location ===
        formData.suburb.toLocaleUpperCase()
      ) {
        setMessage(
          `Suburb ${formData.suburb} with the postcode ${formData.postCode} is a valid address in ${formData.state}`
        );
      } else {
        setMessage(
          `${formData.postCode} is a valid postcode in ${formData.state}, however the suburb name does not match ${formData.suburb}`
        );
      }
    }
  };

  const formComplete = () => {
    if (
      formData.postCode.length > 3 &&
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
          <select data-testid="select" onChange={onChange} name="state">
            <option value="" defaultValue>
              Select State
            </option>
            {states.map((state, i) => {
              return (
                <option
                  data-testid="select-option"
                  key={i}
                  name="state"
                  value={state}
                >
                  {state}
                </option>
              );
            })}
          </select>
        </FormFields>
        <Button ready={formComplete()} disabled={!formComplete()} type="submit">
          Click Me
        </Button>
      </form>
      <p>{message}</p>
    </div>
  );
}
