class CreateBattles < ActiveRecord::Migration[6.1]
  def change
    create_table :battles do |t|
      t.integer :trainer_id
      t.integer :opponent_id
      t.boolean :win_loss
      t.timestamps
    end
  end
end
