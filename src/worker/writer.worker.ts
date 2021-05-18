import {BillerService} from '../service/biller.service';
import {ProductService} from '../service/product.service';

export const Writer = {addProduct};

function addProduct(product: (string | number)[], howMany?: number) {
  const sheet = BillerService.getBillerSheet();
  const headers = ProductService.getHeaderNumbers();
  const {
    Unidades: {row, column},
    Cantidad: {range: quantity},
  } = BillerService.getCellPosition();

  if ((!row && row !== 0) || (!column && column !== 0) || !quantity || !headers)
    return;

  const products = sheet
    ?.getRange(
      row + 1,
      column + 1,
      sheet.getLastRow() - row + 1,
      sheet.getLastColumn() - column
    )
    .getValues();

  if (!products) return;

  const toAdd: number = howMany ?? (quantity.getValue() || 1);

  const addedProduct = products.find(
    addedProduct =>
      addedProduct[headers['Código']] === product[headers['Código'] - 1]
  );

  if (addedProduct) {
    addedProduct[0] += toAdd;
    addedProduct[addedProduct.length - 1] =
      +addedProduct[0] * +addedProduct[headers['Precio']];
  } else {
    product.unshift(toAdd);
    product.push(+product[0] * +product[headers['Precio']]);
    products?.unshift(product);
  }

  const validProducts = products.filter(
    product => !product.every(value => !value)
  );

  sheet
    ?.getRange(
      row + 1,
      column + 1,
      validProducts?.length,
      validProducts[0].length
    )
    .setValues(validProducts);
}
