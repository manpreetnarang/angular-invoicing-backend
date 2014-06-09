class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :name
      t.string :company_name
      t.string :address1
      t.string :address2
      t.string :postal_code
      t.integer :user_id

      t.timestamps
    end
  end
end
