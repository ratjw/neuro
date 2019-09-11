
import { pagination } from "./pagination.js"
import { scrolltoThisCase } from "./scrolltoThisCase.js"
import { onePage } from "./onePage.js"

export function viewSearchDB(found, search)
{
  let flen = found.length,
    $dialogFind = $("#dialogFind"),
    $findtbl = $("#findtbl"),
    show = flen && scrolltoThisCase(found[flen-1].qn)

  if (!show || (flen > 1)) {
    if (flen > 100) {
      pagination($dialogFind, $findtbl, found, search)
    } else {
      onePage($dialogFind, $findtbl, found, search)
    }
  }
}
