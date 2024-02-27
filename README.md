# Phonebook

Phonebook is the result of a one-week full stack challenge,
almost without prior experience with GraphQL.

It contains a contact management application that allows users to store and manage their contacts.

## Features
* add, edit, and delete contacts
* upload and filter images
* search for contacts
* infinite scroll

## Implementation features
* Frontend
  * responsive design with a mobile like experience
  * `React` with `TypeScript`, `Styled Components`, `Material-UI` and `Vite`
  * state management with `Redux` and `RTKQ`
  * form validation with `React Hook Form` and `Yup`
  
* Backend
  * `GraphQL` with `NestJS` backend using Transactions and `postgreSQL` with `typeORM`
  * Data Transfer Objects with Validation Pipe
  * integration tests with `Jest`
  * image filter with `Sharp`
  * Exception Filter

## Limitations
* phone numbers have to be comma separated in the UI, e.g. 0532123456, 0532123457
* images can only be stored as `jpeg` and `png`
* image filtering currently only supports `grayscale`, `blur` and `saturation`; please set blur and saturation to `0` if
you don't want to apply them
* scrolling is fully functional, but can be improved in terms of user experience


<div align="center">
<table>
<tr><th>Tech Stack</th></tr>
<tr><td>

 <sub> React </sub> |<sub> TypeScript <sub>| <sub> Styled Components </sub> | <sub> Material-UI </sub> | <sub> Vite </sub> | <sub> Redux </sub> | <sub> React Hook Form </sub>
|--|--|--|--|--|--|--
[<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/react.svg" alt="drawing" width="40" height="40"/>](https://reactjs.org/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/ts.svg" alt="drawing" width="40" height="40"/>](https://www.typescriptlang.org/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/sc.png" alt="drawing" width="40" height="40"/>](https://styled-components.com/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/material.svg" alt="drawing" width="40" height="40"/>](https://material-ui.com/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/vite.svg" alt="drawing" width="40" height="40"/>](https://vitejs.dev/guide/) |  [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/redux.svg" alt="drawing" width="40" height="40"/>](https://redux.js.org) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/react-hook-form.png" alt="drawing" width="40" height="40"/>](https://react-hook-form.com/)
</td></tr>
<tr><td>

<sub> GraphQL </sub> | <sub> NestJS </sub> |  <sub> postgreSQL </sub>  | <sub> typeORM </sub>  | <sub> Jest </sub>  | <sub> Sharp </sub> | <sub> Docker </sub>
|--|--|--|--|--|--|--
[<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/graphql.svg" alt="drawing" width="40" height="40"/>](https://graphql.org/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/nestjs.svg" alt="drawing" width="40" height="40"/>](https://nestjs.com/) |  [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/postgresql.svg" alt="drawing" width="40" height="40"/>](https://www.postgresql.org)  |  [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/typeorm.svg" alt="drawing" width="40" height="40"/>](https://typeorm.io/)  | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/jest.svg" alt="drawing" width="40" height="40"/>](https://jestjs.io/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/sharp.png" alt="drawing" width="40" height="40"/>](https://sharp.pixelplumbing.com/) | [<img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/docker.svg" alt="drawing" width="40" height="40"/>](https://www.docker.com/)
</td></tr>
</table>
</div>

## Intro screen
![alt text](https://github.com/nik-neg/phonebook/blob/main/.images/1_intro.jpg)


## Add contact functionality with contact details
![alt text](https://github.com/nik-neg/phonebook/blob/main/.images/21_add.jpg)


## Add contact functionality with image filter
![alt text](https://github.com/nik-neg/phonebook/blob/main/.images/22_add.jpg)


## Contact list view
![alt text](https://github.com/nik-neg/phonebook/blob/main/.images/3_list.jpg)


## Edit contact functionality
![alt text](https://github.com/nik-neg/phonebook/blob/main/.images/4_edit.jpg)

## Demo
https://www.loom.com/share/66c8bd361138443bb12d98c10031c7d4

## v2 improvements (24.02.24)
- [x] autocomplete for adding contacts by leveraging `algolia api` with portals and `google places api` for addresses
- [x] for the `algolia api` mock data has been created in the provider account
- [x] the search functionality can be toggled with the env variable `VITE_SEARCH_BAR_WITHOUT_BUTTON` and appears now on the phone
- [x] the address field can be toggled with the env variable `VITE_SHOULD_USE_LOCATION` and has a fallback to a list of countries autocomplete
- [x] the validation trigger has been refactored to use a utility to reduce duplicated code
- [x] the buttons are now using the material-ui `Button` component with preserved styles
- [x] the search field for the address has been refactored to align with the rest of the UI in the add contact modal
- [x] the shine effect is now preserved under the search bar and the contact list and has now a reversed direction
- [x] the functionality has been tested on `Chrome`, `Firefox` and `Opera`

```typescript
VITE_SEARCH_BAR_WITHOUT_BUTTON=true
VITE_APP_ID=YOUR_ALGOLIA_APP_ID
VITE_API_KEY=YOUR_ALGOLIA_API_KEY
VITE_LOCATION_API_KEY=YOUR_GOOGLE_PLACES_API_KEY
VITE_LOCATION_PROVIDER=https://maps.googleapis.com/maps/api/js
VITE_LOCATION_API_PARAMS=libraries=places
VITE_SHOULD_USE_LOCATION=true
```

# Getting started

- run `docker-compose up -d`in the server folder to start the db
- run `npm i && npm run dev` in the client folder to start the client
- run `npm i && nest start` in the server folder to start server
