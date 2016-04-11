/*******************************************************************************
 *  _  _ ___ ___     _ _
 * | \| | __/ __| __| | |__
 * | .` | _|\__ \/ _` | '_ \
 * |_|\_|_| |___/\__,_|_.__/
 *
 * Copyright (C) 2014-2016 Appsicle
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * As a special exception, the copyright holders give permission to link the
 * code of portions of this program with the OpenSSL library under certain
 * conditions as described in each individual source file and distribute
 * linked combinations including the program with the OpenSSL library. You
 * must comply with the GNU Affero General Public License in all respects for
 * all of the code used other than as permitted herein. If you modify file(s)
 * with this exception, you may extend this exception to your version of the
 * file(s), but you are not obligated to do so. If you do not wish to do so,
 * delete this exception statement from your version. If you delete this
 * exception statement from all source files in the program, then also delete
 * it in the license file.
 *
 ******************************************************************************/

"use strict";function s4(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function guid(){return s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4()}function toSize(e){return 1024>e?e:1048576>e?Math.round(e/1024)+"KB":1073741824>e?Math.round(e/1024/1024)+"MB":Math.round(e/1024/1024/1024)+"GB"}function nopropagation(e){e.stopPropagation(),e.preventDefault&&e.preventDefault()}function localStorageSupport(){return"localStorage"in window&&null!==window.localStorage}function fixHeight(){var e=$("body > #wrapper").height()-61;$(".sidebard-panel").css("min-height",e+"px");var t=$("nav.navbar-default").height(),a=$("#page-wrapper"),n=a.height();t>n&&a.css("min-height",t+"px"),n>t&&a.css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&(t>n?a.css("min-height",t-60+"px"):a.css("min-height",$(window).height()-60+"px"))}!function(e){e.fn.importManager=function(){function t(t){if(t.lengthComputable){var a=t.loaded||t.position;e("#"+q.id).find(" > .ud-progress").css("width",100*a/q.size+"%")}}function a(){var t=!1,a=!1;for(var n in T)if(T.hasOwnProperty(n)){var i=T[n];if(i.selected&&(t=!0,i.retry)){a=!0;break}}e("#btnImportClearSelected").attr("disabled",!t),e("#btnRetry").attr("disabled",!a)}function n(t,n){var i=T[n];i.retry=2,e("#"+n+" > .ud-c1").html(i.name+'<span class="label label-danger m-l-lg">overwrite</span>'),a()}function i(t,n){var i=T[n];i.retry=1,e("#"+n+" > .ud-c1").html(i.name+'<span class="label label-primary m-l-lg">append</span>'),a()}function s(t,n){var i=T[n];i.retry=0,e("#"+n+" > .ud-c1").html(i.name),a()}function o(){var a=e.ajaxSettings.xhr();return a.upload&&a.upload.addEventListener("progress",t,!1),a}function r(){e("#btnImportCancel").attr("disabled",null===q)}function l(){var t=e(this).parent().attr("id"),n=e("#"+t).find(".fa"),i=T[t];i.selected=!i.selected,i.selected?n.removeClass("fa-square-o").addClass("fa-check-square-o"):n.removeClass("fa-check-square-o").addClass("fa-square-o"),a()}function d(t){var a=T[e(this).parent().attr("id")];a.importState>-1&&e(document).trigger("import.detail",a),nopropagation(t)}function c(t){S.append('<div id="'+t.id+'" class="ud-row" style="top: '+I+'px;"><div class="ud-cell ud-c0"><i class="fa fa-square-o ud-checkbox"></i></div><div class="ud-cell ud-c1">'+t.name+'</div><div class="ud-cell ud-c2">'+t.sizeFmt+'</div><div class="ud-cell ud-c3"><span class="label">pending</span></div></div>');var a=e("#"+t.id);a.find(".ud-c0").click(l),a.find(".ud-c1").click(d),a.find(".ud-c2").click(d),a.find(".ud-c3").click(d),I+=E}function u(t,a,n){var i=e("#"+t.id);if(i.find(" > .ud-c3").html(a),i.find(" > .ud-progress").remove(),n){var s=z.shift();s?b(s):(q=null,O=null)}r(),e(document).trigger("import.detail.updated",t)}function p(e){"OK"===e.status?(q.response=e,q.importState=0,s(null,q.id),u(q,'<span class="label label-success">imported</span>',!0)):(q.importState=4,q.response=e.status,u(q,'<span class="label label-danger">failed</span>',!0))}function f(e){switch(e){case 0:return 3;case 500:return 5;default:return 101}}function m(e){q.response=e.responseText,s(null,q.id),"abort"!==e.statusText?(q.importState=f(e.status),u(q,'<span class="label label-danger">failed</span>',!0)):(q.importState=-2,u(q,'<span class="label label-warning">aborted</span>',!0))}function g(){return M.url="/imp?fmt=json",2===q.retry&&(M.url+="&o=true"),M.xhr=o,M.data=new FormData,M.data.append("data",q.file),M}function h(){u(q,'<span class="label label-info">importing</span>',!1),e("#"+q.id).append('<div class="ud-progress"></div>'),O=e.ajax(g()).done(p).fail(m),r()}function v(e){switch(e.status){case"EXISTS":q.importState=1,u(q,'<span class="label label-danger">exists</span>',!0);break;case"DOES_NOT_EXIST":q.importState=0,h();break;case"EXISTS_FOREIGN":q.importState=2,u(q,'<span class="label label-danger">reserved</span>',!0);break;default:q.importState=101,u(q,'<span class="label label-danger">failed</span>',!0)}}function b(t){q=t,t.retry?(q.importState=0,h()):(D.url="/chk?f=json&j="+t.name,e.ajax(D).then(v).fail(m))}function y(e,t){for(var a=0;a<t.files.length;a++){var n=t.files[a],i={id:guid(),name:n.name,size:n.size,file:n,sizeFmt:toSize(n.size),selected:!1,imported:!1};T[i.id]=i,c(i),null!=q?z.push(i):b(i)}}function $(){for(var t in T)if(T.hasOwnProperty(t)){var n=T[t];if(n.selected&&n!==q){var i=z.indexOf(n);i>-1&&delete z[i],e("#"+t).remove(),delete T[t],e(document).trigger("import.cleared",n)}}I=0;for(var s=S.find(".ud-row"),o=0;o<s.length;o++)e(s[o]).css("top",I),I+=E;a()}function C(){for(var e in T)if(T.hasOwnProperty(e)){var t=T[e];t.selected&&t.retry&&(null===q?b(t):z.push(t))}}function w(){null!==O&&O.abort()}function x(){e(document).on("dropbox.files",y),e(document).on("import.clearSelected",$),e(document).on("import.cancel",w),e(document).on("import.retry",C),e(document).on("import.line.overwrite",n),e(document).on("import.line.append",i),e(document).on("import.line.cancel",s)}function k(){j.append('<div class="ud-header-row"><div class="ud-header ud-h0">&nbsp;</div><div class="ud-header ud-h1">File name</div><div class="ud-header ud-h2">Size</div><div class="ud-header ud-h3">Status</div></div>'),j.append('<div class="ud-canvas"></div>'),S=j.find("> .ud-canvas"),x()}var S,T={},j=this,I=0,z=[],q=null,E=35,O=null,M={xhr:o,url:"/imp?fmt=json",type:"POST",contentType:!1,processData:!1,cache:!1},D={type:"GET",contentType:!1,processData:!1,cache:!1};return k(),this},e.fn.dropbox=function(){function t(){s.addClass("drag-drop").removeClass("drag-idle")}function a(){s.removeClass("drag-drop").addClass("drag-idle")}function n(){s.on("drop",function(t){a(),i=e(),e(document).trigger("dropbox.files",t.originalEvent.dataTransfer)}),s.each(function(){var n=e(this);n.on("dragenter",function(e){0===i.size()&&(nopropagation(e),t()),i=i.add(e.target)}),n.on("dragleave",function(e){setTimeout(function(){i=i.not(e.target),0===i.size()&&a()},1)})})}var i=e(),s=this;return n(),this}}(jQuery),$(document).ready(function(){$("#btnImportClearSelected").click(function(){$(document).trigger("import.clearSelected")}),$("#btnImportCancel").click(function(){$(document).trigger("import.cancel")}),$("#btnRetry").click(function(){$(document).trigger("import.retry")}),$("#dragTarget").dropbox(),$("#import-file-list").importManager(),$(document).on("dragenter",nopropagation),$(document).on("dragover",nopropagation),$(document).on("drop",nopropagation),$(document).ready(function(){$("input").iCheck({checkboxClass:"icheckbox_square-red",radioClass:"iradio_square-red"})})}),function(e){e.fn.importEditor=function(){function t(){var t=e(this);d.appendTo(t.parent()),d.css("left",t.css("left")),d.css("width",t.css("width"));var a=parseInt(e(this).parent().find(".js-g-row").text())-1,n=S.response.columns[a];n.altType?d.val(n.altType):d.val(n.type),d.changeTargetDiv=t,d.changeTargetCol=n,d.show(),d.focus()}function a(){d.hide()}function n(e){return e.altType&&e.altType!==e.type?e.type+'<i class="fa fa-angle-double-right g-type-separator"></i>'+e.altType:e.type}function i(){for(var t=!1,a=0;a<S.response.columns.length;a++){var n=S.response.columns[a];if(n.altType&&n.type!==n.altType){t=!0;break}}e(document).trigger(t?"import.line.overwrite":"import.line.cancel",S.id)}function s(){d.changeTargetCol.altType=e(this).find("option:selected").text(),d.changeTargetDiv.html(n(d.changeTargetCol)),i(),a()}function o(){e(".g-type").click(t),e(".g-other").click(a),d.change(s)}function r(e){if(e.response&&0===e.importState){g.html(e.response.location);var t=e.response.rowsImported,a=e.response.rowsRejected,i=t+a;if(h.css("width",Math.round(100*a/i)+"%"),v.css("width",Math.round(100*t/i)+"%"),b.html(a),y.html(t),$.empty(),e.response.columns)for(var s=0,r=0;r<e.response.columns.length;r++){var l=e.response.columns[r];$.append('<div class="ud-row" style="top: '+s+'px"><div class="ud-cell gc-1 g-other js-g-row">'+(r+1)+'</div><div class="ud-cell gc-2 g-other">'+(l.errors>0?'<i class="fa fa-exclamation-triangle g-warning"></i>':"")+l.name+'</div><div class="ud-cell gc-3 g-type">'+n(l)+'</div><div class="ud-cell gc-4 g-other">'+l.errors+"</div></div>"),s+=x}o(),p.show(),f.hide()}else{switch(e.importState){case 1:m.html("Journal <strong>"+e.name+"</strong> already exists on server"),C.show();break;case 2:m.html("Journal name <strong>"+e.name+"</strong> is reserved"),C.hide();break;case 3:m.html("Server is not responding..."),C.hide();break;case 4:m.html(e.response),C.hide();break;case 5:m.html("Server encountered internal problem. Check server logs for more details."),C.hide();break;default:m.html("Unknown error: "+e.responseStatus),C.hide()}p.hide(),f.show(),w.iCheck("uncheck")}c.show()}function l(){d=e('<select class="g-dynamic-select form-control m-b"/>');for(var t=0;t<k.length;t++){var a=k[t];e("<option />",{value:a,text:a}).appendTo(d)}}var d,c=e(this),u=e(".stats-switcher"),p=e(this).find(".js-import-editor"),f=e(this).find(".js-import-error"),m=e(this).find(".js-message"),g=e(this).find(".js-import-tab-name"),h=e(this).find(".import-rejected"),v=e(this).find(".import-imported"),b=e(this).find(".js-rejected-row-count"),y=e(this).find(".js-imported-row-count"),$=e(this).find(".ud-canvas"),C=e(this).find(".js-import-error-btn-group"),w=e('input:radio[name="importAction"]'),x=35,k=["BOOLEAN","BYTE","DOUBLE","FLOAT","INT","LONG","SHORT","STRING","SYMBOL","DATE"],S=null;e(document).on("import.detail",function(e,t){S=t,r(t)}),e(document).on("import.detail.updated",function(e,t){S===t&&t.response&&r(t)}),e(document).on("import.cleared",function(e,t){t===S&&(S=null,p.hide(),f.hide())}),l(),e(".import-stats-chart").click(function(){u.hasClass("stats-visible")?u.removeClass("stats-visible"):u.addClass("stats-visible")}),w.on("ifClicked",function(){var t;switch(this.value){case"append":t="import.line.append";break;case"overwrite":t="import.line.overwrite";break;default:t="import.line.cancel"}e(document).trigger(t,S.id)})}}(jQuery),$(document).ready(function(){$("#import-detail").importEditor()}),function(e){function t(){function t(){}function a(){null!==d&&(d.abort(),d=null)}function n(){null!==c&&(clearTimeout(c),c=null)}function i(){console.log("success")}function s(e,t){console.log("not so lucky: "+t)}function o(){a(),u.query=l,u.limit="0,100",u.withCount=!0,d=e.get("/js",u,i,s)}function r(e){l=e,n(),setTimeout(o,50)}var l,d=null,c=null,u={query:"",limit:"",withCount:!1};return t(),{sendQuery:r}}e.extend(!0,window,{nfsdb:{GridController:t}})}(jQuery),$(document).ready(function(){function e(){var e=$("body");!e.hasClass("mini-navbar")||e.hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},200)):e.hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},100)):$("#side-menu").removeAttr("style")}$(this).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small"),$("#side-menu").metisMenu(),$(".collapse-link").click(function(){var e=$(this).closest("div.ibox"),t=$(this).find("i"),a=e.find("div.ibox-content");a.slideToggle(200),t.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),e.toggleClass("").toggleClass("border-bottom"),setTimeout(function(){e.resize(),e.find("[id^=map-]").resize()},50)}),$(".close-link").click(function(){var e=$(this).closest("div.ibox");e.remove()}),$(".fullscreen-link").click(function(){var e=$(this).closest("div.ibox"),t=$(this).find("i");$("body").toggleClass("fullscreen-ibox-mode"),t.toggleClass("fa-expand").toggleClass("fa-compress"),e.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}),$(".close-canvas-menu").click(function(){$("body").toggleClass("mini-navbar"),e()}),$(".right-sidebar-toggle").click(function(){$("#right-sidebar").toggleClass("sidebar-open")}),$(".open-small-chat").click(function(){$(this).children().toggleClass("fa-comments").toggleClass("fa-remove"),$(".small-chat-box").toggleClass("active")}),$(".check-link").click(function(){var e=$(this).find("i"),t=$(this).next("span");return e.toggleClass("fa-check-square").toggleClass("fa-square-o"),t.toggleClass("todo-completed"),!1}),$(".navbar-minimalize").click(function(){$("body").toggleClass("mini-navbar"),e()}),$(".modal").appendTo("body"),fixHeight(),$(window).scroll(function(){$(window).scrollTop()>0&&!$("body").hasClass("fixed-nav")?$("#right-sidebar").addClass("sidebar-top"):$("#right-sidebar").removeClass("sidebar-top")}),$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||fixHeight()})}),$(window).bind("resize",function(){$(this).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")}),$(document).ready(function(){if(localStorageSupport){var e=localStorage.getItem("collapse_menu"),t=localStorage.getItem("fixedsidebar"),a=localStorage.getItem("fixednavbar"),n=localStorage.getItem("boxedlayout"),i=localStorage.getItem("fixedfooter"),s=$("body");"on"===t&&s.addClass("fixed-sidebar"),"on"===e&&(s.hasClass("fixed-sidebar")?s.hasClass("body-small")||s.addClass("mini-navbar"):s.hasClass("body-small")||s.addClass("mini-navbar")),"on"===a&&($(".navbar-static-top").removeClass("navbar-static-top").addClass("navbar-fixed-top"),s.addClass("fixed-nav")),"on"===n&&s.addClass("boxed-layout"),"on"===i&&$(".footer").addClass("fixed")}}),$(document).ready(function(){var e=$(".sql-editor"),t=$(".file-upload");$("a#sql-editor").click(function(){e.css("display","block"),t.css("display","none"),$("#sqlEditor").css("height","240px")}),$("a#file-upload").click(function(){e.css("display","none"),t.css("display","block")});var a=ace.edit("sqlEditor");a.getSession().setMode("ace/mode/sql"),a.setTheme("ace/theme/merbivore_soft"),a.setShowPrintMargin(!1),a.setDisplayIndentGuides(!1),a.setHighlightActiveLine(!1),"undefined"!=typeof Storage&&localStorage.getItem("lastQuery")&&a.setValue(localStorage.getItem("lastQuery")),a.focus();var n=$("#grid");n.css("height","430px")});