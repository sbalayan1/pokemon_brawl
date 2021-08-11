class StatSerializer < ActiveModel::Serializer
  attributes :id, :hp, :attack, :defense, :speed, :sp_attack, :sp_defense
end
