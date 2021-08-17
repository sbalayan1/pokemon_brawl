class AbilitiesSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  has_many :pokemon_abilities
  has_many :pokemon, through: :pokemon_abilities
end
