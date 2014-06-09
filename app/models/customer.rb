class Customer < ActiveRecord::Base
	belongs_to :invoice
	has_many :user
end
