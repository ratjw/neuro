
import { exportToExcel } from "../util/exportToExcel.js"

export function exportFindToExcel(search)
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
  let head = `<thead id="excelhead"></thead>`
  let filename = `${search}.xls`

  exportToExcel("#alltbl", style, head, filename)
}
