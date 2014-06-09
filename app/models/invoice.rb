class Invoice < ActiveRecord::Base
	has_many :invoice_items
	belongs_to :user
	belongs_to :customer
	accepts_nested_attributes_for :customer, :invoice_items

	def total
		(sub_total.to_f) + ((sub_total.to_f * self.tax.to_f) / 100)
	end

	def sub_total
		self.invoice_items.map{|ii| ii.total.to_f }.inject(&:+)
	end
end
