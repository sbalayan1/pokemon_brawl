class AddColumnGenderToTrainers < ActiveRecord::Migration[6.1]
  def change
    add_column :trainers, :gender, :boolean
  end
end
