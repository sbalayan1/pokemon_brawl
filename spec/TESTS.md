## Documentation for all tests

## User
    -> Model
        #attributes
            - user instance has username, first_name, last_name, email_address and password_digest.
            - password and password-confirmation are unavailable within the user instance. 
        
        #relationships

        #validations
            - user instances should not be saved without a username, first_name, last_name, email, or password
            

    -> Routes
        post '/signup', to: 'users#create'
            1. creates a new user without password and password confirmation, returns a json response, and responds with a CREATED status code.
            2. does not create a new user with mismatched passwords or missing information and throws an unprocessable_entity error

        get '/current_user', to: 'users#show_current_user'
            1. displays the current user after being authorized and returns an OK status code

        resources :users, only: [:index, :show, :destroy]

    -> Controller
    -> Serializer