json.array!(@customers) do |customer|
  json.extract! customer, :id, :name, :company_name, :address1, :address2, :postal_code
  json.url customer_url(customer, format: :json)
end
