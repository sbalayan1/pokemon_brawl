class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email_address, :age

  has_one :trainer
  has_many :pokemon_teams, through: :trainer
end
