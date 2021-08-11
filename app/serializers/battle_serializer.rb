class BattleSerializer < ActiveModel::Serializer
  attributes :id, :trainer_id, :opponent_id, :win_loss
end
