
import { downloadTableToExcel } from "../util/downloadTableToExcel.js"

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

  downloadTableToExcel("#servicetbl", style, head, filename)
}
