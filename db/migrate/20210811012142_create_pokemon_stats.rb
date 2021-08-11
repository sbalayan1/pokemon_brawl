class CreatePokemonStats < ActiveRecord::Migration[6.1]
  def change
    create_table :pokemon_stats do |t|
      t.integer :pokemon_id
      t.integer :stat_id
      t.timestamps
    end
  end
end
