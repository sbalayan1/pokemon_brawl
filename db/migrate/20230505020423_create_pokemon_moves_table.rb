class CreatePokemonMovesTable < ActiveRecord::Migration[6.1]
  def change
    create_table :pokemon_moves do |t|
      t.integer :pokemon_id, null: false
      t.integer :move_id, null: false
      t.timestamps
    end

    
    add_foreign_key :pokemon_moves, :pokemons, on_delete: :cascade
    add_foreign_key :pokemon_moves, :moves, on_delete: :cascade
  end
end
