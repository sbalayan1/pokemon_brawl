class UpdatePokemonTeamsTable < ActiveRecord::Migration[6.1]
  def change
    rename_column :pokemon_teams, :trainer_id, :team_id
    change_column_null :pokemon_teams, :team_id, null: false
    change_column_null :pokemon_teams, :pokemon_id, null: false
    remove_column :pokemon_teams, :team_member, :boolean

    add_foreign_key :pokemon_teams, :teams, on_delete: :cascade
    add_foreign_key :pokemon_teams, :pokemons, on_delete: :cascade
  end
end
