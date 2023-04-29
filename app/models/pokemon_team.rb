class PokemonTeam < ApplicationRecord
    belongs_to :team
    belongs_to :pokemon

    validates :team_id, presence: true
    validates :pokemon_id, presence: true
end
