class UpdateTrainersTable < ActiveRecord::Migration[6.1]
  def change
    rename_table :trainers, :teams
    remove_column :teams, :user_id
    remove_column :teams, :img_url
    remove_column :teams, :gender
    add_column :teams, :wins, :integer, default: 0, null: false
    add_column :teams, :total_battles, :integer, default: 0, null: false
  end

end
