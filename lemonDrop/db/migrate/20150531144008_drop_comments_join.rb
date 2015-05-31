class DropCommentsJoin < ActiveRecord::Migration
  def change
    drop_table :comments_joins
  end
end
