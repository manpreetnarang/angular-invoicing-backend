class CreateInvoices < ActiveRecord::Migration
  def change
    create_table :invoices do |t|
      t.integer :customer_id
      t.text :logo_base64
      t.float :tax

      t.timestamps
    end
  end
end
