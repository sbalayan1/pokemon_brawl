class Trainer < ApplicationRecord
    belongs_to :user
    has_many :pokemon_teams
    has_many :pokemon, through: :pokemon_teams
    has_many :battles

    validates :name, presence: true
    validates :img_url, presence: true
end
