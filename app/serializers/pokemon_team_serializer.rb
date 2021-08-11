class PokemonTeamSerializer < ActiveModel::Serializer
  attributes :id, :pokemon_id, :trainer_id, :team_member
end
