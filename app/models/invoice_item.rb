class InvoiceItem < ActiveRecord::Base
	belongs_to :invoice
	before_save :calculate_total

	def calculate_total
		self.total = self.try(:qty).to_f * self.try(:cost).to_f
	end
end
