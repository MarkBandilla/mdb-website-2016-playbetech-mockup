<?php 

$domurl = '../../simple-dom/simple_html_dom.php';
if(file_exists($domurl)) {
	include($domurl);
} else {
	echo 'cant find dom'; die();
}

if(isSet($_POST)) {
	switch($_POST['request']) {
		case 'updateSection':
			$filePath = $_POST['filePath'];
			$fileName = $_POST['fileName'];
			// $oldHTML = $_POST['oldHTML'];
			$newHTML = str_replace(' style="outline: rgb(227, 227, 227) solid thick;"', '', $_POST['newHTML']);
			$sectionID = $_POST['sectionID'];

			$file = $filePath . $fileName;

			if(file_exists($file)) {
				$html = file_get_html($file);
				$section = $html->find('section[id="'.$sectionID.'"]', 0);
				$oldHTML = $section->innertext;

				$file_contents = file_get_contents($file);
				$file_new_contents = str_replace($oldHTML, $newHTML, $file_contents, $count);

				if($count > 0) {
					if ($Handle = fopen($file, 'w')) {
						if (fwrite($Handle, $file_new_contents)) {
							echo 'success';
						} else {
							echo 'Failed: Unable to write on file.. please check file permission';
						}
						fclose($Handle);
					}
				} else {
					echo 'Failed: Please check if someone else is editing the content.. refresh the page and try again to fix this issue';
				}
			} else {
				echo 'Failed: ' . $file . ' does not exists!';
			}
		break;
		case 'newFile':
			$basefile = '../../../../_preview.html';
			$newfile = '../../../../'.$_POST['fileName'];

			if (!copy($basefile, $newfile)) {
			    echo "Error: Failed to duplicate _preview.html";
			} else {
				echo "success";
			}
		break;
		case 'updateFile':
			$filePath = $_POST['filePath'];
			$fileName = $_POST['fileName'];
			// $oldHTML = $_POST['oldHTML'];
			$newHTML = $_POST['newHTML'];
			$sectionID = $_POST['sectionID'];

			$file = $filePath . $fileName;

			if(file_exists($file)) {
				$html = file_get_html($file);
				$section = $html->find('div[id="'.$sectionID.'"]', 0);
				$oldHTML = $section->innertext;

				$file_contents = file_get_contents($file);
				$file_new_contents = str_replace($oldHTML, $newHTML, $file_contents, $count);

				if($count > 0) {
					if ($Handle = fopen($file, 'w')) {
						if (fwrite($Handle, $file_new_contents)) {
							echo 'success';
						} else {
							echo 'Failed: Unable to write on file.. please check file permission';
						}
						fclose($Handle);
					}
				} else {
					echo 'Failed: Please check if someone else is editing the content.. refresh the page and try again to fix this issue';
				}
			} else {
				echo 'Failed: ' . $file . ' does not exists!';
			}			
		break;
	}
}
