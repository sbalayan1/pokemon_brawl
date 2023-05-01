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
        get '/current_user', to: 'users#show_current_user'
        resources :users, only: [:index, :create, :show, :destroy]


    -> Controller
    -> Serializer