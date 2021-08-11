class PokemonMoveSerializer < ActiveModel::Serializer
  attributes :id, :pokemon_id, :move_id
end
