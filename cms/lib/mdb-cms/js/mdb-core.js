/* GLOBAL VARS */

$autoUpdate = false;
$oldHTML = "";
$newHTML = "";
$filePath = "/home/cabox/workspace/projects/websites/2016-playbetech-mockup/";
// $filePath = "/home/vagrant/Code/sbos/";
$cmsPath = "lib/mdb-cms/php/mdb-core.php";
$fileName = "";
$observe = true;
$previewTop = 0;
$previewId = 'preview';
$preview = $('#' + $previewId);
$clone = $("#CMSControlClone");
$cloner = $("#CMSControls");
$element = null;
$controlLock = false;
$firstElement = true;

$(document).ready( function() {
	/* LAYOUT */
	$.each($('[data-layout-right]'), function() {
		$(this).css({
			'float': 'right',
			'right': '0',
			'width': $(this).data('layout-right')
		});
	});
	$.each($('[data-layout-left]'), function() {
		$(this).css({
			'float': 'left',
			'left': '0',
			'width': $(this).data('layout-left')
		});
	});
	$.each($('[data-layout-top]'), function() {
		$(this).css({
			'position': 'absolute',
			'top': '0',
			'width': '100%',
			'height': $(this).data('layout-top')
		});
	});
	$.each($('[data-layout-bottom]'), function() {
		$(this).css({
			'position': 'absolute',
			'bottom': '0',
			'width': '100%',
			'height': $(this).data('layout-bottom')
		});
	});

	/* SIZE */

	$.each($('[data-height]'), function() {
		$(this).css({'height': $(this).data('height')});
	});
	$.each($('[data-width]'), function() {
		$(this).css({'width': $(this).data('width')});
	});

	$.each($('[data-full-height-offset]'), function() {
		var parentHeight = $(this).parent().height();
		var offsetHeight = $(this).data('full-height-offset')
		var heightOffset = parentHeight - offsetHeight;

		$(this).css({'height': heightOffset - 5});
	});

	/* PADDING */

	$.each($('[data-padding]'), function() {
		$(this).css({'padding': $(this).data('padding')});
	});
	$.each($('[data-padding-left]'), function() {
		$(this).css({'padding-left': $(this).data('padding-left')});
	});
	$.each($('[data-padding-right]'), function() {
		$(this).css({'padding-right': $(this).data('padding-right')});
	});
	$.each($('[data-padding-top]'), function() {
		$(this).css({'padding-top': $(this).data('padding-top')});
	});
	$.each($('[data-padding-bottom]'), function() {
		$(this).css({'padding-bottom': $(this).data('padding-bottom')});
	});

	fileTree();

	/* PLUGIN */
	function refreshPreview() {
		$previewTop = $('#preview').contents().find('body').scrollTop();
		var path = '../' + $fileName;
		var url = path + '?' + Date();
		// console.log(url);
		$preview.attr('src', url);
	};

});


function fileTree() {
    $('[data-file-tree]').fileTree({
    	root: $filePath,
    }, function(file) {
    	$fileName = file.replace($filePath,'');
		var path = '../' + $fileName;
		var url = path + '?' + Date();
		// console.log(url);
		$('#preview').attr('src', url);
        $('#title-url').text($fileName);
    });
}

// PREVIEW SIZE SWITCHER
function viewMode(vm) {
	$iframe = $('#preview');

	$('.btn-view').removeClass('active');

	switch(vm) {
		case 'lg': 
			$iframe.css({'width':'100%'});
		break;
		case 'md':
			$iframe.css({'width':'1200px'});
		break;
		case 'sm':
			$iframe.css({'width':'768px'});
		break;
		case 'xs':
			$iframe.css({'width':'320px'});
		break;
	}

	$('.btn-view-' + vm).addClass('active');

	$(this).addClass('active');

	refreshPreview();
}

function refreshPreview() {
	$previewTop = $('#preview').contents().find('body').scrollTop();
	var path = '../' + $fileName;
	var url = path + '?' + Date();
	// console.log(url);
	$preview.attr('src', url);
};

$('#btn-new-file').on('click', function() {
	createFile(); 
});

function createFile() {
	// alert("Create File Feature Disabled!"); 
	return false;
	$fileName = prompt("Please enter FileName", "index.html");

	if($fileName) {
		var data = { filePath: $filePath, request: 'newFile', fileName: $fileName };

		$.ajax({
			type: "POST",
			url: $cmsPath,
			data: data,
			success: function(response) {
				if(response == 'success') {
					// if($autoUpdate) refreshPreview();
					fileTree();
				} else {
					alert(response);
					console.log(response);
				}
			},
			error: function(err) {
				alert(err);
				console.log(err);
			}
		});
	}
};

function updateFile() {
	// alert("Update file Feature Disabled!"); 
	return false;
    var $sectionID = 'blocks';
    // // console.log('sectionID: ', $sectionID);       
    var $previewHTML = $preview.contents().find("#"+$sectionID).html();
      // .replace(/<br>/g, '<br />')
      // .replace(/ data-clone="true"/g, '')
      // .replace(/ data-controller="true"/g, '')
      // .replace(/ contenteditable="true"/g, '')
      // .replace(/ contenteditable="true"/g, '')
      // .replace(/ control-box/g, '')
      // .replace(/ class="control-box"/g, '')
      // .replace(/ class="position-relative"/g, '')
      // .replace(/ position-relative/g, '');

    $newHTML = $previewHTML;
    // console.log('newHTML', $newHTML);
    var data = { filePath: $filePath, request: 'updateFile', fileName: $fileName, newHTML: $newHTML, sectionID: $sectionID };

	$.ajax({
		type: "POST",
		url: $cmsPath,
		data: data,
		success: function(response) {
			if(response == 'success') {
				if($autoUpdate) refreshPreview();
			} else {
				alert(response);
				console.log(response);
			}
		},
		error: function(err) {
			alert(err);
			console.log(err);
		}
	});
}


function updateSection(data, refresh) {
	// alert("Update Section Feature Disabled!"); 
	return false;
	$.ajax({
		type: "POST",
		url: $cmsPath,
		data: data,
		success: function(response) {
			if(response == 'success') {
				if($autoUpdate && refresh) refreshPreview();
			} else {
				alert(response);
				console.log(response);
			}
		},
		error: function(err) {
			alert(err);
			console.log(err);
		}
	});
}


