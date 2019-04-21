
import { clearEditcell } from "./edit.js"
import { clearMouseoverTR } from "../util/util.js"
import { clearSelection } from "../get/selectRow.js"

export function clearAllEditing()
{
  $('#stafflist').hide();
  clearEditcell()
  clearMouseoverTR()
  clearSelection()
  if ($("#dialogNotify").hasClass('ui-dialog-content')) {
    $("#dialogNotify").dialog("close")
  }
  $(".marker").removeClass("marker")
}
