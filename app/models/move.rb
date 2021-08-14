class Move < ApplicationRecord
    has_many :pokemon_moves
    # make sure pokemons is plural
    has_many :pokemons, through: :pokemon_moves

end
