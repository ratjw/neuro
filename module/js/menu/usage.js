
export function usage()
{
  let $dialogUsage = $('#dialogUsage'),
    object = "<object data='..\\readme.pdf' type='application/pdf' "
           + "width='400px' height='500px'>"
           + "</object>"
  $dialogUsage.show()
  $dialogUsage.dialog({
    title: "ReadMe",
    closeOnEscape: true,
    modal: true,
    show: 200,
    width: "auto",
    height: 570,
    open: function () {
      $dialogUsage.html(object)
    }
  })
}
