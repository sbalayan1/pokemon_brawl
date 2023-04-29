## USER TABLE
    -> id int
    -> username string
    -> first_name string
    -> last_name string
    -> email_address string
    -> password_digest string

### User Relationships
    user -> trainer: user has one trainer
    user -> trainer -* battles: user has many battles through trainer
    user -> trainer -* pokemon_teams: user has many pokemon_teams through trainer 

### User Stories/Actions -> WHAT SHOULD THE USER BE ABLE TO DO?
    --> CRUD Actions for Pokemon Teams
        1. User should be able to create a Pokemon Teams
        2. User can view their Pokemon Teams
        3. User should be able to update a Pokemon Teams
        4. User should be able to delete a Pokemon Teams

    --> User can create and delete their account
    --> User should be able to see their wins and losses.
        -> S1: User gathers all of its wins and losses from their Pokemon Teams
        -> S2: User has a row of wins/losses/total battles that gets updated
 
### Endpoints
    get /api/user => is this endpoint necessary?
    get /api/user/:id => shows a single user
    get /api/users => shows all users. method should only be available in development. not in production

    post /api/users => creates a new user and adds to database
    delete /api/users/:id => deletes user from database


### TO DO
    1. delete age column from users table. 
        -> Update seed file and remove age column from User.creates. 
        -> Check user model, controller, validations, and serializer and remove code for age column.
    2. delete trainer table. relationship is unnecessary
    3. Add user_id foreign key to pokemon_team table. update relationship with pokemon_teams to user has many pokemon_teams. 
    4. Update user endpoints


## POKEMON_TEAMS TABLE
    -> id int primary key
    -> user_id int foreign key
    -> pokemon_one_id int
    -> pokemon_two_id int
    -> pokemon_three_id int
    -> pokemon_four_id int
    -> pokemon_five_id int
    -> pokemon_six_id int
    -> pokemon_seven_id int

### POKEMON_TEAMS RELATIONSHIPS
    pokemon_team <- user: pokemon team belongs to a user. pokemon team has one user

### POKEMON_TEAMS STORIES/ACTIONS -> WHAT CAN WE DO WITH POKEMON_TEAMS?
    --> CRUD Actions for Pokemon Teams
        1. create a Pokemon Teams.
        2. read/view their Pokemon Teams
        3. update a pokemon team
        4. delete their pokemon team

    --> User should only be able to view THEIR pokemon team??

### ENDPOINTS
    ## note we need to use hyphens when creating the endpoints and not underscores

    post /api/pokemon-teams => creates a new pokemon team. 
        - There must be at least one pokemon associated with the table upon creation
        - all other values will initially be set to null
        
    get /api/pokemon-teams/:id => shows one pokemon team. Typically associated with 1 user
    patch /api/pokemon-teams/:id => updates a property of the pokemon team. 
    delete /api/pokemon-teams/:id => deletes a pokemon team. 

### TO DO

### NOTES
    4/28 - currently working through a database update. Thinking through how I want to utilize the pokemon teams table along with the user table. So far I've deleted the trainers table because it's an unnecessary join between the user table and the pokemon team. Further, I am updating the pokemon-teams table to belong to a user and hold 7 rows for each pokemon that belongs to the team. This way, we can find a user's team by looking up each of the pokemon ids

    Eventually if we want the user to be able to edit a pokemon's moves, we have to create a pokemons table.
