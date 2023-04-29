class User < ApplicationRecord
    has_many :teams
    # has_many :battles, through: :trainer
    # has_many :pokemon_teams, through: :trainer

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :first_name, presence: true, uniqueness: true
    validates :last_name, presence: true, uniqueness: true
    validates :email_address, presence: true, uniqueness: true
end
