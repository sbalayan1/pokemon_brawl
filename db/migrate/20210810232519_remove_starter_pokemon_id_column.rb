class RemoveStarterPokemonIdColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :trainers, :starter_pokemon_id
  end
end
