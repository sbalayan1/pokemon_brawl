class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :img_url, :wins
end
