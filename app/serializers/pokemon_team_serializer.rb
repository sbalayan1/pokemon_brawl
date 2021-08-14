class PokemonTeamSerializer < ActiveModel::Serializer
  attributes :id, :pokemon_id, :trainer_id, :team_member

  belongs_to :trainer
  belongs_to :pokemon
end
