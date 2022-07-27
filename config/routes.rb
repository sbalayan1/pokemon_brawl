Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  scope '/api' do
    get '/user', to: 'users#show'
    get '/user/:id', to: 'users#find_user'
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
    resources :users, only: [:index, :show, :create]
    resources :trainers, only: [:index, :show, :create]
    resources :battles, only: [:index, :show, :create]
    resources :pokemon_teams, only: [:index, :show, :create]
    resources :pokemon, only: [:index, :show, :create, :destroy]
  end 
end
