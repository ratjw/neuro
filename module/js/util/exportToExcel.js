
export function exportToExcel(id, style, head, filename)
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
