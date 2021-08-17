class PokemonType < ApplicationRecord
    belongs_to :type
    belongs_to :pokemon


    validates :pokemon_id, presence: true
    validates :type_id, presence: true
end


