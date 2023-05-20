require 'pry'

class PokemonMove < ApplicationRecord
    belongs_to :pokemon
    belongs_to :move
    
    validate :isNotUsed
    
    [:move_id, :pokemon_id].each do |attribute|
        validates attribute,
        presence: true, 
        numericality: { 
            only_integer: true, 
            greater_than: 0, 
            message: "must consist of numbers only and be an existing #{attribute}." 
        }, 
        length: { in: 1..10 }  
    end


    # validates :move_id, 
    #     presence: true, 
    #     numericality: { 
    #         only_integer: true, 
    #         greater_than: 0, 
    #         message: "must consist of numbers only and be an existing move's id" 
    #     }, 
    #     length: { in: 1..10 }

    # validates :pokemon_id, presence: true, numericality: { only_integer: true, greater_than: 0, message: "must consist of numbers only and be an existing pokemon's id" }, length: { in: 1..10 }


    # user should be able to create a relationship if and only if
        # 1) the pokemon has less than 4 moves associated
        # 2)the pokemon does not already have an association with that move

    def isNotUsed() 
        moves = Pokemon.find(pokemon_id).moves
        errors.add(:move_id, "is already taken!") unless moves.length < 4 && !moves.find_by(id: move_id)
    end

end