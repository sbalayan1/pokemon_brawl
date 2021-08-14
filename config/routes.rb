Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/user', to: 'users#show'
  get '/user/:id', to: 'users#find_user'
  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  delete '/pokemon/:id', to: 'pokemon#destroy'
  
  resources :users, only: [:index, :show, :create]
  resources :trainers, only: [:index, :show, :create]
  resources :battles, only: [:index, :show, :create]
  resources :pokemon_teams, only: [:index, :show, :create]
  resources :pokemon, only: [:index, :show, :create, :destroy]
  resources :moves, only: [:index, :show, :create]
  resources :pokemon_moves, only: [:index, :show, :create]
  resources :stats, only: [:index, :show, :create]
  resources :pokemon_stats, only: [:index, :show, :create]
end
