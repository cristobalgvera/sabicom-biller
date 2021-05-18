type Range = GoogleAppsScript.Spreadsheet.Range;

export const BillerService = {getBillerSheet, getCellPosition};

function getBillerSheet() {
  const spreadsheet = SpreadsheetApp.openById(
    '1Ki40RMzEnRZQSZRA301idgd8YXiqrPUPLLK3UvddL3w'
  );
  return spreadsheet.getSheetByName('Facturador');
}

type Position = {
  [cellName: string]: {
    row?: number;
    column?: number;
    A1Notation?: string;
    range?: Range;
  };
};

function getCellPosition() {
  const sheet = BillerService.getBillerSheet();
  const values: string[][] | undefined = sheet?.getDataRange().getValues();

  const position: Position = {
    Cliente: {},
    Producto: {},
    Unidades: {},
    Cantidad: {},
  };

  values?.forEach((row, i) => {
    if (row.every(el => !el)) return;

    row.forEach((column, j) => {
      if (!column) return;

      const searched = position[String(column)];
      if (!searched) return;

      searched.row = i + 1;
      searched.column = j;
      searched.A1Notation = `${String.fromCharCode(65 + j)}${searched.row + 1}`; // "Notation A4, B6, C3..."
      searched.range = sheet?.getRange(searched.A1Notation);
    });
  });

  return position;
}
