class TrainerSerializer < ActiveModel::Serializer
  attributes :id, :name, :gender, :img_url, :user_id
  
  has_many :pokemon_teams
  has_many :pokemon, through: :pokemon_teams
end
