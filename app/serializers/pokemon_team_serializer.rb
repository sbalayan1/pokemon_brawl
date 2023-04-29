class PokemonTeamSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :team
  belongs_to :pokemon
end
