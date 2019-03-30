
export function exportQbookToExcel()
{
  let title = 'Qbook Selected '
  let style = '\
    <style type="text/css">\
      #exceltbl {\
        border-right: solid 1px gray;\
        border-collapse: collapse;\
      }\
      #exceltbl th {\
        font-size: 16px;\
        font-weight: bold;\
        height: 40px;\
        background-color: #7799AA;\
        color: white;\
        border: solid 1px silver;\
      }\
      #exceltbl td {\
        font-size: 14px;\
        vertical-align: middle;\
        padding-left: 3px;\
        border-left: solid 1px silver;\
        border-bottom: solid 1px silver;\
      }\
      #exceltbl tr.Sunday { background-color: #FFDDEE; }\
      #exceltbl tr.Monday { background-color: #FFFFE0; }\
      #exceltbl tr.Tuesday { background-color: #FFF0F9; }\
      #exceltbl tr.Wednesday { background-color: #EEFFEE; }\
      #exceltbl tr.Thursday { background-color: #FFF7EE; }\
      #exceltbl tr.Friday { background-color: #E7F7FF; }\
      #exceltbl tr.Saturday { background-color: #E7E7FF; }\
\
      #exceltbl td.Sun { background-color: #F099BB; }\
      #exceltbl td.Mon { background-color: #F0F0BB; }\
      #exceltbl td.Tue { background-color: #F0CCEE; }\
      #exceltbl td.Wed { background-color: #CCF0CC; }\
      #exceltbl td.Thu { background-color: #F0DDBB; }\
      #exceltbl td.Fri { background-color: #BBDDF0; }\
      #exceltbl td.Sat { background-color: #CCBBF0; }\
\
    </style>'
  let head = '\
      <table id="excelhead">\
      <tr></tr>\
      <tr>\
        <td></td>\
        <td></td>\
        <td colspan="4" style="font-weight:bold;font-size:24px">' + title + '</td>\
      </tr>\
      <tr></tr>\
      </table>'
  let filename = title + Date.now() + '.xls'

  exportToExcel("capture", title, style, head, filename)    
}

export function exportServiceToExcel()
{
  let title = $('#dialogService').dialog( "option", "title" )
  let style = '\
    <style type="text/css">\
      #exceltbl {\
        border-right: solid 1px gray;\
        border-collapse: collapse;\
      }\
      #exceltbl tr:nth-child(odd) {\
        background-color: #E0FFE0;\
      }\
      #exceltbl th {\
        font-size: 16px;\
        font-weight: bold;\
        height: 40px;\
        background-color: #7799AA;\
        color: white;\
        border: solid 1px silver;\
      }\
      #exceltbl td {\
        font-size: 14px;\
        vertical-align: middle;\
        padding-left: 3px;\
        border-left: solid 1px silver;\
        border-bottom: solid 1px silver;\
      }\
      #excelhead td {\
        height: 30px; \
        vertical-align: middle;\
        font-size: 22px;\
        text-align: center;\
      }\
      #excelhead td.Readmission,\
      #exceltbl tr.Readmission,\
      #exceltbl td.Readmission { background-color: #AACCCC; }\
      #excelhead td.Reoperation,\
      #exceltbl tr.Reoperation,\
      #exceltbl td.Reoperation { background-color: #CCCCAA; }\
      #excelhead td.Infection,\
      #exceltbl tr.Infection,\
      #exceltbl td.Infection { background-color: #CCAAAA; }\
      #excelhead td.Morbidity,\
      #exceltbl tr.Morbidity,\
      #exceltbl td.Morbidity { background-color: #AAAACC; }\
      #excelhead td.Dead,\
      #exceltbl tr.Dead,\
      #exceltbl td.Dead { background-color: #AAAAAA; }\
    </style>'
  let head = '\
      <table id="excelhead">\
      <tr>\
        <td></td>\
        <td></td>\
        <td colspan="4" style="font-weight:bold;font-size:24px">' + title + '</td>\
      </tr>\
      <tr></tr>\
      <tr></tr>\
      <tr>\
        <td></td>\
        <td></td>\
        <td>Admission : ' + $("#Admission").html() + '</td>\
        <td>Discharge : ' + $("#Discharge").html() + '</td>\
        <td>Operation : ' + $("#Operation").html() + '</td>\
        <td class="Morbidity">Morbidity : ' + $("#Morbidity").html() + '</td>\
      </tr>\
      <tr>\
        <td></td>\
        <td></td>\
        <td class="Readmission">Re-admission : ' + $("#Readmission").html() + '</td>\
        <td class="Infection">Infection SSI : ' + $("#Infection").html() + '</td>\
        <td class="Reoperation">Re-operation : ' + $("#Reoperation").html() + '</td>\
        <td class="Dead">Dead : ' + $("#Dead").html() + '</td>\
      </tr>\
      <tr></tr>\
      <tr></tr>\
      </table>'
  let month = $("#monthstart").val()
  month = month.substring(0, month.lastIndexOf("-"))  //use yyyy-mm for filename
  let filename = 'Service Neurosurgery ' + month + '.xls'

  exportToExcel("servicetbl", title, style, head, filename)    
}

