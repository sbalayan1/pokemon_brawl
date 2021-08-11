class Pokemon < ApplicationRecord
    has_many :pokemon_teams
    has_many :trainers, through: :pokemon_teams

    has_many :pokemon_moves
    has_many :moves, through: :pokemon_moves

    has_many :pokemon_stats
    has_many :stats, through: :pokemon_stats

    validates :name, presence: true
    validates :level, presence: true
    validates :img_url, presence: true

end
