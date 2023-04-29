Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope '/api' do

    ###USER ENDPOINTS
    get '/current_user', to: 'users#show_current_user'
    # get '/user/:id', to: 'users#find_user'
    resources :users, only: [:index, :create, :show, :destroy]

    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    delete '/pokemon/:id', to: 'pokemon#destroy'
    patch '/pokemon_team/:id', to: 'pokemon_teams#update'
  
    get '/pokemon/:id/front_sprite', to: 'pokemon#front_sprite'
    get '/pokemon/:id/back_sprite', to: 'pokemon#back_sprite'
    get '/pokemon/:id/abilities', to: 'pokemon#abilities'
    get '/pokemon/ability/:name', to: 'pokemon#ability'
    get '/pokemon/:id/moves', to: 'pokemon#moves'
    get '/pokemon/move/:name', to: 'pokemon#move'
    
    resources :sessions, only: [:index]

    resources :trainers, only: [:index, :show, :create]
    resources :battles, only: [:index, :show, :create]
    resources :pokemon_teams, only: [:index, :show, :create]
    resources :pokemon, only: [:index, :show, :create, :destroy]
  end 

  ###The below is used to render our static react page. This will not work until we npm run build and move the contents to our public folder
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end



  

  