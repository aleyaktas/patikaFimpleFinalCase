# Patika Fimple Final Case - TICKETLY

You can apply on this site, follow up on the application and find out the details. If you are admin, you can see and answer the applications made by logging in.

## Technologies

**Frontend:** HTML, CSS, JavaScript, React, Context API

**Backend:** Node.js, Express

**Database:** MongoDB

**Server:** AWS

## Used Libraries

**Client:**
- react-dropzone
- react-hook-form
- react-paginate
- react-router-dom
- react-chartjs-2
- react-toastify
- @hookform/resolvers
- yup
- chart.js
- moment

**Backend:**
- cors
- config
- crypto
- express
- express-validator
- jsonwebtoken
- mongoose
- morgan
- multer

## Used Tech Stack For Deployment

Technologies used when deploying the site:

- AWS EC2
- OpenLiteSpeed
- CyberPanel
- Natro

## Live Demo
[https://ticketly.aleynaaktas.com](https://ticketly.aleynaaktas.com/)

## Admin Login
- username: kodluyoruz
- password: bootcamp109

## Images

****
<img width="700" alt="Anasayfa" src="https://github.com/aleyaktas/patikaFimpleFinalCase/assets/76265779/9fa8335a-e0db-49e4-9601-08dcc70d8789">

****
<img width="700" alt="Application Status" src="https://github.com/aleyaktas/patikaFimpleFinalCase/assets/76265779/077bdcc9-a08a-4c80-ac97-6c391f9f7907">

****
<img width="700" alt="Admin Login" src="https://github.com/aleyaktas/patikaFimpleFinalCase/assets/76265779/52270222-62f1-4b7a-a21b-e712fb70d222">

****
<img width="700" alt="Admin Panel" src="https://github.com/aleyaktas/patikaFimpleFinalCase/assets/76265779/61aa7252-bc10-4462-bb49-f8f03e7776af">

****
<img width="700" alt="Admin Başvuru Listesi" src="https://github.com/aleyaktas/patikaFimpleFinalCase/assets/76265779/de06abb8-f49e-4ded-a681-99d1f1828435">

****
<img width="700" alt="Admin Başvuru Detay" src="https://github.com/aleyaktas/patikaFimpleFinalCase/assets/76265779/4981d4ed-5f95-4600-b847-4e9d7ad2a438">

## Run Your Local

To clone this project:
```bash
  git clone https://github.com/aleyaktas/patikaFimpleFinalCase.git
```
To make necessary downloads for project:
```bash
  cd client
  yarn install
```
To run project:
```bash 
  yarn start
```
If you want to run project with local backend
```bash 
  cd ..
  cd backend
  yarn install
```

## Info before running the project with local backend 

_❗ If you want run project with local backend don't forget to change BASE_URL_

## How to change BASE_URL

client/src/services/index.js

You should change the BASE_URL in the project directory to localhost:5010

```
export const BASE_URL = "http://localhost:5010/api"
```
instead of 
```
export const BASE_URL = "https://api-ticketly.aleynaaktas.com/api";
```