export function exportFindToExcel(search)
{
  // getting data from our table
  // IE uses "txt/html", "replace" with blob
  let title = $('#dialogFind').dialog( "option", "title" )
  let style = '\
    <style type="text/css">\
      #exceltbl {\
        border-right: solid 1px gray;\
        border-collapse: collapse;\
      }\
      #exceltbl tr:nth-child(odd) {\
        background-color: #E0FFE0;\
      }\
      #exceltbl th {\
        font-size: 16px;\
        font-weight: bold;\
        height: 40px;\
        background-color: #7799AA;\
        color: white;\
        border: solid 1px silver;\
      }\
      #exceltbl td {\
        font-size: 14px;\
        vertical-align: middle;\
        padding-left: 3px;\
        border-left: solid 1px silver;\
        border-bottom: solid 1px silver;\
      }\
      #excelhead td {\
        height: 30px; \
        vertical-align: middle;\
        font-size: 22px;\
        text-align: center;\
      }\
    </style>'
  let head = '\
      <table id="excelhead">\
      <tr></tr>\
      <tr>\
        <td></td>\
        <td></td>\
        <td colspan="4" style="font-weight:bold;font-size:24px">' + title + '</td>\
      </tr>\
      <tr></tr>\
      </table>'
  let filename = 'Search ' + search + '.xls'

  exportToExcel("findtbl", title, style, head, filename)    
}

export function exportReportToExcel(title)
{
  // getting data from our table
  // IE uses "txt/html", "replace" with blob
  let style = '\
    <style type="text/css">\
      #exceltbl {\
        border-right: solid 1px gray;\
        border-collapse: collapse;\
      }\
      #exceltbl tr:nth-child(odd) {\
        background-color: #E0FFE0;\
      }\
      #exceltbl th {\
        font-size: 16px;\
        font-weight: bold;\
        height: 40px;\
        background-color: #7799AA;\
        color: white;\
        border: solid 1px silver;\
      }\
      #exceltbl td {\
        font-size: 14px;\
        text-align: center;\
        vertical-align: middle;\
        padding-left: 3px;\
        border-left: solid 1px silver;\
        border-bottom: solid 1px silver;\
      }\
      #exceltbl td:first-child {\
        text-align: left;\
      }\
      #exceltbl tr.nonsurgical {\
        background-color: LightGrey;\
      }\
      #exceltbl tr#total {\
        background-color: BurlyWood;\
      }\
      #exceltbl tr#grand {\
        background-color: Turquoise;\
      }\
      #excelhead td {\
        height: 30px; \
        vertical-align: middle;\
        font-size: 22px;\
        text-align: center;\
      }\
    </style>'
  let head = '\
      <table id="excelhead">\
      <tr></tr>\
      <tr>\
        <td colspan="9" style="font-weight:bold;font-size:24px">' + title + '</td>\
      </tr>\
      <tr></tr>\
      </table>'
  let filename = 'Report ' + title + '.xls'

  exportToExcel("reviewtbl", title, style, head, filename)    
}

function exportToExcel(id, title, style, head, filename)
{
  if ($("#exceltbl").length) {
    $("#exceltbl").remove()
  }

  $("#" + id).clone(true).attr("id", "exceltbl").appendTo("body")

  // use only the last class because Excel does not accept multiple classes
  $.each( $("#exceltbl tr"), function() {
    let multiclass = this.className.split(" ")
    if (multiclass.length > 1) {
      this.className = multiclass[multiclass.length-1]
    }
  })

  // remove blank cells in Excel caused by hidden cells
  $.each( $("#exceltbl tr td, #exceltbl tr th"), function() {
    if ($(this).css("display") === "none") {
      $(this).remove()
    }
  })

  let $exceltbl = $("#exceltbl")

  // make line breaks show in single cell
  $exceltbl.find('br').attr('style', "mso-data-placement:same-cell");

  //remove img in equipment
  $exceltbl.find('img').remove();

  let table = $exceltbl[0].outerHTML
  let htmlstr = `<!DOCTYPE html>
                  <HTML>
                    <HEAD><meta charset="utf-8"/>${style}</HEAD>
                    <BODY>${head}${table}</BODY>
                  </HTML>`
  let a = document.createElement('a')
  let data_type = 'data:application/vnd.ms-excel'

  // You need to add this line in FF
  document.body.appendChild(a)
  a.href = data_type + ', ' + encodeURIComponent(htmlstr)
  a.download = filename
  a.click()
/*
//  var workbook = XLSX.utils.table_to_book(document.getElementById('exceltbl'));

//  var htmlstr = document.getElementById('exceltbl').outerHTML;
  var workbook = XLSX.read(encodeURIComponent(htmlstr), {type:'string'});

  var workout = XLSX.write(workbook, {bookType: 'xlsx', bookSST: true, type: 'binary'});

  saveAs(new Blob([s2ab(workout)], {type: "application/octet-stream"}), 'test.xlsx')

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }
*/

/*
  $exceltbl.tableExport({
    formats: ["xlsx", "csv", "txt"]
  })
*/
}
