class CreateCommentsVotes < ActiveRecord::Migration
  def change
    create_table :comments_votes do |t|
      t.integer :user_id
      t.integer :comment_id
      t.boolean :vote

      t.timestamps null: false
    end
  end
end
