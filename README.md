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
    <tr>
      <th colspan="7">Tech Stack</th>
    </tr>
    <tr>
      <td align="center"><a href="https://reactjs.org/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/react.svg" alt="React" width="40" height="40"/><br>React</a></td>
      <td align="center"><a href="https://www.typescriptlang.org/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/ts.svg" alt="TypeScript" width="40" height="40"/><br>TypeScript</a></td>
      <td align="center"><a href="https://styled-components.com/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/sc.png" alt="Styled Components" width="40" height="40"/><br>Styled Components</a></td>
      <td align="center"><a href="https://material-ui.com/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/material.svg" alt="Material-UI" width="40" height="40"/><br>Material-UI</a></td>
      <td align="center"><a href="https://vitejs.dev/guide/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/vite.svg" alt="Vite" width="40" height="40"/><br>Vite</a></td>
      <td align="center"><a href="https://redux.js.org"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/redux.svg" alt="Redux" width="40" height="40"/><br>Redux</a></td>
      <td align="center"><a href="https://react-hook-form.com/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/react-hook-form.png" alt="React Hook Form" width="40" height="40"/><br>React Hook Form</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://graphql.org/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/graphql.svg" alt="GraphQL" width="40" height="40"/><br>GraphQL</a></td>
      <td align="center"><a href="https://nestjs.com/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/nestjs.svg" alt="NestJS" width="40" height="40"/><br>NestJS</a></td>
      <td align="center"><a href="https://www.postgresql.org"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/postgresql.svg" alt="PostgreSQL" width="40" height="40"/><br>PostgreSQL</a></td>
      <td align="center"><a href="https://typeorm.io/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/typeorm.svg" alt="TypeORM" width="40" height="40"/><br>TypeORM</a></td>
      <td align="center"><a href="https://jestjs.io/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/jest.svg" alt="Jest" width="40" height="40"/><br>Jest</a></td>
      <td align="center"><a href="https://sharp.pixelplumbing.com/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/sharp.png" alt="Sharp" width="40" height="40"/><br>Sharp</a></td>
      <td align="center"><a href="https://www.docker.com/"><img src="https://github.com/nik-neg/phonebook/blob/main/.techstack/docker.svg" alt="Docker" width="40" height="40"/><br>Docker</a></td>
    </tr>
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

## v2 improvements (24.02.24 - 05.03.24)
- [x] autocomplete for adding contacts by leveraging `algolia api` with portals and `google places api` for addresses
- [x] for the `algolia api` mock data has been created in the provider account
- [x] the search functionality can be toggled with the env variable `VITE_SEARCH_BAR_WITHOUT_BUTTON` and appears now on the phone
- [x] the address field can be toggled with the env variable `VITE_SHOULD_USE_LOCATION` and has a fallback to a list of countries autocomplete
- [x] the validation trigger has been refactored to use a utility to reduce duplicated code
- [x] the buttons are now using the material-ui `Button` component with preserved styles
- [x] the search field for the address has been refactored to align with the rest of the UI in the add contact modal
- [x] the shine effect is now preserved under the search bar and the contact list, 
      has a reversed direction, and can be controlled with the slider and the gradient color picker
- [x] the scrolling has been improved in terms of `UX` and it's using now the cache for a smoother experience
- [x] optimistic updates for update and remove contact
- [x] skeleton card for loading new contacts
- [x] you can use the data folder where the mock data is stored to test the search functionality by creating an own
`algolia` account and replacing the `VITE_APP_ID` and `VITE_API_KEY` in the `.env` file
- [x] the functionality has been tested on `Chrome`, `Firefox` and `Opera`

```typescript
VITE_SEARCH_BAR_WITHOUT_BUTTON=true
VITE_APP_ID=YOUR_ALGOLIA_APP_ID
VITE_API_KEY=YOUR_ALGOLIA_API_KEY
VITE_SHOULD_USE_ALGOLIA=false
VITE_LOCATION_API_KEY=YOUR_GOOGLE_PLACES_API_KEY
VITE_LOCATION_PROVIDER=https://maps.googleapis.com/maps/api/js
VITE_LOCATION_API_PARAMS=libraries=places
VITE_SHOULD_USE_LOCATION=false
```

# Getting started

- run `docker-compose up -d`in the server folder to start the db
- run `npm i && npm run dev` in the client folder to start the client
- run `npm i && nest start` in the server folder to start server
