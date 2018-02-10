Rails.application.routes.draw do

  root to: 'users#home'

  get '/games' => 'games#index'
  get '/users/new' => 'users#new'
  post '/users' => 'users#create'
  # resources :users

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
