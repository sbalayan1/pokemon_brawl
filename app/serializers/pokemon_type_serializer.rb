class PokemonTypeSerializer < ActiveModel::Serializer
  attributes :id, :pokemon_id, :type_id

  belongs_to :pokemon
  belongs_to :type
end
