class PokemonTeam < ApplicationRecord
    belongs_to :team
    belongs_to :pokemon

    [:team_id, :pokemon_id].each do |attribute|
        validates attribute,
        presence: true, 
        numericality: { 
            only_integer: true, 
            greater_than: 0, 
            message: "must consist of numbers only and be an existing #{attribute}." 
        }, 
        length: { in: 1..10 }  
    end


    # validates :team_id, presence: true, numericality: { only_integer: true, greater_than: 0, message: "must consist of numbers only and be an existing team's id" }, length: { in: 1..10 }

    # validates :pokemon_id, presence: true, numericality: { only_integer: true, greater_than: 0, message: "must consist of numbers only and be an existing pokemon's id" }, length: { in: 1..10 }

end
