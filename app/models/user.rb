class User < ApplicationRecord
    has_one :trainer
    has_many :battles, through: :trainer

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :first_name, presence: true, uniqueness: true
    validates :last_name, presence: true, uniqueness: true
    validates :email_address, presence: true, uniqueness: true
    validates :age, presence: true
end
