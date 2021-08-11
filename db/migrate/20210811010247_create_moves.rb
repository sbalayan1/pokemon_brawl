class CreateMoves < ActiveRecord::Migration[6.1]
  def change
    create_table :moves do |t|
      t.string :name
      t.integer :power_points
      t.string :description
      t.integer :power
      t.timestamps
    end
  end
end
