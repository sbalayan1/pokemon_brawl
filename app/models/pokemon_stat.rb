class PokemonStat < ApplicationRecord
    belongs_to :stat
    belongs_to :pokemon

    validates :stat_id, presence: true, uniqueness: true
    validates :pokemon_id, presence: true, uniqueness: true
end
