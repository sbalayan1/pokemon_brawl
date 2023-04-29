class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email_address

  has_many :teams
  has_many :pokemons
  # has_many :pokemon_teams, through: :trainer
end
