class RenameImgUrlColumnPokemon < ActiveRecord::Migration[6.1]
  def change
    rename_column :pokemons, :img_url, :front_image
  end
end
