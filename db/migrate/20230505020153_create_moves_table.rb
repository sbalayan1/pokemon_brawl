class CreateMovesTable < ActiveRecord::Migration[6.1]
  def change
    create_table :moves do |t|
      t.string :name, null: false
      t.integer :power_points, null: false
      t.integer :power, null: false
      t.string :description, null: false

      t.timestamps
    end
  end
end
