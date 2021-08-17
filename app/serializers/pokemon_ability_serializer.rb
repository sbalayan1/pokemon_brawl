class PokemonAbilitySerializer < ActiveModel::Serializer
  attributes :id, :pokemon_id, :ability_id

  belongs_to :pokemon
  belongs_to :ability
end
