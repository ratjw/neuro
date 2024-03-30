
import { search } from "../menu/search.js"

export function search2Excel()
{
  $("#searchpart").show()
  $("#periodpart").hide()

  search("excel")
}
