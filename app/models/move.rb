class Move < ApplicationRecord
    has_many :pokemon_moves;
    has_many :pokemons, through: :pokemon_moves;

    validates :name, 
        uniqueness: { case_sensitive: false }, #prevents from recreating move 
        presence: true, 
        format: { 
            with: /\A[A-z ]+\z/, 
            message: "must consist of letters and spaces only" 
        }, 
        length: { in: 2..20 };

    validates :description, 
        presence: true, 
        length: { minimum: 5 };
    
    [:power_points, :power].each do |attribute|
        validates attribute, 
            presence: true, 
            numericality: { 
                only_integer: true, 
                greater_than: 0, 
                message: "must consist of integers only"
            }
    end
end