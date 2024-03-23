
import { exportToExcel } from "../util/exportToExcel.js"

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
