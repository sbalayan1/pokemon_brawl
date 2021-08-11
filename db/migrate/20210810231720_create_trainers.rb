class CreateTrainers < ActiveRecord::Migration[6.1]
  def change
    create_table :trainers do |t|
      t.string :name
      t.boolean :gender
      t.string :img_url
      t.integer :user_id
      t.integer :starter_pokemon_id
      t.timestamps
    end
  end
end
