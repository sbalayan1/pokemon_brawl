class UpdateUsersTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :age
    change_column_null :users, :username, false
    change_column_null :users, :first_name, false
    change_column_null :users, :last_name, false
    change_column_null :users, :email_address, false
  end
end
