class Pokemon < ApplicationRecord
    has_many :pokemon_teams 
    has_many :trainers, through: :pokemon_teams

    has_many :pokemon_moves, dependent: :destroy
    has_many :moves, through: :pokemon_moves

    has_many :pokemon_stats, dependent: :destroy
    has_many :stats, through: :pokemon_stats

    validates :name, presence: true
    validates :level, presence: true
    validates :wins, presence: true
    validates :front_image, presence: true
    validates :back_image, presence: true
end
