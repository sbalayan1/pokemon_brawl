class TrainerSerializer < ActiveModel::Serializer
  attributes :id, :name, :gender, :img_url, :user_id
end
