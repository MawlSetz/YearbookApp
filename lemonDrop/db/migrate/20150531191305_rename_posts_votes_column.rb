class RenamePostsVotesColumn < ActiveRecord::Migration
  def change
    rename_column :posts_votes, :comment_id, :post_id
  end
end
