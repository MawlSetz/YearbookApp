class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.integer :vote
      t.text :content
      t.text :tags

      t.timestamps null: false
    end
  end
end
