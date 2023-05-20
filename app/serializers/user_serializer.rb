class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email_address
  has_many :teams
  has_many :pokemons
  
end
