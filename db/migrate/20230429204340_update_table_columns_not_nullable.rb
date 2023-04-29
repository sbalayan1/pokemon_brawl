class UpdateTableColumnsNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :pokemon_teams, :team_id, false
    change_column_null :pokemon_teams, :pokemon_id, false
    change_column_null :pokemons, :name, false
    change_column_null :pokemons, :front, false
    change_column_null :pokemons, :back, false
    change_column_null :users, :password_digest, false
    change_column_null :teams, :name, false
  end
end
