<?php
function merge($input, $result)
{
  foreach ($input as $key => $val) {
    if (array_key_exists($key, $result)) {
      $input[$key] = $result[$key];
    }
  }

  return $input;
}
