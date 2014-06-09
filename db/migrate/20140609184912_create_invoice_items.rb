class CreateInvoiceItems < ActiveRecord::Migration
  def change
    create_table :invoice_items do |t|
      t.integer :invoice_id
      t.string :description
      t.float :qty
      t.float :cost
      t.float :total

      t.timestamps
    end
  end
end
