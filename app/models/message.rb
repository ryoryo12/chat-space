class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :messages
  validates :content, presence: true, unless: :image?
end
