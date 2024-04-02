
export function inputPeriod()
{
  $("#datebegin").datepicker({
    numberOfMonths:1,
    altField: $("#dateFrom"),
    altFormat: "yy-mm-dd",
    dateFormat:'dd MM yy',
    onClose:function(selectdate) {
      var dt = new Date(selectdate);
      dt.setDate(dt.getDate()+1)
      $("#dateend").datepicker("option","minDate",dt).focus()
    }
  }).focus()
  $("#dateend").datepicker({
    numberOfMonths:1,
    altField: $("#dateTo"),
    altFormat: "yy-mm-dd",
    dateFormat:'dd MM yy',
    onSelect:function(selectdate){
      var dt = new Date(selectdate);
      dt.setDate(dt.getDate()-1)
      $("#datebegin").datepicker("option","maxDate",dt);
    }
  })
}
