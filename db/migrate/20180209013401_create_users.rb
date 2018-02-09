class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.text :user_name
      t.text :password_digest

      t.timestamps
    end
  end
end
