# Postcode validator

### Run Application

lIVE DEMO -

### Run Application

1.  `npm install`
2.  `npm start`

### Requirements

```
"@testing-library/jest-dom": "^5.12.0",
"@testing-library/react": "^11.2.6",
"@testing-library/user-event": "^12.8.3",
"axios": "^0.21.1",
"msw": "^0.28.2",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-router": "^5.2.0",
"react-router-dom": "^5.2.0",
"react-scripts": "4.0.3",
"react-select-event": "^5.3.0",
"redux": "^4.1.0",
"styled-components": "^5.3.0"

```

### Test Application

`npm test`

### NOTE

The auspost API does not have CORS enabled on their server so I had to make a request to
my own an express server with CORS enabled so that I could access endpoint from the browser.
