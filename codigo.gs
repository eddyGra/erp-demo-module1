function doPost(e) {
  try{
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheets()[0];
    var filaSiguiente = hoja.getLastRow() + 1;

    var data = JSON.parse(e.postData.contents);

    var nuevaFila = [
      data.operador,
      data.nomina,
      data.fecha,
      data.wo,
      data.modelo,
      data.cantidad,
      data.tipo,
      data.estatus,
      data.comentario,
      "=TODAY() - C" + filaSiguiente,
      data.info
    ];

    hoja.appendRow(nuevaFila);

    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
                          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
                          .setMimeType(ContentService.MimeType.JSON);
  }
  
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheets()[0];
  var datos = hoja.getDataRange().getValues();

  var woBuscada = e.parameter.wo;

  for (var i = 1; i < datos.length; i++) {
    if(datos[i][3] === woBuscada) {
      var resultado ={
        encontrado: true,
        operador: datos[i][0],
        nomina: datos[i][1],
        fecha: datos[i][2],
        wo: datos[i][3],
        modelo: datos[i][4],
        cantidad: datos[i][5],
        tipo: datos[i][6],
        estatus: datos[i][7],
        comentario: datos[i][8],
        info: datos[i][10]
      };

      return ContentService.createTextOutput(JSON.stringify(resultado))
                            .setMimeType(ContentService.MimeType.JSON);
    }
  }

return ContentService.createTextOutput(JSON.stringify({encontrado: false}))
                      .setMimeType(ContentService.MimeType.JSON);
}

