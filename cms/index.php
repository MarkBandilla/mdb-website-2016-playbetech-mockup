<!doctype html>
<html>
	<head>
		<title>MDB-CMS</title>
		<link href='https://fonts.googleapis.com/css?family=Roboto|Raleway' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" href="lib/font-awesome/css/font-awesome.min.css" />
		<link rel="stylesheet" href="lib/file-tree/jqueryFileTree.css" />
		<link rel="stylesheet" href="lib/mdb-cms/css/mdb-core.css" />
		<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="og983dst3lxsw4q"></script>
	</head>
	<body class="full-screen position-absolute">
		<div class="overflow-auto full-screen position-absolute" data-padding-left="200">
			<div class="col-xs-12 border-lite-bottom" data-height="70">
				<div class="position-relative full-width">
					<div class="pull-left">
						<h3 class="text-center">
							<button id="btn-refresh" class="btn btn-default btn-md"><input type="checkbox" id="autoRefresh"/>&nbsp;&nbsp;<i class="fa fa-refresh"></i></button>
							&nbsp;
							<b id="title-url">No File Selected</b>
						</h3>	
					
						&nbsp;&nbsp;

						<div class="dropbox-button"></div>
				
						&nbsp;&nbsp;					
					</div>
					
					<div class="pull-right">
						<h3 class="text-center">
							<div class="btn-group" role="group">
								<div class="btn-group" role="group">
									<button type="button" class="btn btn-default btn-view btn-view-lg active" onclick="viewMode('lg');"><i class="fa fa-desktop"></i></button>
								</div>
								<div class="btn-group" role="group">
									<button type="button" class="btn btn-default btn-view btn-view-md" onclick="viewMode('md');"><i class="fa fa-laptop"></i></button>
								</div>
								<div class="btn-group" role="group">
									<button type="button" class="btn btn-default btn-view btn-view-sm" onclick="viewMode('sm');"><i class="fa fa-tablet"></i></button>
								</div>
								<div class="btn-group" role="group">
									<button type="button" class="btn btn-default btn-view btn-view-xs" onclick="viewMode('xs');"><i class="fa fa-mobile"></i></button>
								</div>
							</div>
					
							&nbsp;&nbsp;

							<button class="btn btn-default"><i class="fa fa-cog"></i></button>
					
							&nbsp;&nbsp;
							<div class="btn-group" role="group">
								<div class="btn-group" role="group">
									<button type="button" class="btn btn-default active" onclick='window.location.href = "index.php";'> CMS </button>
								</div>
								<!--<div class="btn-group" role="group">-->
								<!--	<button type="button" class="btn btn-default" onclick='window.location.href = "design.php";'> DESIGN </button>-->
								<!--</div>-->
								<!--<div class="btn-group" role="group">-->
								<!--	<button type="button" class="btn btn-default" onclick='window.location.href = "code.php";'>CODE</button>-->
								<!--</div>-->
							</div>
						</h3>
					</div>
				</div>
			</div>
			<center class="full-screen"><iframe id="preview" src="" class="full-width border-none" data-full-height-offset="70"></iframe></center>
		</div>
		
		<div class="overflow-auto position-absolute full-height border-lite-right" data-layout-left="200">
			<div class="col-xs-12 text-center">
				<h3>File Tree</h3>
				<div class="text-left" data-file-tree></div>
			</div>
		</div>
    
		<!-- TEMPLATE -->

		<div id="CMSControlClone" class="hide" style="position: absolute; z-index: 99999;">
		  <div class="control-box" style="background:#e3e3e3; padding:3px; border-radius: 5px">
		    <div class="btn-group cms-cloner" role="group">
		      <button type="button" class="btn btn-default text-info btn-xs" data-control="cloner"><i class="fa fa-clone"></i></button>
		      <button type="button" class="btn btn-default text-danger btn-xs" data-control="remover"><i class="fa fa-times"></i></button>
		    </div>
		  </div>			
		</div>
		
		<div id="CMSControls" class="hide" style="position: absolute; z-index: 99999;">
		  <div class="control-box" style="background:#e3e3e3; padding:3px; border-radius: 5px">
		  	<div class="btn-group cms-key" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="key"><i class="fa fa-key text-muted"></i></button>
		  	</div>
		  	<div class="btn-group cms-inserts" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="insert"><i class="fa fa-plus text-muted"></i></button>
		  	</div>
		    <div class="btn-group cms-insert hide" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="insert-icon"><i class="fa fa-info-circle text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="insert-image"><i class="fa fa-image text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="insert-table"><i class="fa fa-table text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="insert-list-ol"><i class="fa fa-list-ol text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="insert-list-ul"><i class="fa fa-list-ul text-muted"></i></button>
		    </div>
		  	<div class="btn-group cms-header" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-header"><i class="fa fa-header text-muted"></i></button>
		  	</div>
		    <div class="btn-group cms-heading hide" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-h1">H1</button>
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-h2">H2</button>
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-h3">H3</button>
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-h4">H4</button>
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-h5">H5</button>
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-h6">H6</button>
		    </div>
		    <div class="btn-group cms-format hide" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-header"><i class="fa fa-header text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-p"><i class="fa fa-paragraph text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-a"><i class="fa fa-link text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-button"><i class="fa fa-hand-pointer-o text-muted"></i></button>
		    </div>
		    <div class="btn-group cms-link hide" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="link"><i class="fa fa-link text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="unlink"><i class="fa fa-unlink text-muted"></i></button>
		    </div>
		  	<div class="btn-group cms-href" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="tag-a"><i class="fa fa-link text-muted"></i></button>
		  	</div>
		    <div class="btn-group cms-text hide" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="text-bold"><i class="fa fa-bold text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-italic"><i class="fa fa-italic text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-underline"><i class="fa fa-underline text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-strikethrough"><i class="fa fa-strikethrough text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-subscript"><i class="fa fa-subscript text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-superscript"><i class="fa fa-superscript text-muted"></i></button>
		    </div>
		  	<div class="btn-group cms-column" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="div-column"><i class="fa fa-columns text-muted"></i></button>
		  	</div>
		  	<div class="btn-group cms-palette" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="text-palette"><i class="fa fa-tint text-muted"></i></button>
		  	</div>
		    <div class="btn-group cms-color hide" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="text-color-none"><i class="fa fa-minus-square-o text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-white"><i class="fa fa-square-o text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-black"><i class="fa fa-square text-black"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-muted"><i class="fa fa-square text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-primary"><i class="fa fa-square text-primary"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-info"><i class="fa fa-square text-info"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-success"><i class="fa fa-square text-success"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-warning"><i class="fa fa-square text-warning"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-danger"><i class="fa fa-square text-danger"></i></button>
		    </div>
		  	<div class="btn-group cms-alignment" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="text-alignment"><i class="fa fa-align-center text-muted"></i></button>
		  	</div>
		    <div class="btn-group cms-align hide" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="text-left"><i class="fa fa-align-left text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-center"><i class="fa fa-align-center text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-justify"><i class="fa fa-align-justify text-muted"></i></button>
		      <button type="button" class="btn btn-default btn-xs" data-control="text-right"><i class="fa fa-align-right text-muted"></i></button>
		    </div>
		  	<div class="btn-group cms-clear" role="group">
		      <button type="button" class="btn btn-default btn-xs" data-control="clear"><i class="fa fa-eraser text-muted"></i></button>
		  	</div>
		    <div class="btn-group cms-clone" role="group">
		      <button type="button" class="btn btn-default text-info btn-xs" data-control="clone"><i class="fa fa-clone"></i></button>
		      <button type="button" class="btn btn-default text-danger btn-xs" data-control="remove"><i class="fa fa-times"></i></button>
		    </div>
		  </div>			
		</div>

		<script src="lib/jquery/jquery-1.12.0.min.js"></script>
		<script src="lib/bootstrap/js/bootstrap.min.js"></script>
		<script src="lib/file-tree/jqueryFileTree.js"></script>
		<script src="lib/editable/js/editable.plugin.js"></script>
		<script src="lib/mdb-cms/js/mdb-core.js"></script>
		<script src="lib/mdb-cms/js/mdb-cms.js"></script>
		<script>
			// options = {

			//     // Required. Called when a user selects an item in the Chooser.
			//     success: function(files) {
			//         alert("Here's the file link: " + files[0].link)
			//     },

			//     // Optional. Called when the user closes the dialog without selecting a file
			//     // and does not include any parameters.
			//     cancel: function() {

			//     },

			//     // Optional. "preview" (default) is a preview link to the document for sharing,
			//     // "direct" is an expiring link to download the contents of the file. For more
			//     // information about link types, see Link types below.
			//     linkType: "direct", // or "direct"

			//     // Optional. A value of false (default) limits selection to a single file, while
			//     // true enables multiple file selection.
			//     multiselect: false, // or true

			//     // Optional. This is a list of file extensions. If specified, the user will
			//     // only be able to select files with these extensions. You may also specify
			//     // file types, such as "video" or "images" in the list. For more information,
			//     // see File types below. By default, all extensions are allowed.
			//     extensions: ['.jpg', '.png', '.gif', '.bmp'],
			// };

			// var button = Dropbox.createChooseButton(options);
			// $('.dropbox-button').append(button);
		</script>
	</body>
</html>