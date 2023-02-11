

$(document).ready( function() {
	/* CMS */

    $preview.on('load', function(){   	
    	$preview.contents().find('body').scrollTop($previewTop);

	    $.each($preview.contents().find("*"), function() {
	      	var tag = $(this).tagNameLowerCase();
			$carousel = $(this).closest('.carousel');
	      
			if(tag === 'p')  {
				$(this).attr({'contenteditable': true});
				$(this).addClass('position-relative');
			}
			if(tag === 'b')  {
				$(this).attr({'contenteditable': true});
			}
			if(tag === 'i')  {
				$(this).attr({'contenteditable': true});
			}
			if(tag === 'span')  {
				$(this).attr({'contenteditable': true});
			}
			if(tag === 'u')  {
				$(this).attr({'contenteditable': true});
			}
			if(tag === 'strike')  {
				$(this).attr({'contenteditable': true});
			}
			if(tag === 'sup')  {
				$(this).attr({'contenteditable': true});
			}
			if(tag === 'sub')  {
				$(this).attr({'contenteditable': true});
			}
			if(tag == 'a') {
				$(this).attr({'contenteditable': true});	
			}
			if(tag === 'img')  {
				if(!$carousel)
				$(this).attr({'contenteditable': true});
			}
			if(tag === 'button')  {
				$(this).attr({'contenteditable': true});
			}
			if(tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
				$(this).attr({'contenteditable': true});
				$(this).addClass('position-relative');
			}

			if(tag === 'li') {
				if(!$carousel)
				$(this).attr({'data-clone': true});
			}
			// if(tag === 'section') {
			// 	$(this).attr({'data-section': true});
			// }
			// if(tag === 'tr') {
			// 	$(this).attr({'data-clone': true});
			// }
			

			// if(tag === 'td') {
			// 	$(this).attr({'contenteditable': true});

      		if($(this).hasClass("container")) $(this).addClass("position-relative");

	    });
    
		$.each($preview.contents().find("[class*='col-']"), function() {
			$(this).attr('data-clone',true);
		});

    	$preview.contents().find('body').prepend($cloner);
    	$cloner = $preview.contents().find('body #CMSControls');

	    /* EDITABLE */
	    $preview.contents().find("body").delegate('[contenteditable]', 'click', function(e) {
	    	e.preventDefault();
	    	$element.focus();
	    	return false;
	    });
		$preview.contents().find("body").delegate('[contenteditable]', 'focus', function() {
			$controlLock = true;
			$cloner.removeClass('hide');

			$(this).css({'outline':'#e3e3e3 solid thick'});

			if($observe) {
				var $previewHTML = $(this).html()
					.replace(/<br>/g, '<br />')
					.replace(/ data-clone="true"/g, '')
					.replace(/ data-controller="true"/g, '')
					.replace(/ contenteditable="true"/g, '')
					.replace(/ contenteditable="false"/g, '')
					.replace(/ control-box/g, '')
					.replace(/ class="control-box"/g, '')
					.replace(/ class="position-relative"/g, '')
					.replace(/ position-relative/g, '');

				$oldHTML_default = $previewHTML;
				// console.log('oldHTML', $oldHTML);

				$observe = false;
			}
		});
		$preview.contents().find("body").delegate('[contenteditable]', 'blur', function() {
			$controlLock = false;
			// $cloner.addClass('hide');
			$(this).css({'outline':'none'});

			if(!$observe) {
				var $sectionID = $(this).closest('section').attr('id');
				// // console.log('sectionID: ', $sectionID);				
				var $previewHTML = $(this).closest('section').html()
					.replace(/<br>/g, '<br />')
					.replace(/ data-clone="true"/g, '')
					.replace(/ style="outline: rgb(227, 227, 227) solid thick;"/g, '')
					.replace(/ data-controller="true"/g, '')
					.replace(/ contenteditable="true"/g, '')
					.replace(/ contenteditable="false"/g, '')
					.replace(/ control-box/g, '')
					.replace(/ class="control-box"/g, '')
					.replace(/ class="position-relative"/g, '')
					.replace(/ position-relative/g, '');

				var $newTextHTML = $(this).html()
					.replace(/<br>/g, '<br />')
					.replace(/ data-clone="true"/g, '')
					.replace(/ style="outline: rgb(227, 227, 227) solid thick;"/g, '')
					.replace(/ data-controller="true"/g, '')
					.replace(/ contenteditable="true"/g, '')
					.replace(/ contenteditable="false"/g, '')
					.replace(/ control-box/g, '')
					.replace(/ class="control-box"/g, '')
					.replace(/ class="position-relative"/g, '')
					.replace(/ position-relative/g, '');

				$newHTML = $previewHTML;
				// console.log('newHTML', $newHTML);

				if($oldHTML_default !== $newTextHTML) {
					var data = { filePath: $filePath, request: 'updateSection', fileName: $fileName, newHTML: $newHTML, sectionID: $sectionID };
					updateSection(data);
				}
			}

			$observe = true;
		});		
		$preview.contents().find("body").delegate('[contenteditable]', 'mouseup', function(e) {
			var $selected = document.getElementById($previewId).contentWindow.getSelection().toString();
			$element = $(this);	

			// console.log($element.tagNameLowerCase());

			if($selected) {
				resetControls();

				$cloner.find('.cms-text').removeClass('hide');
				$cloner.find('.cms-palette').removeClass('hide');
				$cloner.find('.cms-link').removeClass('hide');
			} else {
				var $tag = $element.tagNameLowerCase();

				resetControls();	

				if ($tag === 'h1' || $tag === 'h2' || $tag === 'h3' || $tag === 'h4' || $tag === 'h5' || $tag === 'h6') {
					$cloner.find('.cms-header').removeClass('hide');
					$cloner.find('.cms-palette').removeClass('hide');
					$cloner.find('.cms-alignment').removeClass('hide');
				} else if ($tag === 'p') {
					$cloner.find('.cms-palette').removeClass('hide');
					$cloner.find('.cms-alignment').removeClass('hide');				
				} else if ($tag === 'a') {
					$cloner.find('.cms-href').removeClass('hide');
					$cloner.find('.cms-palette').removeClass('hide');					
				} else if ($tag === 'tr') {
					$cloner.find('.cms-clone').removeClass('hide');					
				}

				$cloner.find('.cms-inserts').removeClass('hide');	
						
			}

			var $offset = $(this).offset();

			$cloner.css({top: $offset.top - $cloner.height(), left: $offset.left + (($(this).width() / 2) - ($cloner.width() / 2))});
		});	
		$preview.contents().find("body").delegate('[contenteditable],[data-clone],section', 'mouseover', function(e) {
			if($controlLock === false && $firstElement) {
				var $tag = $(this).tagNameLowerCase();
				// console.log($tag);

				$(this).css({'outline':'#e3e3e3 solid thin'});

				resetControls();

				if($(this).data('clone')) {
					$cloner.find('.cms-column').removeClass('hide');
					console.log('column');
				} else if($tag === 'section') {
					$cloner.find('.cms-key').removeClass('hide');
				} else if($tag === 'li') {
				} else if($tag === 'b' || $tag === 'i' || $tag === 'span' || $tag === 'u' || $tag === 'strike' || $tag === 'sub' || $tag === 'sup') {
					$cloner.find('.cms-clear').removeClass('hide');	
				} else if($tag === 'a') {
					$cloner.find('.cms-link').removeClass('hide');	
				} else {
					$cloner.find('.cms-format').removeClass('hide');					
				}
				
				$cloner.find('.cms-clone').removeClass('hide');

				var $offset = $(this).offset();

				$cloner.removeClass('hide');
				$cloner.css({top: $offset.top - $cloner.height(), left: $offset.left + (($(this).width() / 2) - ($cloner.width() / 2))});
				
				$element = $(this);	

				$firstElement = false;
			}
		});	
		$preview.contents().find("body").delegate('[contenteditable],[data-clone],section', 'mouseout', function(e) {
			if($controlLock === false) {
				$(this).css({'outline':'none'});
			}

			$firstElement = true;
		});
		// $preview.contents().find("body").delegate('[data-clone]', 'mouseout', function(e) {
		// 	$firstElement = true;
		// });	


		$('#btn-refresh').on('click', function(){
			refreshPreview();
		});

		$('#autoRefresh').on('click', function() {
			if($(this).is(":checked")) {
				$autoUpdate = true;
			} else {
				$autoUpdate = false;
			}
		});

		function refreshPreview() {
			$previewTop = $('#preview').contents().find('body').scrollTop();
			var path = '../' + $fileName;
			var url = path + '?' + Date();
			// console.log(url);
			$preview.attr('src', url);
		};

		/* KEY MAPPING */

		$preview.contents().find("body").delegate('[contenteditable]', 'keydown', function(key) {
			if (key.which == 27) { 
				// console.log('escape');
				$(this).html($oldHTML_default);
			} else if( key.which === 83 && key.ctrlKey) {
		        $(this).blur();
		        key.preventDefault();
		        return false;
		    } else if (key.keyCode === 13) {
				// console.log('enter');
				document.getElementById($previewId).contentWindow.document.execCommand('insertHTML', false, '<br />');
				return false;
		    } 
		});	
		
		$preview.contents().find("body").delegate('[contenteditable]', 'paste', function(e) {
			e.preventDefault();
    		var text = (e.originalEvent || e).clipboardData.getData('text/plain');
		    document.getElementById($previewId).contentWindow.document.execCommand('insertText', false, text);
			// console.log('paste orig: ', $(this).html());
    		var newText = $(this).html().replace(/<div>/gi,'<br>').replace(/<\/div>/gi,'');
		    $(this).html(newText);
    		// console.log('paste modified: ', $(this).html());
		});	
		/* CONTROLLER */
    
	  //   $.each($preview.contents().find("[data-section]"), function() {
	  //     // $(this).attr('data-type', 'section');
	  //     // $(this).attr('data-controller',true);
	  //     // $(this).prepend($("#controlTemplate").html());
	  //   });
	  //   $.each($preview.contents().find("[data-clone]"), function() {
	  //   	if(!$(this).parent().attr('data-clone')) {
			// 	$(this).attr('data-controller', true);
			// 	// $(this).prepend($("#controlTemplateClone").html());
			// }
	  //   });
	  //   $.each($preview.contents().find("[data-clone-tr]"), function() {
			// $(this).attr('data-controller', true);
			// // $(this).prepend($("#controlTemplateCloneTR").html());
	  //   });
		// CONTROLLER EVENTS
		$preview.contents().find("body").delegate('[data-control]','click', function() {
			var action = $(this).attr("data-control");
			var parent = $element;
			var section = $element.closest('section');
			var tag = $element.tagNameLowerCase();

			$element.css("outline", "");

			switch(action) {
				case "remove":
					parent.remove();
				break;
				case "capture":
					window.parent.screenCapture(parent, true);
				break;
				case "clone":
					if(tag === 'section') {
						var id = $element.attr('id') || "id";
						key = prompt("Please Enter Key", id);

						if(key) {
							var section = parent.clone().insertAfter(parent);
							section.attr('id', key);
						}
					} else {
						parent.clone().insertAfter(parent);
					}
				break;
				case "key":
					var id = $element.attr('id') || "id";
					key = prompt("Please Enter Key", id);

					if(key) {
						$element.attr('id', key);
					}
				break;
				case "insert":
					resetControls();

					$cloner.find('.cms-insert').removeClass('hide');
				break;
				case "clear":
					$element.replaceWith($element.html());
				break;
				case "tag-header":
					resetControls();

					$cloner.find('.cms-heading').removeClass('hide');
				break;
				case "text-palette":
					resetControls();

					$cloner.find('.cms-color').removeClass('hide');
				break;
				case "text-alignment":
					resetControls();

					$cloner.find('.cms-align').removeClass('hide');
				break;
				case "link":
					var $selected = document.getElementById($previewId).contentWindow.getSelection().toString();
					var url = $element.attr('href') || "http://www.website.com";
					url = prompt("Please enter URL", url);

					if(url) {
						if($selected) {
							var text = '<a href="' + url + '">' + $selected + '</span>';
							document.getElementById($previewId).contentWindow.document.execCommand("insertHtml", false, text);
						} else {
							$element.attr('href', url);
						}
					} else {
						return false;
					}
				break;
				case "unlink":
					$element.replaceWith($element.html());
				break;
				default:
					if(action === 'text-left' || action === 'text-center' || action === 'text-justify' || action === 'text-right') {
						$element.removeClass('text-left');
						$element.removeClass('text-center');
						$element.removeClass('text-justify');
						$element.removeClass('text-right');

						$element.addClass(action);
					} else if(action === 'text-color-none' || action === 'text-black' || action === 'text-white' || action === 'text-muted' || action === 'text-primary' || action === 'text-info' || action === 'text-success' || action === 'text-warning' || action === 'text-danger') {
						var $selected = document.getElementById($previewId).contentWindow.getSelection().toString();

						resetCtrlColor();

						if($selected) {
							if(action === 'text-color-none' ) {
								document.getElementById($previewId).contentWindow.document.execCommand("removeformat", false, null);
							} else {
								var text = '<span class="' + action + '">' + $selected + '</span>';
								document.getElementById($previewId).contentWindow.document.execCommand('insertHtml', false, text);
							}
						} else {
							if(action !== 'text-color-none' )
							$element.addClass(action);							
						}
					} else if(action === 'tag-h1' || action === 'tag-h2' || action === 'tag-h3' || action === 'tag-h4' || action === 'tag-h5' || action === 'tag-h6' || 
						action === 'tag-p' || action === 'tag-a' || action === 'tag-button') {

						if(action === 'tag-button' || action === 'tag-a') {
							var url = $element.attr('href') || "http://www.website.com";

							url = prompt("Please enter URL", url);

							if(url) {
								$element.attr('href', url);

								if(action === 'tag-button')
									$element.addClass('btn btn-default');
								else
									resetCtrlBtn();
							} else {
								return false;
							}
						} else {
							resetCtrlBtn();
						}

						$element.changeTag(action.split('-')[1]);
					} else if (action === 'text-bold' || action === 'text-italic' || action === 'text-underline' || action === 'text-strikethrough' || action === 'text-subscript' || action === 'text-superscript') {
						var $tag = action.split('-')[1];
						document.getElementById($previewId).contentWindow.document.execCommand($tag, false, null);
					} else {
						alert(action);
					}
				break;
			}

			var $offset = $element.offset();
			$cloner.css({top: $offset.top - $cloner.height(), left: $offset.left + (($element.width() / 2) - ($cloner.width() / 2))});

			updateHTML(section);
		});

		function updateHTML($section) {

			var $sectionID = $section.attr('id');
			$section.css({'outline':''});
			
			var $previewHTML = $section.html()
				.replace(/<br>/g, '<br />')
				.replace(/ data-clone="true"/g, '')
				.replace(/ data-controller="true"/g, '')
				.replace(/ contenteditable="true"/g, '')
				.replace(/ contenteditable="false"/g, '')
				.replace(/ control-box/g, '')
				.replace(/ class="control-box"/g, '')
				.replace(/ class="position-relative"/g, '')
				.replace(/ position-relative/g, '');

			$newHTML = $previewHTML;

			// console.log($newHTML);

			var data = { filePath: $filePath, request: 'updateSection', fileName: $fileName, newHTML: $newHTML, sectionID: $sectionID };
			updateSection(data);
		}
    });

	// CUSTOM JQUERY FUNCTIONS
	function resetControls() {
		$cloner.find('.cms-key').addClass('hide');
		$cloner.find('.cms-clone').addClass('hide');
		$cloner.find('.cms-clear').addClass('hide');
		$cloner.find('.cms-inserts').addClass('hide');
		$cloner.find('.cms-insert').addClass('hide');
		$cloner.find('.cms-format').addClass('hide');
		$cloner.find('.cms-header').addClass('hide');
		$cloner.find('.cms-heading').addClass('hide');
		$cloner.find('.cms-alignment').addClass('hide');
		$cloner.find('.cms-align').addClass('hide');
		$cloner.find('.cms-text').addClass('hide');
		$cloner.find('.cms-palette').addClass('hide');
		$cloner.find('.cms-color').addClass('hide');
		$cloner.find('.cms-link').addClass('hide');	
		$cloner.find('.cms-href').addClass('hide');	
		$cloner.find('.cms-column').addClass('hide');	
	}
	function resetCtrlBtn() {
		$element.removeClass('btn');
		$element.removeClass('btn-default');
		$element.removeClass('btn-primary');
		$element.removeClass('btn-info');
		$element.removeClass('btn-success');
		$element.removeClass('btn-warning');
		$element.removeClass('btn-danger');
		$element.removeClass('btn-lg');
		$element.removeClass('btn-md');
		$element.removeClass('btn-sm');
		$element.removeClass('btn-xs');
	}
	function resetCtrlColor() {
		$element.removeClass('text-color-none');
		$element.removeClass('text-black');
		$element.removeClass('text-white');
		$element.removeClass('text-muted');
		$element.removeClass('text-primary');
		$element.removeClass('text-info');
		$element.removeClass('text-success');
		$element.removeClass('text-warning');
		$element.removeClass('text-danger');

	}

	$.fn.tagNameLowerCase = function() {
		return this.prop("tagName").toLowerCase();
	};
	$.fn.changeTag = function (newTag) {
	    var q = this;
	    this.each(function (i, el) {
	        var h = "<" + el.outerHTML.replace(/(^<\w+|\w+>$)/g, newTag) + ">";
	        try {
	            el.outerHTML = h;
	        } catch (e) { //elem not in dom
	            q[i] = jQuery(h)[0];
	        }

	    });
	    return this;
	};
});



