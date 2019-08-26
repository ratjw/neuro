
export function exportQbookToExcel()
{
  let title = 'Operative Schedule'
  let style = '\
    <style type="text/css">\
      #exceltbl thead td {\
        border: none;\
        font-weight:bold;\
        font-size:24px;\
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
        border: solid 1px silver;\
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
  let head = `<thead id="excelhead">
      <tr></tr>
      <tr>
        <td></td><td></td><td></td><td></td><td></td>
        <td colspan="4">${title}</td>
      </tr>
      <tr></tr>
      </thead>`
  let filename = `${title} ${Date.now()}.xls`

  exportToExcel("#capture", style, head, filename)
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
        height: 100px; \
        vertical-align: middle;\
        font-size: 30px;\
        text-align: center;\
        color: #333333;\
        background-color: #DDDDDD;\
        border: none;\
      }\
      #exceltbl tr.Readmission,\
      #exceltbl td.Readmission { background-color: #AACCCC; }\
      #exceltbl tr.Reoperation,\
      #exceltbl td.Reoperation { background-color: #CCCCAA; }\
      #exceltbl tr.Infection,\
      #exceltbl td.Infection { background-color: #CCAAAA; }\
      #exceltbl tr.Morbidity,\
      #exceltbl td.Morbidity { background-color: #AAAACC; }\
      #exceltbl tr.Dead,\
      #exceltbl td.Dead { background-color: #AAAAAA; }\
    </style>'
  let head = `<thead id="excelhead">
      <tr></tr>
      <tr>
        <td colspan="9">${title}</td>
      </tr>
      </thead>`
  //use yyyy-mm for filename
  let month = $("#monthstart").val()
  month = month.substring(0, month.lastIndexOf("-"))
  let filename = `Service Neurosurgery ${month}.xls`

  exportToExcel("#servicetbl", style, head, filename)
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
        height: 100px; \
        vertical-align: middle;\
        font-size: 30px;\
        text-align: center;\
        color: #333333;\
        background-color: #DDDDDD;\
        border: none;\
      }\
    </style>'
  let head = `<thead id="excelhead">
      <tr></tr>
      <tr>
        <td colspan="10">${title}</td>
      </tr>
      </thead>`
  let filename = `Search ${search}.xls`

  exportToExcel("#findtbl", style, head, filename)
}

export function exportReportToExcel(title)
{
  // getting data from our table
  // IE uses "txt/html", "replace" with blob
  let style = '\
    <style type="text/css">\
      #excelhead {\
        font-size: 22px;\
      }\
      div {\
        width: auto;\
        text-align: center;\
        font-size: 18px;\
      }\
      table {\
        border: solid 1px gray;\
        border-collapse: collapse;\
      }\
      th {\
        font-size: 16px;\
        font-weight: bold;\
        height: 40px;\
        background-color: #7799AA;\
        color: white;\
        border: solid 1px silver;\
      }\
      td {\
        font-size: 14px;\
        text-align: center;\
        vertical-align: middle;\
        padding-left: 3px;\
        border-left: solid 1px silver;\
        border-bottom: solid 1px silver;\
      }\
      tr.total td {\
        background-color: BurlyWood;\
      }\
      tr.grand td {\
        background-color: Turquoise;\
      }\
      tr.nonsurgical td {\
        background-color: LightGrey;\
      }\
    </style>'
  let head = `<div id="excelhead">\<br><br>${title}<br><br></div>`
  let filename = `Report ${title}.xls`

  exportToExcel("#dialogReview", style, head, filename)
}

function exportToExcel(id, style, head, filename)
{
  if ($("#exceltbl").length) {
    $("#exceltbl").remove()
  }

  $(id).clone(true).attr("id", "exceltbl").appendTo("body")

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

  // make line breaks show in single cell "&#10;"
  $exceltbl.find('br').attr('style', "mso-data-placement:same-cell")

  // remove img in equipment
  $exceltbl.find('img').remove()

  // insert header
  $exceltbl.prepend(head)

  //remove img in equipment
  $exceltbl.find('img').remove();

  let table = $exceltbl[0].outerHTML
  let htmlstr = `<!DOCTYPE html>
                  <HTML>
                    <HEAD><meta charset="utf-8"/>${style}</HEAD>
                    <BODY>${table}</BODY>
                  </HTML>`
  let a = document.createElement('a')
  let data_type = 'data:application/vnd.ms-excel'

  // You need to add this line in FF
  document.body.appendChild(a)
  a.href = data_type + ', ' + encodeURIComponent(htmlstr)
  a.download = filename
  a.click()
}
