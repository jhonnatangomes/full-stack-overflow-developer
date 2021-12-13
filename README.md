# Full-stack overflow developer

This project is a RESTful API built with TypeScript. You can ask and answers questions with the endpoints described below.

### How to run

Clone the repository in your computer and head over to the newly created directory:

    git clone https://github.com/jhonnatangomes/full-stack-overflow-developer
    cd full-stack-overflow-developer

Then, install dependencies:

    npm install

After everything has been installed, enter in createDB folder and run create-databases script:

    cd createDB
    bash create-databases

You might be prompted to type in your password. After everything is done you can use the connect-database scripts to connect to database:

    bash connect-database
    bash connect-database-test

To start project in development database, just navigate to project root folder and do:

    npm run start:dev

To open project in test database with watch enabled, do:

    npm run test:watch

To just run tests a single time do:

    npm run test

#### Destroying databases

If you want to delete databases at any time, you can just run destroy-database script in createDB folder with:

    bash destroy-databases

## Endpoints

<details>
<summary>POST /questions</summary>
Adds a new question. Expects body in format

    {
        "question": "Whats the best place on earth?",
        "student": "Jhonn",
        "class": "T3",
        "tags": "life, existence, earth"
    }

Returns the id of the added question

    {
        "id": 12
    }

</details>

<details>
<summary>GET /questions/:id</summary>
Returns the asked question. If the question is unanswered, it will respond in the format

    {
        "question": "Whats the best place on earth?",
        "student": "Jhonn",
        "class": "T3",
        "tags": "life, existence, earth",
        "answered": false,
        "submittedAt": "2021-12-13 11:36"
    }

If question is answered, it will respond in the format

    {
        "question": "Whats the best place on earth?",
        "student": "Jhonn",
        "class": "T3",
        "tags": "life, existence, earth",
        "answered": true,
        "submittedAt": "2021-12-13 11:36",
        "answeredAt": "2021-12-14 18:34",
        "answeredBy": "Gomium",
        "answer": "It certainly is Brazil"
    }

</details>

<details>
<summary>POST /questions/:id</summary>
Answers the question with the specified id. This route expects a Bearer token as a header to identify who's answering the question. Expects body in format

    {
        "answer": "It certainly is Brazil"
    }

</details>

<details>
<summary>GET /questions</summary>
Returns an array containing all unanswered questions ordered by id

    [
        {
            "id": 12
            "question": "Whats the best place on earth?",
            "student": "Jhonn",
            "class": "T3",
            "submittedAt": "2021-12-13 11:36"
        },
        ...
    ]

</details>

<details>
<summary>POST /users</summary>
Registers a new user. Expects body in format

    {
        "name": "Gomium",
        "class": "T100"
    }

It will respond with a token associated with that user, that can be used to answer questions

    {
        "token": "10c605de-7781-4445-92fb-27761ca0e4fc"
    }

</details>

<details>
<summary>GET /ranking</summary>
Returns the top 10 people that answered the most amount of questions and the amount they answered

    [
        {
    	    "name": "Gomium",
    	    "answers": 175
        },
        {
    	    "name": "Jhonn",
    	    "answers": 132
        }
    ]

</details>

<details>
<summary>PUT /questions/:id/up-vote</summary>
Increases a question score by 1. All questions are posted with an initial score of 1.
</details>

<details>
<summary>PUT /questions/:id/down-vote</summary>
Decreases a question score by 1.
</details>

<details>
<summary>GET /ranking/weighted</summary>
Returns the top 10 people ranked by the attribute points. This is the sum of all the scores of the answered questions by each person.

    [
        {
    	"name": "Jhonn",
    	"answers": 132,
            "points": 210
        },
        {
    	"name": "Gomium",
    	"answers": 175,
            "points": 195
        }
    ]

</details>
