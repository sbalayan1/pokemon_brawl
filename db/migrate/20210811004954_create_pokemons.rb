class CreatePokemons < ActiveRecord::Migration[6.1]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.integer :level
      t.string :img_url
      t.integer :wins
      t.timestamps
    end
  end
end
