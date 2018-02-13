class Game < ApplicationRecord

  has_and_belongs_to_many :users
  has_many :saves

  enum character: [:character1, :charcter2, :character3, :character4]

end
