# Postcode validator

### Run Application

lIVE DEMO - http://ec2-3-15-187-75.us-east-2.compute.amazonaws.com/

CORS REQUEST FORWARDING - https://github.com/joshpauline/cors-fix/ (You will need to clone this repo and run npm start if you would like to run applicaiton locally. You will just have to change the /api/location endpoint to http://localhost:5000/location)

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


### NGINX CONFIG - REVERSE PROXY

```
server {
	listen 80 default_server;
	server_name _;


	location / {
    		root /home/ubuntu/actions-runner/_work/Postcode-Validation/Postcode-Validation/build;
    		try_files $uri /index.html;
	}

	location /api {
    		proxy_pass http://localhost:5000;
 	}

```
