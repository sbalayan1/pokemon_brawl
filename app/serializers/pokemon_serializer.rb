class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :name, :front, :back, :hp, :attack, :defense, :speed

  belongs_to :user
  has_many :teams, through: :pokemon_teams
  has_many :moves, through: :pokemon_moves
end
