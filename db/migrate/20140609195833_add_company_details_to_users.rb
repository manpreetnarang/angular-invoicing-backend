class AddCompanyDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :company_name, :string
    add_column :users, :address1, :string
    add_column :users, :address2, :string
    add_column :users, :postal_code, :string
  end
end
