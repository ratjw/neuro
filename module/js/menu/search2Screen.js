
import { search } from "../menu/search.js"

export function search2Screen()
{
  $("#searchpart").show()
  $("#periodpart").hide()

  search("screen")
}
