// INIT GLOBAL VARS
ctrlIsPressed = false;
editGroup = [];
childGroup = [];
$first = true;
modals = [{ id: "modalEditor", title: "EDITOR", content: "" }, { id: "modalCode", title: "CODE", content: "<textarea id='code-out' class='form-control' height='400' ></textarea>" }, { id: "modalExport", title: "EXPORT", content: "<img src='' id='image-out' class='col-xs-12' /><div class='clearfix'></div>" }];
DELAY = 700,
clicks = 0,
timer = null;

template = $("#preview").contents().find("#template");

$('#preview').on('load', function() {


  $("#preview").contents().find('body').delegate('[data-clone]', 'click', function() {
    clicks++;  //count clicks
    if(clicks === 1) {
        timer = setTimeout(function() {

            var parent = $(this).parent();
            $(this).clone().appendTo(parent);

            updateFile();
            clicks = 0;  //after action performed, reset counter
        }, DELAY);
    } else {
        clearTimeout(timer);  //prevent single-click action
        $(this).remove();

        updateFile();
        clicks = 0;  //after action performed, reset counter
    }
  });

  $("#preview").contents().find('body').delegate('[data-clone]', 'dblclick', function(e) {
    e.preventDefault();
  });


  template = $("#preview").contents().find("#template");
  initialize();

  var win = this.contentWindow,
      doc = win.document,
      body = doc.body,
      jQueryLoaded = false,
      jQuery;

  function loadJQueryUI() {
      body.removeChild(jQuery);
      jQuery = null;

      win.jQuery.ajax({
          url: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js',
          dataType: 'script',
          cache: true,
          success: function () {
              win.jQuery('.sortable').sortable({
                cursor: "move",
                axis: "y",
                opacity: 0.5,
                scroll: true, 
                scrollSensitivity: 100,
                cancel: ".editable",
              });
          }
      });
  }

  jQuery = doc.createElement('script');

  // based on https://gist.github.com/getify/603980
  jQuery.onload = jQuery.onreadystatechange = function () {
      if ((jQuery.readyState && jQuery.readyState !== 'complete' && jQuery.readyState !== 'loaded') || jQueryLoaded) {
          return false;
      }
      jQuery.onload = jQuery.onreadystatechange = null;
      jQueryLoaded = true;
      loadJQueryUI();
  };

  jQuery.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
  body.appendChild(jQuery);
});

// GENERATE MODALS
$.each(modals, function(key, value) {
  $('body').append(Mustache.render($("#modalTemplate").html(), value));
});

// DICUMENT.WINDOW EVENTS
$(document).keydown(function(event){
    if(event.which=="17") {
      window.parent.ctrlIsPressed = true;
      editGroup = [];
      childGroup = [];
    }
});
$(document).keyup(function(event){
  window.parent.ctrlIsPressed = false;
});

function generateBlocks() {
  blockCount = templateChild.length;
  blocks = {blocks: []};
  
  $.each(templateChild, function() {
    screenCapture($(this), false);
  });
}

$(document).ready(function() {
  // initialize();
});

function initialize() {

  // LOAD AND PREPARE TEMPLATE
  template.load("../_template.html", function() {
    templateChild = $("#preview").contents().find("#template > div");
    
    // $.each(template.find("[class*='col-sm']"), function() {
    //   $(this).attr("data-type", "wrapper");
    // });
    
    // $.each(template.find("*"), function() {
    //   var tag = $(this).tagNameLowerCase();
      
    //   if(tag === 'p')  $(this).attr("data-type", "paragraph");
    //   if(tag === 'img')  $(this).attr("data-type", "image");
    //   if(tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6')  $(this).attr("data-type", "header");
      
    //   if($(this).hasClass("navbar")) $(this).attr("data-type", "navbar");
    //   if($(this).hasClass("container")) $(this).attr("data-type", "container");
    //   if($(this).hasClass("container-fluid")) $(this).attr("data-type", "container");
    //   if($(this).hasClass("fa")) $(this).attr("data-type", "icon");
    //   if($(this).hasClass("btn")) $(this).attr("data-type", "button");
    //   if($(this).hasClass("form-group")) $(this).attr("data-type", "inputgroup");
    // });
    
    // $.each(template.find("[data-controller]"), function() {
    //   $(this).attr('data-type', 'section');
    //   $(this).attr('data-controller',true);
    //   $(this).prepend($("#controlTemplate").html());
    // });
    
    // $.each(template.find("[class*='col-sm']"), function() {
    //   $(this).attr('data-controller',true);
    //   $(this).prepend($("#controlTemplateClone").html());
    // });
    
    // $.each(template.find("[data-clone]"), function() {
    //   $(this).attr('data-controller',true);
    //   $(this).prepend($("#controlTemplateClone").html());
    // });
    
    generateBlocks();
  });
  // INIT CONTENT EDITABLES
  // editableBlocks = $('[contenteditable="true"]');
  // for (var i = 0; i < editableBlocks.length; i++) {
  //     CKEDITOR.inline(editableBlocks[i]);
  // }
  
  // SETUP BLOCKS
  // var $blocks = Mustache.render($('#template-blocks').html(), blocks);
  // $('.blocks').html($blocks); 
  
  // SETUP SORTABLES
  $sortable = $("#preview").contents().find(".sortable");

  // $sortable.sortable({
  //   cursor: "move",
  //   axis: "y",
  //   opacity: 0.5,
  //   scroll: true, 
  //   scrollSensitivity: 100,
  //   cancel: ".editable",
  // });
  
  if($first) {
    $first = false;
    // BLOCK EVENTS
    $(".blocks").delegate('.block','click', function(e) {
      e.preventDefault();
      var block = $(this).data("block");
      var html = template.find("#" + block).html();
      $sortable.append(html);

      updateFile();
    });
    // $("#btn-add-block").on('click', function() {
    //   var icon = $(this).find('i');
    //   if(icon.hasClass("fa-plus")) {
    //     icon.removeClass("fa-plus");
    //     icon.addClass("fa-times");
        
    //     $("#modalBlock").modal("show");
    //   } else {
    //     icon.removeClass("fa-times");
    //     icon.addClass("fa-plus");
        
    //     $(".modal").modal("hide");
    //   }
      
    //   window.parent.ctrlIsPressed = false;
    //   window.parent.childGroup = [];
    // });
    // $("#blocks").delegate('[data-controller]','mouseover', function() {
    //   $(this).children('.control-box').removeClass('hide');
    // });
    // $("#blocks").delegate('[data-controller]','mouseout', function() {
    //   $(this).children('.control-box').addClass('hide');
    // });
    
    // EDITOR EVENTS
    // $("body").delegate("[data-type]","click", function() {
    //   if(window.parent.ctrlIsPressed) {
    //     editGroup.push($(this));
    //     window.parent.childGroup = editGroup;
    //     window.parent.editDOM();
    //   }
    // });
    // $('#modalEditor').delegate("[data-editor]", "click", function(){
    //   var parent = $(this).closest(".panel-body");
    //   var index = parent.data("index");
    //   var value = $(this).data("value");
    //   var type = $(this).data("editor");
      
    //   if(type === 'icon') {
    //     parent.find(".icon-selected").html('<h3><i class="fa '+value+'"></i> '+value.replace("fa-","")+'</h3>');
    //   }
      
    //   $("." + type, parent).removeClass("active");
    //   $(this).addClass("active");
      
    //   updateDOM(index, type, value);
    // });
    // $('#modalEditor').delegate(".content", "blur", function() {
    //   var index = $(this).closest(".panel-body").data("index");
    //   var value = $(this).val();
    //   var type = "content";
      
    //   updateDOM(index, type, value);
    // });

    // CONTROLLER EVENTS
    // $("#blocks").delegate('[data-control]','click', function() {
    //   var action = $(this).attr("data-control");
    //   var parent = $(this).closest('[data-controller]');
      
    //   switch(action) {
    //     case "remove":
    //       parent.remove();
    //     break;
    //     case "capture":
    //       window.parent.screenCapture(parent, true);
    //     break;
    //     case "clone":
    //       parent.clone().insertAfter(parent);
    //     break;
    //   }

    //   updateFile();
    // });
    
    // EXPORT FUNCTION
    $("#btn-image-export").on('click', function() {
      screenCapture($sortable, true);
    });
    
    // MODAL EVENTS
    $(".modal").on('hidden.bs.modal', function () {
      var icon = $("#btn-add-block").find('i');
      icon.removeClass("fa-times");
      icon.addClass("fa-plus");
      
      editGroup = [];
      childGroup = [];
      ctrlIsPressed = false;
      window.parent.ctrlIsPressed = false;
      window.parent.childGroup = [];
      $("iframe")[0].contentWindow.editGroup = [];
    });
  }
  
}



