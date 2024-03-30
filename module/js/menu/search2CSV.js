
import { search } from "../menu/search.js"

export function search2CSV()
{
  $("#searchpart").show()
  $("#periodpart").hide()

  search("csv")
}
