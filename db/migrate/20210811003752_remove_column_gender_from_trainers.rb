class RemoveColumnGenderFromTrainers < ActiveRecord::Migration[6.1]
  def change
    remove_column :trainers, :gender
  end
end
