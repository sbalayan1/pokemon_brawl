Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope '/api' do

    ###SESSION ENDPOINTS
    post '/login', to: 'sessions#create' #####endpoint for logging in!!!
    delete '/logout', to: 'sessions#destroy'
    resources :sessions, only: [:index]

    ###USER ENDPOINTS
    post '/signup', to: 'users#create' ####endpoint for signing up!
    get '/current_user', to: 'users#show_current_user'
    resources :users, only: [:index, :show, :destroy]

    ###TEAM ENDPOINTS
    resources :teams, only: [:index, :create, :show, :update, :destroy]

    ###POKEMON TEAMS ENDPOINTS
    # patch '/pokemon_team/:id', to: 'pokemon_teams#update'
    resources :pokemon_teams, only: [:index, :create, :update, :destroy]


    ###POKEMON ENDPOINTS
    # get '/pokemon/:id/front_sprite', to: 'pokemon#front_sprite'
    # get '/pokemon/:id/back_sprite', to: 'pokemon#back_sprite'
    # get '/pokemon/:id/abilities', to: 'pokemon#abilities'
    # get '/pokemon/ability/:name', to: 'pokemon#ability'
    # get '/pokemon/:id/moves', to: 'pokemon#moves'
    # get '/pokemon/move/:name', to: 'pokemon#move'
    resources :pokemon, only: [:index, :create, :show, :update, :destroy]



    ###POKEMON MOVE ENDPOINTS
    resources :pokemon_moves, only: [:index, :create, :show, :update, :destroy]

    ###MOVE ENDPOINTS
    resources :moves, only: [:index, :show, :create]


  end 

  ###The below is used to render our static react page. This will not work until we npm run build and move the contents to our public folder
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end



  

  