class MoveSerializer < ActiveModel::Serializer
    attributes :id, :name, :power_points, :power, :description
  
    # has_many :pokemon_moves
    has_many :pokemons, through: :pokemon_moves
  end
  