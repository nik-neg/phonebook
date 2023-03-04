# Phonebook

Phonebook is a contact management application that allows users to store and manage their contacts.

## Features
* add, edit, and delete contacts
* infinite scroll
* upload and filter images
* search for contacts

## Implementation features
* Frontend
  * responsive design with a mobile like experience
  * `React` with `TypeScript`, `Styled Components`, `Material-UI` and `Vite`
  * state management with `redux` and `RTKQ`
  * form validation with `react-hook-form` and `yup`
  
* Backend
  * `GraphQL` with `NestJS` backend using `transactions`
  * Data Transfer Objects with Validation Pipe
  * Exceptions Filter
  * image filter with `sharp`
  * integration tests with `jest`

## Limitations
* phone numbers have to be comma separated in the UI, e.g. 0532123456, 0532123457
* images can only be stored as `jpeg` and `png`
* image filtering currently only supports `grayscale`, `blur` and `saturation`

<div align="center">
<table>
<tr><th>Tech Stack</th></tr>
<tr><td>

 <sub> React </sub> |<sub> TypeScript <sub>| <sub> Redux & RTKQ </sub> | <sub> Styled Components </sub> | <sub> Material-UI </sub> | <sub> React Hook Form </sub> | <sub> Vite </sub>
|--|--|--|--|--|--|--|--
[<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/react.svg" alt="drawing" width="40" height="40"/>](https://reactjs.org/) | [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/>](https://redux.js.org) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/material-ui.svg" alt="drawing" width="40" height="40"/>](https://material-ui.com/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/nodejs.svg" alt="drawing" width="40" height="40"/>](https://nodejs.org/en/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/nest.svg" alt="drawing" width="40" height="40"/>](https://nestjs.com/) |  [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/mongodb.svg" alt="drawing" width="40" height="40"/>](https://www.mongodb.com/)
</td></tr>
<tr><td>

<sub> Mongoose </sub> | <sub> JavaScript </sub> |  <sub> Jest </sub>  | <sub> Docker </sub>  | <sub> Travis </sub> | <sub> Cypress </sub>
|--|--|--|--|--|--
[<img src="https://github.com/nik-neg/appetize/blob/main/.techstack_images/mongoose.png" alt="drawing" width="40" height="40"/>](https://mongoosejs.com/) | [<img src="https://github.com/nik-neg/appetize/blob/main/.techstack_images/javascript.svg" alt="drawing" width="40" height="40"/>](https://www.javascript.com/) |  [<img src="https://github.com/nik-neg/appetize/blob/main/.techstack_images/jest.svg" alt="drawing" width="40" height="40"/>](https://jestjs.io/)  |  [<img src="https://github.com/nik-neg/appetize/blob/main/.techstack_images/docker.svg" alt="drawing" width="40" height="40"/>](https://www.docker.com/)  | [<img src="https://github.com/nik-neg/appetize/blob/main/.techstack_images/travis.svg" alt="drawing" width="40" height="40"/>](https://www.travis-ci.com/) | [<img src="https://github.com/nik-neg/appetize/blob/main/.techstack_images/cypress.svg" alt="drawing" width="40" height="40"/>](https://www.cypress.io/)
</td></tr>
</table>
</div>


# Getting started

- run `docker-compose up -d`in the server folder to start the db
- run `npm i && npm run dev` in the client folder to start the client
- run `npm i && npm run dev`in the server folder to start server
