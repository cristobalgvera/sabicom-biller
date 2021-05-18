import {BillerService} from '../service/biller.service';
import {ProductService} from '../service/product.service';

export const Searcher = {searchProductByName, getProductToAddName};

function searchProductByName(name: string) {
  return ProductService.findByName(name);
}

function getProductToAddName(): string {
  const {Producto: Product} = BillerService.getCellPosition();
  return Product.range?.getValue();
}
