export const ProductService = {findByName, getHeaderNumbers};

function findByName(name: string) {
  const {products, headers} = _getSheetValues();

  const nameColumn = headers?.indexOf('Nombre');

  return nameColumn
    ? products?.find(product => product[nameColumn] === name)
    : undefined;
}

function getHeaderNumbers(): {[header: string]: number} | undefined {
  const {headers} = _getSheetValues();

  return headers?.reduce((acc, header, i) => ({...acc, [header]: i + 1}), {});
}

function _getSheetValues() {
  const spreadsheet = SpreadsheetApp.openById(
    '1Ki40RMzEnRZQSZRA301idgd8YXiqrPUPLLK3UvddL3w'
  );
  const sheet = spreadsheet.getSheetByName('Productos');

  const products: string[][] | undefined = sheet?.getDataRange().getValues();
  const headers = products?.splice(0, 1)[0];

  return {products, headers};
}
