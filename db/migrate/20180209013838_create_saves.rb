class CreateSaves < ActiveRecord::Migration[5.1]
  def change
    create_table :saves do |t|
      t.text :slot_1
      t.text :slot_2
      t.text :slot_3

      t.timestamps
    end
  end
end
