import {Action} from './action.worker';
import {Searcher} from './searcher.worker';
import {Writer} from './writer.worker';

export const Assembler = {processProduct};

function processProduct() {
  const productName = Searcher.getProductToAddName();
  const product = Searcher.searchProductByName(productName);

  if (!product) return;

  Writer.addProduct(product);

  Action.resetProduct();
  Action.resetQuantity();
}
