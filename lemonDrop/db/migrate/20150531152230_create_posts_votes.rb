class CreatePostsVotes < ActiveRecord::Migration
  def change
    create_table :posts_votes do |t|
      t.integer :user_id
      t.integer :comment_id
      t.boolean :vote

      t.timestamps null: false
    end
  end
end
