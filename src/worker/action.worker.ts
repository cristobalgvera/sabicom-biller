import {BillerService} from '../service/biller.service';

export const Action = {resetCustomer, resetProduct, resetQuantity};

function resetCustomer() {
  const {Cliente: Customer} = BillerService.getCellPosition();
  Customer.range?.clearContent();
}

function resetProduct() {
  const {Producto: Product} = BillerService.getCellPosition();
  Product.range?.clearContent();
}

function resetQuantity() {
  const {Cantidad: Quantity} = BillerService.getCellPosition();
  Quantity.range?.setValue(1);
}
