class PokemonTeamSerializer < ActiveModel::Serializer
  attributes :team_id, :pokemon_id

  belongs_to :team
  belongs_to :pokemon
end
