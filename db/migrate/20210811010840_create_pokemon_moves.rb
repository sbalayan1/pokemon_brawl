class CreatePokemonMoves < ActiveRecord::Migration[6.1]
  def change
    create_table :pokemon_moves do |t|
      t.integer :pokemon_id
      t.integer :move_id
      t.timestamps
    end
  end
end
