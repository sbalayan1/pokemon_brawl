class DropBattlesTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :battles
  end
end
