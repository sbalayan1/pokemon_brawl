class User < ApplicationRecord
    has_many :teams
    has_many :pokemons

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true 
    validates :email_address, presence: true, uniqueness: true
end
