class MoveSerializer < ActiveModel::Serializer
  attributes :id, :name, :power_points, :power, :description
end
