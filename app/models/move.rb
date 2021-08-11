class Move < ApplicationRecord
    has_many :pokemon_moves

    # make sure pokemons is plural
    has_many :pokemons, through: :pokemon_moves

    validates :name, presence: true
    validates :power_points, presence: true
    validates :description, presence: true
    validates :power, presence: true
end
