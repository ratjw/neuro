
export function inputPeriod()
{
  $("#dateend").datepicker({
    numberOfMonths:1,
    altField: $("#dateTo"),
    altFormat: "yy-mm-dd",
    dateFormat:'dd MM yy',
    onSelect:function(selectdate){
      var dt = new Date(selectdate);
      dt.setDate(dt.getDate()-1)
      $("#dateFrom").datepicker("option","maxDate",dt);
    }
  });
    $("#datebegin").datepicker({
    numberOfMonths:1,
    altField: $("#dateFrom"),
    altFormat: "yy-mm-dd",
    dateFormat:'dd MM yy',
    onSelect:function(selectdate) {
      var dt = new Date(selectdate);
      dt.setDate(dt.getDate()+1)
      $("#dateTo").datepicker("option","minDate",dt);
    }
  }).focus()
}
