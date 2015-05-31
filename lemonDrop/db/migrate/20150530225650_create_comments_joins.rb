class CreateCommentsJoins < ActiveRecord::Migration
  def change
    create_table :comments_joins do |t|
      t.integer :comment_id
      t.integer :post_id

      t.timestamps null: false
    end
  end
end
