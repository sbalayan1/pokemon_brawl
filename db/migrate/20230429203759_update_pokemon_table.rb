class UpdatePokemonTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :pokemons, :level
    remove_column :pokemons, :wins
    rename_column :pokemons, :front_image, :front
    rename_column :pokemons, :back_image, :back
    change_column_null :pokemons, :name, null: false
    change_column_null :pokemons, :front, null: false
    change_column_null :pokemons, :back, null: false
    add_column :pokemons, :user_id, :integer, null: false

    add_foreign_key :pokemons, :users, on_delete: :cascade

  end
end
