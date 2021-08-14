class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :wins, :front_image, :back_image

  has_many :pokemon_moves
  has_many :moves, through: :pokemon_moves
  has_many :pokemon_stats
  has_many :stats, through: :pokemon_stats
end
