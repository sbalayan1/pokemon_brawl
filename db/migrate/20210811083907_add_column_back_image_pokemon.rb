class AddColumnBackImagePokemon < ActiveRecord::Migration[6.1]
  def change
    add_column :pokemons, :back_image, :string
  end
end
