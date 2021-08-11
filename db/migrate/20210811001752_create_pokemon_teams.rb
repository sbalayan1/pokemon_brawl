class CreatePokemonTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :pokemon_teams do |t|
      t.integer :trainer_id
      t.integer :pokemon_id
      t.boolean :team_member
      t.timestamps
    end
  end
end
