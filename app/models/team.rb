class Team < ApplicationRecord
    belongs_to :user
    has_many :pokemon_teams
    has_many :pokemon, through: :pokemon_teams

    validates :name, presence: true
    validates :user_id, presence: true
end
