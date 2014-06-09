json.array!(@invoice_items) do |invoice_item|
  json.extract! invoice_item, :id, :invoice_id, :description, :qty, :cost, :total
  json.url invoice_item_url(invoice_item, format: :json)
end
