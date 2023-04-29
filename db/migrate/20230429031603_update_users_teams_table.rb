class UpdateUsersTeamsTable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :users, :password_digest, null: false
    change_column_null :teams, :name, null: false
    add_column :teams, :user_id, :integer, null: false
    add_foreign_key :teams, :users,  on_delete: :cascade
  end
end
