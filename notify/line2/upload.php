<!DOCTYPE html>
<html>
<head>
    <title>Image Upload, Resize, and Preview</title>
    <style>
        #preview-container {
            margin-top: 20px;
            border: 1px solid #ccc;
            padding: 10px;
            width: 300px;
            height: auto;
        }

        #preview-image {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>

<h1>Upload and Resize Image</h1>

<form method="POST" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="image" id="image">
    <br><br>
    New Width: <input type="number" name="new_width" value="200"> pixels<br><br>
    <input type="submit" value="Upload and Resize" name="submit">
</form>

<div id="preview-container">
    <h2>Image Preview:</h2>
    <img id="preview-image" src="#" alt="Preview" style="display: none;">
</div>

<?php
if (isset($_POST["submit"])) {
    $target_dir = "imagefile/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $new_width = isset($_POST["new_width"]) ? intval($_POST["new_width"]) : 200;
    $max_width = 800; // Optional: Set a maximum width

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".<br>";
        $uploadOk = 1;
    } else {
        echo "File is not an image.<br>";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.<br>";
        $uploadOk = 0;
    }

    // Check file size (optional)
    if ($_FILES["image"]["size"] > 2000000) {
        echo "Sorry, your file is too large.<br>";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br>";
        $uploadOk = 0;
    }

    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.<br>";
    } else {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            echo "The file ". htmlspecialchars( basename( $_FILES["image"]["name"])). " has been uploaded.<br>";

            // Resize the image
            $resized_file = $target_dir . "resized_" . basename($_FILES["image"]["name"]);
            if (resizeImage($target_file, $resized_file, $new_width, $max_width)) {
                echo "Image resized successfully to a width of " . $new_width . " pixels (max: " . $max_width . " pixels).<br>";
                // Display the resized image preview
                echo '<script>document.getElementById("preview-image").src = "' . $resized_file . '"; document.getElementById("preview-image").style.display = "block";</script>';
            } else {
                echo "Error resizing the image.<br>";
                // Optionally display the original image if resizing failed
                echo '<script>document.getElementById("preview-image").src = "' . $target_file . '"; document.getElementById("preview-image").style.display = "block";</script>';
            }
        } else {
            echo "Sorry, there was an error uploading your file.<br>";
        }
    }
}

function resizeImage($source_image, $destination_image, $new_width, $max_width = null) {
    $image_info = getimagesize($source_image);
    $image_type = $image_info[2];

    if ($image_type == IMAGETYPE_JPEG) {
        $source = imagecreatefromjpeg($source_image);
    } elseif ($image_type == IMAGETYPE_PNG) {
        $source = imagecreatefrompng($source_image);
    } elseif ($image_type == IMAGETYPE_GIF) {
        $source = imagecreatefromgif($source_image);
    } else {
        return false; // Unsupported image type
    }

    $source_width = imagesx($source);
    $source_height = imagesy($source);

    if ($max_width && $source_width > $max_width) {
        $new_width = $max_width;
    }

    if ($new_width > $source_width) {
        $new_width = $source_width; // Prevent upscaling
    }

    $new_height = ($source_height / $source_width) * $new_width;
    $destination = imagecreatetruecolor($new_width, $new_height);

    // Preserve transparency for PNG and GIF
    if ($image_type == IMAGETYPE_PNG || $image_type == IMAGETYPE_GIF) {
        imagealphablending($destination, false);
        imagesavealpha($destination, true);
        $transparent = imagecolorallocatealpha($destination, 0, 0, 0, 127);
        imagefill($destination, 0, 0, $transparent);
    }

    imagecopyresampled($destination, $source, 0, 0, 0, 0, $new_width, $new_height, $source_width, $source_height);

    if ($image_type == IMAGETYPE_JPEG) {
        imagejpeg($destination, $destination_image, 90); // Adjust quality as needed
    } elseif ($image_type == IMAGETYPE_PNG) {
        imagepng($destination, $destination_image, 0); // 0 for best quality, no compression
    } elseif ($image_type == IMAGETYPE_GIF) {
        imagegif($destination, $destination_image);
    }

    imagedestroy($source);
    imagedestroy($destination);

    return true;
}
?>

</body>
</html>