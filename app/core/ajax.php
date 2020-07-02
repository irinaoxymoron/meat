<?php
if(isset($_POST['name'])){
}
if(isset($_POST['phone'])){
}  
if(isset($_FILES['photos'])){
	$uploaddir = '/uploads';

	foreach($_FILES as $fields) {
        foreach($fields['name'] as $index => $file_name) {
        	if (!$fields['error'][$index]) {
	            $files[$file_name] = array(
	                'type' => $fields['type'][$index],
	                'tmp_name' => $fields['tmp_name'][$index],
	                // 'error' => $fields['error'][$index],
	                'size' => $fields['size'][$index]);
        	}
        }
    }
} 





























	// foreach ($files as $filename => $file) {
	// 	$uploadfile = $uploaddir . basename($filename);
	// 	if (move_uploaded_file($file['tmp_name'], $filename)) {
	// 	    echo "Файл корректен и был успешно загружен.\n";
	// 	} else {
	// 	    echo "Возможная атака с помощью файловой загрузки!\n";
	// 	}
	// }
?>