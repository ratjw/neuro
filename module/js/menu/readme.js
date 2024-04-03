
export function readme()
{
  let $dialogReadme = $('#dialogReadme'),
    object = "<object data='..\\readme.pdf' type='application/pdf' "
           + "width='400px' height='500px'>"
           + "</object>"
  $dialogReadme.show()
  $dialogReadme.dialog({
    title: "ReadMe",
    closeOnEscape: true,
    modal: true,
    show: 200,
    width: "auto",
    height: 570,
    open: function () {
      $dialogReadme.html(object)
    }
  })
}
