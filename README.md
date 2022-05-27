# ygodeck-creator

Search for cards, Create a Deck, and Share it.

## API

https://db.ygoprodeck.com/api-guide/

## Description

Create yu-gi-oh decks and share it in a shared deck space.

## Wireframe

![Screen1](./wireframes/Homepage%401x.png)
![Screen2](./wireframes/Profile%401x.png)
![Screen3](./wireframes/Shared%20Decks%401x.png)

## ERD

![ERD](./ERD/erd.png)

## RESTful Routes

| VERB   | URL pattern       | Action \(CRUD\)   | Description                                                        |
| :----- | :---------------- | :---------------- | :----------------------------------------------------------------- |
| GET    | /                 | Index \(Read\)    | Homepage                                                           |
| GET    | /user             | Login \(Read\)    | Login from '/' redirect to '/profile'                              |
| POST   | /user/new         | New \(Create\)    | creates a new user, email,username,password redirect to '/profile' |
| GET    | /profile          | Show \(Read\)     | profile dashboard, shows decks                                     |
| POST   | /profile/deck/new | New \(Create\)    | create a new deck                                                  |
| GET    | /profile/deck/:id | Show \(Read\)     | show page with deck with search function                           |
| DELETE | /profile/deck/:id | Delete \(Delete\) | delete deck redirect to '/profile'                                 |
| PUT    | /profile/deck/:id | Update \(Update\) | update name and description of deck                                |

### Goals

#### MVP

- Create boilerplate models, databases, and ejs layouts
- Create Homepage
- Create login page and logout
- Create new user
- Authenticate user using bcrypt, dotenv, and cryptojs
- Create a new deck
- update the deck
- delete the deck
- Search for cards and add it to a deck

#### Stretch Goals

- Create shared deck page
- Share a deck
- Add a new comment
- Update comment
- Delete comment
- add more fields for card search function

| VERB | URL pattern      | Action \(CRUD\) | Description                  |
| :--- | :--------------- | :-------------- | :--------------------------- |
| GET  | /shareddecks     | Show \(Read\)   | show all shared decks        |
| POST | /shareddecks     | New \(Create\)  | share an exsisting deck      |
| GET  | /shareddecks/:id | Show \(Read\)   | show page with specific deck |
