
export function usage()
{
  let $dialogUsage = $('#dialogUsage'),
    object = "<object data='..\\usage.pdf' type='application/pdf' "
           + "width='400px' height='500px'>"
           + "</object>"
  $dialogUsage.show()
  $dialogUsage.dialog({
    title: "วิธีใช้",
    closeOnEscape: true,
    modal: true,
    show: 200,
    width: "auto",
    height: 600,
    open: function () {
      $dialogUsage.html(object)
    }
  })
}
