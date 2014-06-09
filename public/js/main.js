function InvoiceController($scope, $http) {

  $scope.logoRemoved = false;
  $scope.printMode = false;

  var sample_invoice = {
            tax: 13.00, 
            customer:  {name: "Mr. John Doe", company_name: "John Doe Designs Inc.", address1: "1 Infinite Loop", address2: "Cupertino, California, US", postal_code: "90210"},
            company:  {name: "Metaware Labs", company_name: "www.metawarelabs.com", address1: "123 Yonge Street", address2: "Toronto, ON, Canada", postal_code: "M5S 1B6"},
              invoice_items:[ {qty:10, description:'Gadget', cost:9.95}]};

  $scope.reload_invoices = function(){
    $http({method: 'GET', url: '/api/invoices.json'}).
      success(function(data, status, headers, config) {
        $scope.invoices = data;
    }).
      error(function(data, status, headers, config) {
        if(data == "login"){
          window.location = "/users/sign_in"
        }
    });
  }

  $scope.reload_customers = function(){
    $http({method: 'GET', url: '/api/customers.json'}).
      success(function(data, status, headers, config) {
        $scope.customers = data;
    }).
      error(function(data, status, headers, config) {
        if(data == "login"){
          window.location = "/users/sign_in"
        }
    });
  }

  $scope.reload_invoices();
  $scope.reload_customers();

  $scope.addItem = function() {
      $scope.invoice.invoice_items.push({qty:0, cost:0, description:""});    
  }

  $scope.update_customer_id = function() {
    $scope.invoice.customer_id = $scope.customer.id;
  }

  $scope.delete_invoice = function(invoice) {
    var deleting = confirm("Are you sure you want to delete this invoice?");
    if(deleting){
      $http({method: 'DELETE', url: '/api/invoices/'+ invoice.id +'.json'}).
        success(function(data, status, headers, config) {
          $scope.reload_invoices();
          alert("Invoice deleted successfully!");

      }).
        error(function(data, status, headers, config) {
          alert("error occured!");
      });
    }
  }

  $scope.open_invoices_list = function(){
    $scope.invoice = null;
  }

  $scope.new_invoice = function(){
    $scope.invoice = sample_invoice;
  }

  $scope.select_invoice = function(invoice) {
      $scope.invoice = invoice;
      $scope.customer = invoice.customer;
  }
  $scope.removeLogo = function(element) {
      var elem = angular.element("#remove_logo");
      if(elem.text() == "Show Logo"){
        elem.text("Remove Logo");
        $scope.logoRemoved = false;
      }
      else{
        elem.text("Show Logo");
        $scope.logoRemoved = true;
      }
  }

  $scope.editLogo = function(){
    $("#imgInp").trigger("click");
  }

  $scope.showLogo = function() {
      $scope.logoRemoved = false;
  }
  $scope.removeItem = function(item) {
      $scope.invoice.invoice_items.splice($scope.invoice.invoice_items.indexOf(item), 1);    
  }
  
  $scope.invoice_sub_total = function() {
      var total = 0.00;
      angular.forEach($scope.invoice.invoice_items, function(item, key){
        total += (item.qty * item.cost);
      });
      return total;
  }
  $scope.calculate_tax = function() {
      return (($scope.invoice.tax * $scope.invoice_sub_total())/100);
  }
  $scope.calculate_grand_total = function() {
      // localStorage["invoice"] = JSON.stringify($scope.invoice);
      return $scope.calculate_tax() + $scope.invoice_sub_total();
  } 

  $scope.save_invoice = function(){
    var invoice = jQuery.extend(true, {}, $scope.invoice);
    delete invoice.company;
    delete invoice.customer;
    if(invoice.id){
      $http({method: 'PUT', url: '/api/invoices/'+ $scope.invoice.id +'.json', data: {invoice: invoice}}).
        success(function(data, status, headers, config) {
          $scope.reload_invoices();
          alert("saved successfully!");

      }).
        error(function(data, status, headers, config) {
          alert("error occured!");
      });
    }
    else{
      $http({method: 'POST', url: '/api/invoices.json', data: {invoice: invoice}}).
        success(function(data, status, headers, config) {
          $scope.reload_invoices();
          alert("Invoice added successfully!");
      }).
        error(function(data, status, headers, config) {
          alert("error occured!");
      });
    }
  }

  $scope.printInfo = function() {
    window.print();
  }

  $scope.clearLocalStorage = function(){
    var confirmClear = confirm("Are you sure you would like to clear the invoice?");
    if(confirmClear){
      localStorage["invoice"] = "";
      $scope.invoice = sample_invoice;
    }
  }
};

angular.module('jqanim', []).directive('jqAnimate', function(){ 
  return function(scope, instanceElement){ 
      setTimeout(function() {instanceElement.show('slow');}, 0); 
  } 
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#company_logo').attr('src', e.target.result);
            scope = angular.element('#company_logo').scope();
            scope.invoice.logo_base64 = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// window.onbeforeunload = function(e) {
//   confirm('Are you sure you would like to close this tab? All your data will be lost');
// };

$(document).ready(function(){
  $("#invoice_number").focus();
  $("#imgInp").change(function(){
    readURL(this);
  });
});