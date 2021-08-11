class PokemonMove < ApplicationRecord
    belongs_to :pokemon
    belongs_to :move

    
    validates :move_id, presence: true
    validates :pokemon_id, presence: true
end
