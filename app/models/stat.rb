class Stat < ApplicationRecord
    has_many :pokemon_stats
    has_many :pokemons, through: :pokemon_stats

    validates :hp, presence: true
    validates :attack, presence: true
    validates :defense, presence: true
    validates :speed, presence: true
    validates :sp_attack, presence: true
    validates :sp_defense, presence: true
end
