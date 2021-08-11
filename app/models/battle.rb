class Battle < ApplicationRecord
    belongs_to :trainer

    validates :trainer_id, presence: true
    validates :opponent_id, presence: true
end
