class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :post_id
      t.integer :vote
      t.text :content
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
