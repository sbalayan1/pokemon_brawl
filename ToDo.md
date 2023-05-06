## Goals/MVC
1. 

## Steps I am taking to refactor, rebuild, and redeploy PokemonBrawl

1. Document goals and MVC.
2. Understand and document schema and get an understanding of the tables and their relationships
3. Update tables via migration, relationships, serializers, models, routes, and controllers. 
4. Write test documentation. Need to go through user journies to figure out user actions.
5. Using user journies/actions, develop backend tests to ensure CRUD actions on data behave correctly.


### TO DO (4/28) **DONE**
1. Delete age column from users table. 
    -> Update seed file and remove age column from User.creates. 
    -> Check user model, controller, validations, and serializer and remove code for age column.
    -> update user endpoints


2. Update trainer table to team table. 
    -> Rename trainer table to team. 
    -> Add user_id foreign key to team table.
    -> Enable cascade functionality so that when a user is deleted all of their teams are deleted
    -> update img_url and gender columns to wins and total battles -> update relationship with teams to user has many teams. 
    -> Rename trainer files to teams
    -> update seed file
    -> Update routes, serializer, model, and controller
    
3. update pokemon_teams table
    -> change trainer_id to team_id
    -> delete team_member column
    -> add foreign keys and cascade option

4. Update Pokemon Table
    -> table updates
        - remove level and wins column
        - rename front and back_image columns to front/back
        - change all columns to not nullable
        - add user_id column, not nullable
        - add user_id foreign key with cascade
    -> serializer should display
        - id
        - name
        - front
        - back
        - user
        - teams
    -> update relationships with users, pokemon_teams, and teams tables
    -> update endpoints and controller methods

5. Drop Battles tables


## TO DO (5/4)
**Done**
1. update Pokemon routes, controller, and model
2. design schema and relationship for Pokemon, PokemonMoves, and Moves
    Pokemon
        name
        front
        back
        user_id
        moves (via pokemon_moves), max size: 4
        hp
        attack
        defense
        speed


    Pokemon_Move
        pokemon_id, cascade: true
        move_id 

    Move
        name
        pp (move_count)
        power 
        description

    resources: moves [:index, :show, :create]

    Pokemon has many moves through pokemon_moves
    Move has many pokemon through pokemon_moves

    -> how will we seed Pokemon and Moves to our database?
        - we don't need to seed pokemon until they are pokemon that a user owns. Whenever a user "catches" a pokemon, we can add a pokemon to our database and say that Pokemon X belongs to User Y. 

        - we should probably have a list of moves that we care about and can lookup. We don't need to grab moves that don't have any pp or don't have any power. We can use this list of moves and seed the moves table by fetching to the pokemon api. We should only seed the moves table once. 

3. create PokemonMoves and Moves table and connect Pokemon to Moves via PokemonMoves
4. Update serializer, model, controller, and routes for:
    - moves
    - pokemon
    - pokemon_moves

5. add hp, attack, speed, defense to Pokemon table 
**Done**

6. Test! **DONE**
    Pokemon
        model *tested*
            name -> must be present, letters only, 2-20 characters
            front -> must be present, must include "https://raw.githubusercontent.com/PokeAPI/sprites/pokemon/"
            back -> must be present, must include "https://raw.githubusercontent.com/PokeAPI/sprites/pokemon/"
            user_id -> must be present, must be a number, 1-10 characters, must be greater than 0, and must be an integer!
            hp -> must be present, must be a number, 1-5 characters
            attack -> must be present, must be a number, 1-5 characters
            defense -> must be present, must be a number, 1-5 characters
            speed -> must be present, must be a number, 1-5 characters

        
        serializer *tested*
            -> when viewing a pokemon, you can see the id, name, front, back, hp, attack, speed, defense, user, teams, and moves

        controller:
            #index *tested*
                -> displays all of the Pokemon in the database
                -> returns an ok status code

            #show *tested*
                -> searches for a pokemon using the param id.
                -> returns a single pokemon with an ok status code
                -> returns a not found error code if no pokemon is found

            #create *tested*
                -> creates a new pokemon and saves it to the database. if successful, returns a new pokemon as json and a created status code
                -> only allows name, front, back, user_id, hp, attack, defense, and speed as parameters
                -> raises an exception and returns an unprocessable entity error if there are too many or missing parameters

            #update *tested*
                -> searches for a pokemon using the id param and returns a not found error code if no pokemon is found
                -> updates the pokemon's attributes using pokemon_params. raises a 400 bad request if no permitted params are sent
                -> returns the updated pokemon as json and an accepted status code

            #destroy *tested*

        

        


