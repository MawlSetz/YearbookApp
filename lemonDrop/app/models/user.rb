# pushes everything from controller to user from activeRecord
class User < ActiveRecord::Base
  # gives user a has many relationship to posts, destroys all posts if user id deleted
  has_many :posts, dependent: :destroy
  # secures password
	has_secure_password
  # Check that email is present and in the correct format
	validates :email, presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  # Required parameters when creating a new user profile
	validates :first, presence: true
	validates :last, presence: true
	validates :password, length: {minimum: 4, maximum: 16}, on: :create
end
