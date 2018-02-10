class User < ApplicationRecord

  has_secure_password
  validates :user_name, presence: true, uniqueness: true

  has_many :games
  has_many :saves, through: :games
end
