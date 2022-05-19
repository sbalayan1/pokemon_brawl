class RemoveTables < ActiveRecord::Migration[6.1]
  def change
    drop_table :types
    drop_table :pokemon_types
    drop_table :abilities
    drop_table :pokemon_abilities
    drop_table :moves
    drop_table :pokemon_moves
    drop_table :stats
    drop_table :pokemon_stats
  end
end