function editDOM() {
  $("#modalEditor").find(".modal-body").html("");
  
  var icon = $("#btn-add-block").find('i');
  icon.removeClass("fa-plus");
  icon.addClass("fa-times");
  
  var html = "";
  html += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
  
  $.each(childGroup, function(key, value) {
    panel = { key: key, icon: getIcon($(value).data("type")), type: $(value).data("type"), content: getCode(key, value) };
    html +=  Mustache.render($("#panelTemplate").html(), panel);
  });
  
  html += '</div>';
  
  $("#modalEditor").find(".modal-body").append(html);
  
  $('#modalBlock').modal("hide");
  $('#modalEditor').modal("show");
  $('#modalExport').modal("hide");
}
function getCode(key, item) {
  var html = "";
  var item = $(item);
  
  switch(item.data("type")) {
    case "section":
      html += getAttrib("wrapper", item);
      html += getAttrib("bg-color", item);
    break;
    case "container":
      html += getAttrib("container", item);
      html += getAttrib("wrapper", item);
      html += getAttrib("text-align", item);
      html += getAttrib("bg-color", item);
    break;
    case "wrapper":
      html += getAttrib("wrapper", item);
      html += getAttrib("column", item);
      html += getAttrib("text-align", item);
      html += getAttrib("bg-color", item);
    break;
    case "form":
      html += getAttrib("wrapper", item);
      html += getAttrib("text-align", item);
      html += getAttrib("bg-color", item);
    break;
    case "inputgroup":
      html += getAttrib("column", item);
    break;
    case "formbuttons":
      html += getAttrib("text-align", item);
    break;
    case "navbar":
      html += getAttrib("navbar", item);
    break;
    case "header":
      html += getAttrib("header", item);
      html += getAttrib("text-color", item);
      html += getAttrib("text-align", item);
      html += getAttrib("content", item);
    break;
    case "paragraph":
      html += getAttrib("text-color", item);
      html += getAttrib("text-align", item);
      html += getAttrib("content", item);
    break;
    case "icon":
      html += getAttrib("icon", item);
      html += getAttrib("text-color", item);
    break;
    case "button":
      html += getAttrib("button", item);
      html += getAttrib("text-align", item);
      html += getAttrib("content", item);
    break;
  }
  
  return html;
}
function getAttrib(type, item) {
  var html = "";
  switch(type) {
    case "navbar":
      var c = ['navbar-clear', 'navbar-default', 'navbar-inverse'];
      var btnGroups = { 
        label: "Nav Type:",
        buttons: [],
      }
      
      $.each(c, function(key, value) {
        if(item.hasClass(value))
          btnGroups.buttons.push({ button: "btn-default", type: "nav-type", active: "active", value: value, editor: "nav-type" });
        else
          btnGroups.buttons.push({ button: "btn-default", type: "nav-type", active: "", value: value, editor: "nav-type" });
      });
      
      html += Mustache.render($("#panelBtnGroupTemplate").html(), btnGroups);
      
      var s = ['navbar-float', 'navbar-fixed-top', 'navbar-fixed-bottom'];
      var btnGroups = { 
        label: "Nav Position:",
        buttons: [],
      }
      
      $.each(s, function(key, value) {
        if(item.hasClass(value))
          btnGroups.buttons.push({ button: "btn-default", type: "nav-position", active: "active", value: value, editor: "nav-position" });
        else
          btnGroups.buttons.push({ button: "btn-default", type: "nav-position", active: "", value: value, editor: "nav-position" });
      });
      
      html += Mustache.render($("#panelBtnGroupTemplate").html(), btnGroups);
    break;
    case "container":
      var c = ['container', 'container-fluid'];
      var btnGroups = { 
        label: "Container Type:",
        buttons: [],
      }
      
      $.each(c, function(key, value) {
        if(item.hasClass(value))
          btnGroups.buttons.push({ button: "btn-default", type: "btn-container", active: "active", value: value, editor: "btn-container" });
        else
          btnGroups.buttons.push({ button: "btn-default", type: "btn-container", active: "", value: value, editor: "btn-container" });
      });
      
      html += Mustache.render($("#panelBtnGroupTemplate").html(), btnGroups);
    break;
    case "wrapper":
      var c = ['default', 'page-header', 'thumbnail', 'well', 'jumbotron'];
      var btnGroups = { 
        label: "Wrapper Type:",
        buttons: [],
      }
      
      $.each(c, function(key, value) {
        if(item.hasClass(value))
          btnGroups.buttons.push({ button: "btn-default", type: "btn-wrapper", active: "active", value: value, editor: "btn-wrapper" });
        else
          btnGroups.buttons.push({ button: "btn-default", type: "btn-wrapper", active: "", value: value, editor: "btn-wrapper" });
      });
      
      html += Mustache.render($("#panelBtnGroupTemplate").html(), btnGroups);
    break;
    case "column":
      var c = [];
      for(i=1; i<=12; i++){
        c.push("col-sm-"+i);
      }
      
      html += '<div class="form-group">';
        html += '<label>Column Size:</label>';
        html += '<div class="btn-group btn-group-justified" role="group">';
        $.each(c, function(key, value) {
          html += '<div class="btn-group" role="group">';
          if(item.hasClass(value))
            html += '<button type="button" class="btn btn-default btn-column active" data-value='+value+' data-editor="btn-column">'+value.split("-")[2]+'</button>';
          else
            html += '<button type="button" class="btn btn-default btn-column" data-value='+value+' data-editor="btn-column">'+value.split("-")[2]+'</button>';
          html += '</div>';
        });
        html += '</div>';
      html += '</div>';
    break;
    case "content":
      html += '<div class="form-group">';
        html += '<label>Content:</label>';
        html += '<textarea class="form-control content">' + item.html() + '</textarea>';
      html += '</div>';
    break;
    case "header":
      var c = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      var tag = item.tagNameLowerCase();
      var btnGroups = { 
        label: "Header Type:",
        buttons: [],
      }
      
      $.each(c, function(key, value) {
        if(value === tag)
          btnGroups.buttons.push({ button: "btn-default", type: "btn-header", active: "active", value: value, editor: "btn-header" });
        else
          btnGroups.buttons.push({ button: "btn-default", type: "btn-header", active: "", value: value, editor: "btn-header" });
      });
      
      html += Mustache.render($("#panelBtnGroupTemplate").html(), btnGroups);
    break;
    case "paragraph":
    break;
    case "icon":
      var fa = {"blank":"", "cc": "&#xf20a;", "bookmark": "&#xf02e;", "venus-mars": "&#xf228;", "arrow-circle-o-down": "&#xf01a;", "comment-o": "&#xf0e5;", "long-arrow-left": "&#xf177;", "arrow-right": "&#xf061;", "delicious": "&#xf1a5;", "chevron-circle-left": "&#xf137;", "bullhorn": "&#xf0a1;", "outdent": "&#xf03b;", "jpy": "&#xf157;", "drupal": "&#xf1a9;", "hdd-o": "&#xf0a0;", "hand-o-left": "&#xf0a5;", "pinterest": "&#xf0d2;", "plane": "&#xf072;", "question": "&#xf128;", "child": "&#xf1ae;", "circle-o": "&#xf10c;", "italic": "&#xf033;", "meanpath": "&#xf20c;", "subway": "&#xf239;", "google-plus": "&#xf0d5;", "angle-up": "&#xf106;", "star": "&#xf005;", "star-half-empty": "&#xf123;", "facebook-official": "&#xf230;", "youtube-square": "&#xf166;", "rss": "&#xf09e;", "toggle-off": "&#xf204;", "list-ol": "&#xf0cb;", "dot-circle-o": "&#xf192;", "copyright": "&#xf1f9;", "user": "&#xf007;", "key": "&#xf084;", "minus-square-o": "&#xf147;", "mobile": "&#xf10b;", "table": "&#xf0ce;", "columns": "&#xf0db;", "bolt": "&#xf0e7;", "fighter-jet": "&#xf0fb;", "share-square-o": "&#xf045;", "file-archive-o": "&#xf1c6;", "retweet": "&#xf079;", "level-up": "&#xf148;", "caret-left": "&#xf0d9;", "arrow-circle-o-left": "&#xf190;", "wrench": "&#xf0ad;", "shekel": "&#xf20b;", "eraser": "&#xf12d;", "sort-amount-asc": "&#xf160;", "vimeo-square": "&#xf194;", "gittip": "&#xf184;", "cube": "&#xf1b2;", "phone-square": "&#xf098;", "sort-asc": "&#xf0de;", "skyatlas": "&#xf216;", "beer": "&#xf0fc;", "behance-square": "&#xf1b5;", "binoculars": "&#xf1e5;", "folder-open": "&#xf07c;", "paint-brush": "&#xf1fc;", "whatsapp": "&#xf232;", "picture-o": "&#xf03e;", "sort-down": "&#xf0dd;", "chevron-circle-up": "&#xf139;", "bell-slash-o": "&#xf1f7;", "image": "&#xf03e;", "tumblr-square": "&#xf174;", "repeat": "&#xf01e;", "wheelchair": "&#xf193;", "underline": "&#xf0cd;", "group": "&#xf0c0;", "cab": "&#xf1ba;", "thumbs-down": "&#xf165;", "step-backward": "&#xf048;", "expand": "&#xf065;", "th-list": "&#xf00b;", "renren": "&#xf18b;", "list-ul": "&#xf0ca;", "flash": "&#xf0e7;", "certificate": "&#xf0a3;", "thumbs-up": "&#xf164;", "cc-amex": "&#xf1f3;", "empire": "&#xf1d1;", "random": "&#xf074;", "database": "&#xf1c0;", "check-square": "&#xf14a;", "search-minus": "&#xf010;", "volume-off": "&#xf026;", "legal": "&#xf0e3;", "slack": "&#xf198;", "gavel": "&#xf0e3;", "quote-right": "&#xf10e;", "rebel": "&#xf1d0;", "external-link-square": "&#xf14c;", "comments": "&#xf086;", "dashcube": "&#xf210;", "btc": "&#xf15a;", "terminal": "&#xf120;", "align-justify": "&#xf039;", "font": "&#xf031;", "unlink": "&#xf127;", "arrow-circle-o-right": "&#xf18e;", "file-photo-o": "&#xf1c5;", "hotel": "&#xf236;", "angle-double-left": "&#xf100;", "map-marker": "&#xf041;", "lightbulb-o": "&#xf0eb;", "buysellads": "&#xf20d;", "sort": "&#xf0dc;", "file-sound-o": "&#xf1c7;", "github": "&#xf09b;", "comments-o": "&#xf0e6;", "css3": "&#xf13c;", "instagram": "&#xf16d;", "exclamation-circle": "&#xf06a;", "street-view": "&#xf21d;", "book": "&#xf02d;", "unlock-alt": "&#xf13e;", "unlock": "&#xf09c;", "facebook-f": "&#xf09a;", "caret-square-o-left": "&#xf191;", "flask": "&#xf0c3;", "save": "&#xf0c7;", "file-excel-o": "&#xf1c3;", "git": "&#xf1d3;", "headphones": "&#xf025;", "apple": "&#xf179;", "th-large": "&#xf009;", "adjust": "&#xf042;", "minus-circle": "&#xf056;", "undo": "&#xf0e2;", "angle-double-up": "&#xf102;", "forward": "&#xf04e;", "file-picture-o": "&#xf1c5;", "xing": "&#xf168;", "wifi": "&#xf1eb;", "file-o": "&#xf016;", "ra": "&#xf1d0;", "university": "&#xf19c;", "truck": "&#xf0d1;", "cloud-upload": "&#xf0ee;", "graduation-cap": "&#xf19d;", "rotate-right": "&#xf01e;", "bank": "&#xf19c;", "hand-o-up": "&#xf0a6;", "soccer-ball-o": "&#xf1e3;", "paypal": "&#xf1ed;", "behance": "&#xf1b4;", "bar-chart": "&#xf080;", "institution": "&#xf19c;", "align-right": "&#xf038;", "stack-exchange": "&#xf18d;", "windows": "&#xf17a;", "space-shuttle": "&#xf197;", "youtube-play": "&#xf16a;", "phone": "&#xf095;", "ruble": "&#xf158;", "share-alt": "&#xf1e0;", "inbox": "&#xf01c;", "fire": "&#xf06d;", "steam-square": "&#xf1b7;", "calendar-o": "&#xf133;", "comment": "&#xf075;", "quote-left": "&#xf10d;", "tencent-weibo": "&#xf1d5;", "git-square": "&#xf1d2;", "sign-out": "&#xf08b;", "neuter": "&#xf22c;", "newspaper-o": "&#xf1ea;", "leanpub": "&#xf212;", "angellist": "&#xf209;", "stop": "&#xf04d;", "gratipay": "&#xf184;", "sort-numeric-desc": "&#xf163;", "heart-o": "&#xf08a;", "calculator": "&#xf1ec;", "mars-stroke-v": "&#xf22a;", "turkish-lira": "&#xf195;", "search": "&#xf002;", "calendar": "&#xf073;", "cc-stripe": "&#xf1f5;", "star-half-full": "&#xf123;", "fast-backward": "&#xf049;", "stumbleupon-circle": "&#xf1a3;", "check-circle": "&#xf058;", "rub": "&#xf158;", "edit": "&#xf044;", "microphone": "&#xf130;", "html5": "&#xf13b;", "remove": "&#xf00d;", "signal": "&#xf012;", "plus-square": "&#xf0fe;", "bold": "&#xf032;", "wordpress": "&#xf19a;", "usd": "&#xf155;", "facebook": "&#xf09a;", "lock": "&#xf023;", "caret-down": "&#xf0d7;", "ioxhost": "&#xf208;", "bell-slash": "&#xf1f6;", "long-arrow-down": "&#xf175;", "recycle": "&#xf1b8;", "print": "&#xf02f;", "stumbleupon": "&#xf1a4;", "filter": "&#xf0b0;", "vine": "&#xf1ca;", "share-alt-square": "&#xf1e1;", "arrow-circle-up": "&#xf0aa;", "heartbeat": "&#xf21e;", "rupee": "&#xf156;", "toggle-on": "&#xf205;", "toggle-right": "&#xf152;", "play-circle-o": "&#xf01d;", "microphone-slash": "&#xf131;", "sort-numeric-asc": "&#xf162;", "cc-mastercard": "&#xf1f1;", "life-bouy": "&#xf1cd;", "chevron-left": "&#xf053;", "ellipsis-v": "&#xf142;", "folder-open-o": "&#xf115;", "pencil": "&#xf040;", "file-video-o": "&#xf1c8;", "server": "&#xf233;", "train": "&#xf238;", "spotify": "&#xf1bc;", "simplybuilt": "&#xf215;", "user-plus": "&#xf234;", "file-movie-o": "&#xf1c8;", "maxcdn": "&#xf136;", "krw": "&#xf159;", "navicon": "&#xf0c9;", "angle-left": "&#xf104;", "caret-square-o-right": "&#xf152;", "mercury": "&#xf223;", "circle-thin": "&#xf1db;", "text-width": "&#xf035;", "wechat": "&#xf1d7;", "reorder": "&#xf0c9;", "envelope-square": "&#xf199;", "bitbucket-square": "&#xf172;", "frown-o": "&#xf119;", "line-chart": "&#xf201;", "mars": "&#xf222;", "arrow-circle-down": "&#xf0ab;", "caret-up": "&#xf0d8;", "tumblr": "&#xf173;", "star-o": "&#xf006;", "cart-plus": "&#xf217;", "check": "&#xf00c;", "lastfm": "&#xf202;", "pencil-square": "&#xf14b;", "trophy": "&#xf091;", "external-link": "&#xf08e;", "long-arrow-up": "&#xf176;", "envelope-o": "&#xf003;", "user-times": "&#xf235;", "trello": "&#xf181;", "file-powerpoint-o": "&#xf1c4;", "circle": "&#xf111;", "paper-plane": "&#xf1d8;", "google": "&#xf1a0;", "bug": "&#xf188;", "bitcoin": "&#xf15a;", "lastfm-square": "&#xf203;", "umbrella": "&#xf0e9;", "text-height": "&#xf034;", "send-o": "&#xf1d9;", "support": "&#xf1cd;", "paw": "&#xf1b0;", "cart-arrow-down": "&#xf218;", "twitch": "&#xf1e8;", "crop": "&#xf125;", "trash-o": "&#xf014;", "file": "&#xf15b;", "align-left": "&#xf036;", "user-md": "&#xf0f0;", "sellsy": "&#xf213;", "github-alt": "&#xf113;", "desktop": "&#xf108;", "info-circle": "&#xf05a;", "file-audio-o": "&#xf1c7;", "compass": "&#xf14e;", "dribbble": "&#xf17d;", "fast-forward": "&#xf050;", "weixin": "&#xf1d7;", "adn": "&#xf170;", "arrow-circle-o-up": "&#xf01b;", "eye": "&#xf06e;", "arrows-h": "&#xf07e;", "archive": "&#xf187;", "try": "&#xf195;", "reply": "&#xf112;", "mail-reply-all": "&#xf122;", "backward": "&#xf04a;", "spinner": "&#xf110;", "arrow-left": "&#xf060;", "level-down": "&#xf149;", "suitcase": "&#xf0f2;", "asterisk": "&#xf069;", "file-word-o": "&#xf1c2;", "meh-o": "&#xf11a;", "moon-o": "&#xf186;", "caret-right": "&#xf0da;", "smile-o": "&#xf118;", "times-circle-o": "&#xf05c;", "play-circle": "&#xf144;", "trash": "&#xf1f8;", "deviantart": "&#xf1bd;", "rocket": "&#xf135;", "play": "&#xf04b;", "tasks": "&#xf0ae;", "cny": "&#xf157;", "bars": "&#xf0c9;", "tachometer": "&#xf0e4;", "heart": "&#xf004;", "star-half": "&#xf089;", "camera": "&#xf030;", "music": "&#xf001;", "share-square": "&#xf14d;", "birthday-cake": "&#xf1fd;", "puzzle-piece": "&#xf12e;", "arrow-circle-right": "&#xf0a9;", "camera-retro": "&#xf083;", "sort-desc": "&#xf0dd;", "openid": "&#xf19b;", "language": "&#xf1ab;", "file-pdf-o": "&#xf1c1;", "ban": "&#xf05e;", "tree": "&#xf1bb;", "angle-double-down": "&#xf103;", "connectdevelop": "&#xf20e;", "toggle-up": "&#xf151;", "bell": "&#xf0f3;", "magic": "&#xf0d0;", "video-camera": "&#xf03d;", "jsfiddle": "&#xf1cc;", "vk": "&#xf189;", "tint": "&#xf043;", "photo": "&#xf03e;", "plus": "&#xf067;", "bus": "&#xf207;", "venus-double": "&#xf226;", "star-half-o": "&#xf123;", "download": "&#xf019;", "skype": "&#xf17e;", "credit-card": "&#xf09d;", "angle-double-right": "&#xf101;", "square": "&#xf0c8;", "cog": "&#xf013;", "list-alt": "&#xf022;", "arrows-alt": "&#xf0b2;", "gbp": "&#xf154;", "minus-square": "&#xf146;", "bullseye": "&#xf140;", "viacoin": "&#xf237;", "caret-square-o-down": "&#xf150;", "angle-right": "&#xf105;", "money": "&#xf0d6;", "cc-visa": "&#xf1f0;", "info": "&#xf129;", "toggle-left": "&#xf191;", "flag-checkered": "&#xf11e;", "qq": "&#xf1d6;", "cloud": "&#xf0c2;", "sliders": "&#xf1de;", "envelope": "&#xf0e0;", "lemon-o": "&#xf094;", "tty": "&#xf1e4;", "anchor": "&#xf13d;", "eject": "&#xf052;", "home": "&#xf015;", "life-saver": "&#xf1cd;", "rotate-left": "&#xf0e2;", "square-o": "&#xf096;", "location-arrow": "&#xf124;", "question-circle": "&#xf059;", "header": "&#xf1dc;", "ge": "&#xf1d1;", "briefcase": "&#xf0b1;", "close": "&#xf00d;", "hand-o-down": "&#xf0a7;", "stethoscope": "&#xf0f1;", "xing-square": "&#xf169;", "mars-double": "&#xf227;", "rouble": "&#xf158;", "mortar-board": "&#xf19d;", "clipboard": "&#xf0ea;", "male": "&#xf183;", "euro": "&#xf153;", "file-image-o": "&#xf1c5;", "weibo": "&#xf18a;", "sort-alpha-desc": "&#xf15e;", "reddit": "&#xf1a1;", "flag-o": "&#xf11d;", "automobile": "&#xf1b9;", "floppy-o": "&#xf0c7;", "magnet": "&#xf076;", "soundcloud": "&#xf1be;", "copy": "&#xf0c5;", "reddit-square": "&#xf1a2;", "flickr": "&#xf16e;", "minus": "&#xf068;", "cloud-download": "&#xf0ed;", "link": "&#xf0c1;", "eye-slash": "&#xf070;", "eyedropper": "&#xf1fb;", "thumbs-o-up": "&#xf087;", "tags": "&#xf02c;", "scissors": "&#xf0c4;", "chevron-right": "&#xf054;", "times": "&#xf00d;", "sun-o": "&#xf185;", "paperclip": "&#xf0c6;", "unsorted": "&#xf0dc;", "diamond": "&#xf219;", "google-plus-square": "&#xf0d4;", "spoon": "&#xf1b1;", "digg": "&#xf1a6;", "bitbucket": "&#xf171;", "yahoo": "&#xf19e;", "building-o": "&#xf0f7;", "transgender": "&#xf224;", "bomb": "&#xf1e2;", "glass": "&#xf000;", "gamepad": "&#xf11b;", "futbol-o": "&#xf1e3;", "youtube": "&#xf167;", "paper-plane-o": "&#xf1d9;", "hacker-news": "&#xf1d4;", "coffee": "&#xf0f4;", "tablet": "&#xf10a;", "yen": "&#xf157;", "send": "&#xf1d8;", "exclamation-triangle": "&#xf071;", "upload": "&#xf093;", "stack-overflow": "&#xf16c;", "tag": "&#xf02b;", "steam": "&#xf1b6;", "at": "&#xf1fa;", "ticket": "&#xf145;", "exclamation": "&#xf12a;", "life-ring": "&#xf1cd;", "dollar": "&#xf155;", "file-zip-o": "&#xf1c6;", "eur": "&#xf153;", "cogs": "&#xf085;", "exchange": "&#xf0ec;", "barcode": "&#xf02a;", "check-circle-o": "&#xf05d;", "code": "&#xf121;", "fax": "&#xf1ac;", "mobile-phone": "&#xf10b;", "hand-o-right": "&#xf0a4;", "female": "&#xf182;", "search-plus": "&#xf00e;", "caret-square-o-up": "&#xf151;", "sitemap": "&#xf0e8;", "chevron-circle-down": "&#xf13a;", "dropbox": "&#xf16b;", "thumbs-o-down": "&#xf088;", "plug": "&#xf1e6;", "angle-down": "&#xf107;", "power-off": "&#xf011;", "gear": "&#xf013;", "linkedin": "&#xf0e1;", "forumbee": "&#xf211;", "refresh": "&#xf021;", "shield": "&#xf132;", "chevron-down": "&#xf078;", "user-secret": "&#xf21b;", "reply-all": "&#xf122;", "sign-in": "&#xf090;", "won": "&#xf159;", "leaf": "&#xf06c;", "foursquare": "&#xf180;", "yelp": "&#xf1e9;", "arrow-up": "&#xf062;", "cc-paypal": "&#xf1f4;", "sheqel": "&#xf20b;", "strikethrough": "&#xf0cc;", "ship": "&#xf21a;", "twitter-square": "&#xf081;", "transgender-alt": "&#xf225;", "toggle-down": "&#xf150;", "long-arrow-right": "&#xf178;", "linux": "&#xf17c;", "mail-reply": "&#xf112;", "ils": "&#xf20b;", "clock-o": "&#xf017;", "gift": "&#xf06b;", "pie-chart": "&#xf200;", "chevron-up": "&#xf077;", "laptop": "&#xf109;", "pied-piper-alt": "&#xf1a8;", "qrcode": "&#xf029;", "dashboard": "&#xf0e4;", "crosshairs": "&#xf05b;", "chain-broken": "&#xf127;", "hospital-o": "&#xf0f8;", "shirtsinbulk": "&#xf214;", "cc-discover": "&#xf1f2;", "indent": "&#xf03c;", "arrow-circle-left": "&#xf0a8;", "bar-chart-o": "&#xf080;", "motorcycle": "&#xf21c;", "flag": "&#xf024;", "check-square-o": "&#xf046;", "road": "&#xf018;", "area-chart": "&#xf1fe;", "sort-alpha-asc": "&#xf15d;", "sort-amount-desc": "&#xf161;", "pencil-square-o": "&#xf044;", "volume-down": "&#xf027;", "superscript": "&#xf12b;", "warning": "&#xf071;", "keyboard-o": "&#xf11c;", "genderless": "&#xf1db;", "google-wallet": "&#xf1ee;", "volume-up": "&#xf028;", "codepen": "&#xf1cb;", "th": "&#xf00a;", "file-code-o": "&#xf1c9;", "facebook-square": "&#xf082;", "plus-circle": "&#xf055;", "pinterest-p": "&#xf231;", "rmb": "&#xf157;", "paste": "&#xf0ea;", "pagelines": "&#xf18c;", "plus-square-o": "&#xf196;", "building": "&#xf1ad;", "chain": "&#xf0c1;", "mars-stroke": "&#xf229;", "ambulance": "&#xf0f9;", "step-forward": "&#xf051;", "pied-piper": "&#xf1a7;", "github-square": "&#xf092;", "bed": "&#xf236;", "medkit": "&#xf0fa;", "sort-up": "&#xf0de;", "folder-o": "&#xf114;", "dedent": "&#xf03b;", "code-fork": "&#xf126;", "life-buoy": "&#xf1cd;", "compress": "&#xf066;", "folder": "&#xf07b;", "cut": "&#xf0c4;", "venus": "&#xf221;", "circle-o-notch": "&#xf1ce;", "gears": "&#xf085;", "mars-stroke-h": "&#xf22b;", "film": "&#xf008;", "files-o": "&#xf0c5;", "align-center": "&#xf037;", "arrows": "&#xf047;", "cubes": "&#xf1b3;", "inr": "&#xf156;", "cutlery": "&#xf0f5;", "users": "&#xf0c0;", "rss-square": "&#xf143;", "arrow-down": "&#xf063;", "share": "&#xf064;", "history": "&#xf1da;", "times-circle": "&#xf057;", "joomla": "&#xf1aa;", "arrows-v": "&#xf07d;", "slideshare": "&#xf1e7;", "list": "&#xf03a;", "file-text": "&#xf15c;", "linkedin-square": "&#xf08c;", "medium": "&#xf23a;", "android": "&#xf17b;", "paragraph": "&#xf1dd;", "pinterest-square": "&#xf0d3;", "ellipsis-h": "&#xf141;", "bell-o": "&#xf0a2;", "shopping-cart": "&#xf07a;", "thumb-tack": "&#xf08d;", "globe": "&#xf0ac;", "subscript": "&#xf12c;", "bicycle": "&#xf206;", "file-text-o": "&#xf0f6;", "pause": "&#xf04c;", "chevron-circle-right": "&#xf138;", "car": "&#xf1b9;", "taxi": "&#xf1ba;", "twitter": "&#xf099;", "h-square": "&#xf0fd;", "mail-forward": "&#xf064;", "bookmark-o": "&#xf097;", "fire-extinguisher": "&#xf134;"}
      var classes = item.attr("class").split(" ");
      
      $.each(classes, function(key,value) {
        if (value.indexOf("fa-") >= 0) {
          html += '<div class="icon-selected col-xs-12 text-center"><h3><i class="fa '+value+'"></i> '+value.replace("fa-","")+'</h3></div>';
        }
      });
      
      // html += '<div class="col-xs-12"><div class="form-group search"><form><input type="search" class="form-control" placeholder="Search" /></form></div></div>';
      
      html += '<div class="col-xs-12 list" style="height: 200px; overflow-y: auto; margin-bottom: 20px;">';
      $.each(fa, function(key, value) {
        if(item.hasClass("fa-"+key)) {
          html += '<button class="btn btn-icon btn-default active" data-value="fa-'+key+'" data-editor="btn-icon"><i class="fa fa-'+key+'"></i> '+key+'</button>';
        } else {
          html += '<button class="btn btn-icon btn-default" data-value="fa-'+key+'" data-editor="btn-icon"><i class="fa fa-'+key+'"></i> '+key+'</button>';
        }
      });
        html += '<style>.btn-icon {width: 167px; height: 50px; border-radius: 0px !important;}</style>';
      html += '</div>';
    break;
    case "button":
      var c = ['btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger'];
      
      html += '<div class="form-group">';
        html += '<label>Button Color:</label>';
        html += '<div class="btn-group btn-group-justified" role="group">';
      
        $.each(c, function(key, value) {
          html += '<div class="btn-group" role="group">';
          
          if(item.hasClass(value)) 
            html += '<button type="button" class="btn '+value+' btn-color active" data-value='+value+' data-editor="btn-color">'+value.split("-")[1]+'</button>';
          else
            html += '<button type="button" class="btn '+value+' btn-color" data-value='+value+' data-editor="btn-color">'+value.split("-")[1]+'</button>';
          
          html += '</div>';
        });
        
        html += '</div>';
      html += '</div>';
      
      var s = ['btn-default', 'btn-xs', 'btn-sm', 'btn-lg'];
      
      html += '<div class="form-group">';
        html += '<label>Button Size:</label>';
        html += '<div class="btn-group btn-group-justified" role="group">';
      
        $.each(s, function(key, value) {
          html += '<div class="btn-group" role="group">';
          
          if(item.hasClass(value)) 
            html += '<button type="button" class="btn btn-default btn-size active" data-value='+value+' data-editor="btn-size">'+value+'</button>';
          else
            html += '<button type="button" class="btn btn-default btn-size" data-value='+value+' data-editor="btn-size">'+value+'</button>';
          
          html += '</div>';
        });
        
        html += '</div>';
      html += '</div>';
    break;
    case "text-color":
      var c = ['text-default', 'text-primary', 'text-success', 'text-info', 'text-warning', 'text-danger', 'text-muted'];
      
      html += '<div class="form-group">';
        html += '<label>Text Color:</label>';
        html += '<div class="btn-group btn-group-justified" role="group">';
      
        $.each(c, function(key, value) {
          html += '<div class="btn-group" role="group">';
          
          if(item.hasClass(value)) 
            html += '<button type="button" class="btn btn-default text-color active" data-value='+value+' data-editor="text-color"><span class="'+value+'">'+value.split("-")[1]+'</span></button>';
          else
            html += '<button type="button" class="btn btn-default text-color" data-value='+value+' data-editor="text-color"><span class="'+value+'">'+value.split("-")[1]+'</span></button>';
          
          html += '</div>';
        });
        
        html += '</div>';
      html += '</div>';
      
    break;
    case "text-align":
      
      var s = ['text-left', 'text-center', 'text-nowrap', 'text-justified', 'text-right'];
      
      html += '<div class="form-group">';
        html += '<label>Text Align:</label>';
        html += '<div class="btn-group btn-group-justified" role="group">';
      
        $.each(s, function(key, value) {
          html += '<div class="btn-group" role="group">';
          
          if(item.hasClass(value)) 
            html += '<button type="button" class="btn btn-default text-align active" data-value='+value+' data-editor="text-align">'+getIcon(value)+'</button>';
          else
            html += '<button type="button" class="btn btn-default text-align" data-value='+value+' data-editor="text-align">'+getIcon(value)+'</button>';
          
          html += '</div>';
        });
        
        html += '</div>';
      html += '</div>';
    break;
    case "bg-color":
      var c = ['bg-default', 'bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
      
      html += '<div class="form-group">';
        html += '<label>BG Color:</label>';
        html += '<div class="btn-group btn-group-justified" role="group">';
      
        $.each(c, function(key, value) {
          html += '<div class="btn-group" role="group">';
          
          if(item.hasClass(value)) 
            html += '<button type="button" class="btn btn-default btn-'+value.split("-")[1]+' bg-color active" data-value='+value+' data-editor="bg-color">'+value.split("-")[1]+'</button>';
          else
            html += '<button type="button" class="btn btn-default btn-'+value.split("-")[1]+' bg-color" data-value='+value+' data-editor="bg-color">'+value.split("-")[1]+'</button>';
          
          html += '</div>';
        });
        
        html += '</div>';
      html += '</div>';
      
    break;
  }
  return html;
}
function updateDOM(index, type, value) {
  // alert(index+type+value);
  switch(type) {
    case "nav-type":
      var c = ['navbar-clear', 'navbar-default', 'navbar-inverse'];
      $.each(c, function(key, val) {
        $(childGroup[index]).removeClass(val);
      });
      
      $(childGroup[index]).addClass(value);
    break;
    case "nav-position":
      var c = ['navbar-float', 'navbar-fixed-top', 'navbar-fixed-bottom'];
      $.each(c, function(key, val) {
        $(childGroup[index]).removeClass(val);
      });
      
      $(childGroup[index]).addClass(value);
    break;
    case "btn-container":
      if(value === 'container') {
        $(childGroup[index]).removeClass('container-fluid');
        $(childGroup[index]).addClass('container');
      } else {
        $(childGroup[index]).removeClass('container');
        $(childGroup[index]).addClass('container-fluid');
      }
    break;
    case "btn-wrapper":
      var c = ['default', 'page-header', 'thumbnail', 'well', 'jumbotron'];
      $.each(c, function(key, val) {
        $(childGroup[index]).removeClass(val);
      });
      
      $(childGroup[index]).addClass(value);
    break;
    case "btn-column":
      for(i=1; i<=12; i++){
        val = "col-sm-"+i;
        $(childGroup[index]).removeClass(val);
      }
      
      $(childGroup[index]).addClass(value);
    break;
    case "btn-header":
      $(childGroup[index]).changeTag(value);
      $("#modalEditor").modal("hide");
    break;
    case "paragraph":
    break;
    case "btn-icon":
      $(childGroup[index]).removeClass(function (index, css) {
          return (css.match (/(^|\s)fa-\S+/g) || []).join(' ');
      });
      $(childGroup[index]).addClass(value);
    break;
    case "content":
      $(childGroup[index]).html(value);
    break;
    case "btn-color":
      var c = ['btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger'];
      $.each(c, function(key, val) {
        $(childGroup[index]).removeClass(val);
      });
      
      $(childGroup[index]).addClass(value);
    break;
    case "btn-size":
      var s = ['btn-default', 'btn-xs', 'btn-sm', 'btn-lg'];
      $.each(s, function(key, val) {
        $(childGroup[index]).removeClass(val);
      });
      
      $(childGroup[index]).addClass(value);
    break;
    case "text-color":
      var c = ['text-default', 'text-primary', 'text-success', 'text-info', 'text-warning', 'text-danger', 'text-muted'];
      $.each(c, function(key, val) {
        $(childGroup[index]).removeClass(val);
      });
      
      $(childGroup[index]).addClass(value);
    break;
    case "text-align":
      var s = ['text-left', 'text-center', 'text-nowrap', 'text-justified', 'text-right'];
      $.each(s, function(key, val) {
        $(childGroup[index]).removeClass(val);
      });
      
      $(childGroup[index]).addClass(value);
    break;
    case "bg-color":
      var c = ['bg-default', 'bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
      $.each(c, function(key, val) {
        $(childGroup[index]).removeClass(val);
      });
      
      $(childGroup[index]).addClass(value);
    break;
  }
}

// ICONS
function getIcon(type) {
  var html = "";
  switch(type) {
    case "navbar":
      html += '<i class="fa fa-bars"></i>';
    break;
    case "container":
      html += '<i class="fa fa-square-o"></i>';
    break;
    case "section":
      html += '<i class="fa fa-object-group"></i>';
    break;
    case "form":
      html += '<i class="fa fa-object-group"></i>';
    break;
    case "inputgroup":
      html += '<i class="fa fa-tasks"></i>';
    break;
    case "formbuttons":
      html += '<i class="fa fa-hand-pointer-o"></i>';
    break;
    case "wrapper":
      html += '<i class="fa fa-columns"></i>';
    break;
    case "header":
      html += '<i class="fa fa-header"></i>';
    break;
    case "paragraph":
      html += '<i class="fa fa-paragraph"></i>';
    break;
    case "icon":
      html += '<i class="fa fa-info-circle"></i>';
    break;
    case "button":
      html += '<i class="fa fa-hand-pointer-o"></i>';
    break;
    case "text-left":
      html += '<i class="fa fa-align-left"></i>';
    break;
    case "text-right":
      html += '<i class="fa fa-align-right"></i>';
    break;
    case "text-center":
      html += '<i class="fa fa-align-center"></i>';
    break;
    case "text-justified":
      html += '<i class="fa fa-align-justify"></i>';
    break;
    case "text-nowrap":
      html += '<i class="fa fa-arrows-h"></i>';
    break;
  }
  return html;
}

// EXPORT FUNCTIONS
function screenCapture(screen, preview) {
  $("#preview").contents().find("body").scrollTop(0);
  
  html2canvas(screen, {
    onrendered: function(canvas) {
      theCanvas = canvas;
      
      if(preview) {
        $("#image-out").attr('src', canvas.toDataURL());
  
        var icon = $("#btn-add-block").find('i');
        icon.removeClass("fa-plus");
        icon.addClass("fa-times");
            
        $('#modalBlock').modal("hide");
        $('#modalEditor').modal("hide");
        $('#modalExport').modal("show");
      } else {
        var name = screen.attr('id');
        var url = canvas.toDataURL();
        blocks.blocks.push({name: name, image: url});
        
        renderBlocks(); 
        
        if(blockCount === blocks.blocks.length) {
          template.addClass('hide');
        }
      }
    }
  });
}

function renderBlocks() {
  var $blocks = Mustache.render($('#template-blocks').html(), blocks);
  $('.blocks').html($blocks);
}
function createHTML() {
  var filename = prompt("Please enter filename", "index.html");
  var zip = new JSZip();
  zip.file(filename, $("#preview").contents().find("#blocks").html());
  content = zip.generate();
  location.href="data:application/zip;base64," + content;
}

$(".sortable").sortable({
  cursor: "move",
  axis: "y",
  opacity: 0.5,
  scroll: true, 
  scrollSensitivity: 100,
  cancel: ".editable",
});

// CUSTOM JQUERY FUNCTIONS
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














