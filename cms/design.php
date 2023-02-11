<!doctype html>
<html>
	<head>
		<title>MDB-CMS</title>
		<link href='https://fonts.googleapis.com/css?family=Roboto|Raleway' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" href="lib/font-awesome/css/font-awesome.min.css" />
		<link rel="stylesheet" href="lib/file-tree/jqueryFileTree.css" />
    	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.css" />
		<link rel="stylesheet" href="lib/mdb-cms/css/mdb-core.css" />
		<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="og983dst3lxsw4q"></script>
	</head>
	<body class="full-screen position-absolute">
		<div class="overflow-auto full-screen position-absolute" data-padding-left="200" data-padding-right="400">
			<div class="col-xs-12 border-lite-bottom" data-height="70">
				<div class="position-relative full-width">
					<div class="pull-left">
						<h3 class="text-center">
							<button id="btn-refresh" class="btn btn-default btn-md"><input type="checkbox" id="autoRefresh" />&nbsp;&nbsp;<i class="fa fa-refresh"></i></button>
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
									<button type="button" class="btn btn-default" onclick='window.location.href = "index.php";'> CMS </button>
								</div>
								<div class="btn-group" role="group">
									<button type="button" class="btn btn-default active" onclick='window.location.href = "design.php";'> DESIGN </button>
								</div>
								<div class="btn-group" role="group">
									<button type="button" class="btn btn-default" onclick='window.location.href = "code.php";'>CODE</button>
								</div>
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
				<br />
				<button id="btn-new-file" class="btn btn-default btn-xs btn-block"><i class="fa fa-plus text-primary"></i> Add File</button>
				<br />
				<div class="text-left" data-file-tree></div>
			</div>
		</div>
		
		<div class="overflow-auto position-absolute full-height border-lite-left" data-layout-right="400">
			<div class="col-xs-12 text-center">
				<h3>Blocks</h3>
				<br />
	            <div id="template-blocks" class="hide">
	              {{#blocks}}
	              <div class="col-xs-12">
	                <div class="panel panel-default">
	                  <div class="panel-heading">
	                    <h3 class="panel-title text-center">{{name}}</h3>
	                  </div>
	                  <div class="panel-body">
	                      <center>
	                        <a href="#" class="block" data-block="{{name}}"><img src="{{image}}" width="100%" /></a>
	                      </center>
	                  </div>
	                </div>
	             </div>
	              {{/blocks}}
	            </div>
	            <div class="blocks">
	            </div>
	            <div class="clearfix"></div>
			</div>
		</div>
    
		<!-- TEMPLATE -->

	    <!-- <div class="hide" id="template"></div> -->
	    <div id="modalTemplate" class="hide">
	      <div class="modal fade" id="{{id}}" tabindex="-1" role="dialog">
	        <div class="modal-dialog">
	          <div class="modal-content">
	            <div class="modal-header">
	              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	              <h4 class="modal-title text-center"><strong>{{{title}}}</strong></h4>
	            </div>
	            <div class="modal-body">
	              {{{content}}}
	            </div>
	          </div>
	          <br /><br /><br /><br /><br />
	        </div>
	      </div>
	    </div>
	    <div id="panelTemplate" class="hide">
	      <div class="panel panel-default">
	        <div class="panel-heading" role="tab" id="headingOne">
	          <h4 class="panel-title">
	            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse{{key}}" aria-expanded="true">
	              <b class="text-primary">{{{icon}}} {{{type}}}</b>
	            </a>
	          </h4>
	        </div>
	        <div id="collapse{{key}}" class="panel-collapse collapse" role="tabpanel">
	          <div class="panel-body" data-index="{{key}}">
	            {{{content}}}
	          </div>
	        </div>
	      </div>
	    </div>
	    
	    <div id="panelBtnGroupTemplate" class="hide">
	      <div class="form-group">
	        <label>{{label}}</label>
	        <div class="btn-group btn-group-justified" role="group">
	          {{#buttons}}
	          <div class="btn-group" role="group">
	            <button type="button" class="btn {{button}} {{type}} {{active}}" data-value='{{value}}' data-editor="{{editor}}">{{value}}</button>
	          </div>
	          {{/buttons}}
	        </div>
	      </div>
	    </div>
	    
	    <div id="controlTemplate" class="hide">
	      <div class="control-box hide">
	        <div class="btn-group" role="group">
	          <button type="button" class="btn btn-primary btn-xs" data-control="capture">
	              <i class="fa fa-picture-o"></i>
	          </button>
	          <button type="button" class="btn btn-warning btn-xs" data-control="clone">
	              <i class="fa fa-clone"></i>
	          </button>
	          <button type="button" class="btn btn-xs">
	              <i class="fa fa-bars"></i>
	          </button>
	          <button type="button" class="btn btn-danger btn-xs" data-control="remove">
	              <i class="fa fa-times"></i>
	          </button>
	        </div>
	      </div>
	    </div>
	    
	    <div id="controlTemplateClone" class="hide">
	      <div class="control-box hide">
	        <div class="btn-group" role="group">
	          <button type="button" class="btn btn-warning btn-xs" data-control="clone"><i class="fa fa-clone"></i></button>
	          <button type="button" class="btn btn-danger btn-xs" data-control="remove"><i class="fa fa-times"></i></button>
	        </div>
	      </div>
	    </div>

		<script src="lib/jquery/jquery-1.12.0.min.js"></script>
		<script src="lib/bootstrap/js/bootstrap.min.js"></script>
		<script src="lib/file-tree/jqueryFileTree.js"></script>
		<script src="lib/editable/js/editable.plugin.js"></script>
	    <script src='https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
	    <script src='https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.1.2/mustache.min.js'></script>
	    <script src='https://github.com/niklasvh/html2canvas/releases/download/0.4.1/html2canvas.js'></script>
	    <script src='https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js'></script>
		<script src="lib/mdb-cms/js/mdb-core.js"></script>
		<script src="lib/mdb-cms/js/mdb-design.js"></script>
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