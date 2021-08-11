class AddGenderColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :trainers, :gender, :string
  end
end
