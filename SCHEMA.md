## USER TABLE
    -> id int
    -> username string not null
    -> first_name string not null
    -> last_name string not null
    -> email_address string not null
    -> password_digest string not null

### User Relationships
**REMOVING**
    user -> trainer: user has one trainer 
    user -> trainer -* battles: user has many battles through trainer 
    user -> trainer -* pokemon_teams: user has many pokemon_teams through trainer 

**updated**
    user -* teams: user has many teams
    user -* pokemon: user has many pokemon
        -> Why? This way the user is able to look directly at their pokemon, NOT just through their teams
    
    user -* teams -* pokemon_teams: user has many pokemon_teams through teams
    user -* teams -* pokemon_teams -* pokemon : user has many pokemon through pokemon_teams/teams

### User Stories/Actions -> WHAT SHOULD THE USER BE ABLE TO DO?
    --> User can create and delete their account
    --> User should be able to see their wins and losses.
        -> S1: User gathers all of its wins and losses from its teams
        -> S2: User has a row of wins/losses/total battles that gets updated
 
### Endpoints
    get /api/user => is this endpoint necessary?
    get /api/user/:id => shows a single user
    get /api/users => shows all users. 
        - method should only be available in development. not in production

    post /api/users => creates a new user and adds to database
    delete /api/users/:id => deletes user from database














## TEAMS TABLE
    -> id int primary key
    -> name string not null
    -> wins int not null
    -> total_battles int not null
    -> user_id int foreign key not null

### TEAMS RELATIONSHIPS
    team <- user: a team belongs to a user. a team has one user
    team -* pokemon_teams: team has many pokemon_teams
    team -* pokemon_teams *- pokemon: team has many pokemon through pokemon_teams

### TEAMS STORIES/ACTIONS -> WHAT CAN WE DO WITH TEAMS?
    --> CRUD Actions for Teams
        1. create a Teams.
        2. read/view their Teams
        3. update a team
        4. delete their team

    --> User should only be able to view THEIR pokemon team??

### ENDPOINTS
    post /api/teams => creates a new pokemon team. 
        - There must be at least one pokemon associated with the table upon creation
        - all other values will initially be set to null

    get /api/teams/:id => shows one pokemon team. Typically associated with 1 user
    patch /api/teams/:id => updates a property of the pokemon team. 
    delete /api/teams/:id => deletes a pokemon team. 


















## POKEMON TEAMS TABLE
    -> id int primary key
    -> team_id int foreign key
    -> pokemon_id int foreign key

## POKEMON TEAMS RELATIONSHIPS
    pokemon_team <- pokemon: pokemon team belongs to pokemon
    pokemon_team <- team: pokemon team belongs to team






## Pokemon Table
    -> id int primary key
    -> name string not null
    -> user_id int foreign key not null
    -> front_image string not null
    -> back_image string not null
    

## POKEMON RELATIONSHIPS
    pokemon -* pokemon_teams: pokemon has many pokemon_teams
    pokemon <- user: pokemon belongs to a user
    pokemon -* pokemon_teams *- teams: pokemon has many teams through pokemon_teams


A pokemon can belong to multiple teams but STILL BELONGS TO ONE UNIQUE USER

### NOTES
    4/28 - currently working through a database update. Thinking through how I want to utilize the pokemon teams table along with the user table. So far I've deleted the trainers table because it's an unnecessary join between the user table and the pokemon team. Further, I am updating the pokemon-teams table to belong to a user and hold 7 rows for each pokemon that belongs to the team. This way, we can find a user's team by looking up each of the pokemon ids

    Eventually if we want the user to be able to edit a pokemon's moves, we have to create a pokemons table.



### TO DO (4/28)
**DONE**
1. Delete age column from users table. 
    -> Update seed file and remove age column from User.creates. 
    -> Check user model, controller, validations, and serializer and remove code for age column.
    -> update user endpoints
**DONE**
2. Update trainer table to team table. 
    -> Rename trainer table to team. 
    -> Add user_id foreign key to team table.
    -> Enable cascade functionality so that when a user is deleted all of their teams are deleted
    -> update img_url and gender columns to wins and total battles -> update relationship with teams to user has many teams. 
    -> Rename trainer files to teams
    -> update seed file
    -> Update routes, serializer, model, and controller
**DONE**
3. update pokemon_teams table
    -> change trainer_id to team_id
    -> delete team_member column
    -> add foreign keys and cascade option

4. Update Pokemon Table
5. Drop Battles tables