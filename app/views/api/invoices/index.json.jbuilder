json.array! @invoices do |invoice|
  json.logo_base64 invoice.logo_base64
  json.id invoice.id
  json.tax invoice.tax
  json.customer_id invoice.customer_id
  json.customer invoice.customer
  json.invoice_items invoice.invoice_items
  json.total invoice.total
  json.company invoice.user
end