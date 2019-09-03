<?php
function merge($record, $result)
{
  foreach ($record as $key => $val) {
    if (array_key_exists($key, $result)) {
      $record[$key] = $result[$key];
    }
  }

  return $record;
}
