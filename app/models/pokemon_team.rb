class PokemonTeam < ApplicationRecord
    belongs_to :trainer
    belongs_to :pokemon

    validates :trainer_id, presence: true
    validates :pokemon_id, presence: true
end
