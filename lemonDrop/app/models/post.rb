# pushes everything from controller to post from activeRecord
class Post < ActiveRecord::Base
  # describes relationship between user and post. U has many posts, post belongs to only one user
  belongs_to :user
  has_many :comments, dependent: :destroy, inverse_of: :post
end
