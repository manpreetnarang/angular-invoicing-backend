json.array!(@invoices) do |invoice|
  json.extract! invoice, :id, :customer_id, :logo_base64, :tax
  json.url invoice_url(invoice, format: :json)
end
