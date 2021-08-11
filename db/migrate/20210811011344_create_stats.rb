class CreateStats < ActiveRecord::Migration[6.1]
  def change
    create_table :stats do |t|
      t.integer :hp
      t.integer :attack
      t.integer :defense
      t.integer :speed
      t.integer :sp_attack
      t.integer :sp_defense
      t.timestamps
    end
  end
end
