class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :wins, :total_battles,
  
  belongs_to :user
  has_many :pokemon, through: :pokemon_teams
end
