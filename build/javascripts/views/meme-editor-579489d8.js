MEME.MemeEditorView=Backbone.View.extend({initialize:function(){this.buildForms(),this.listenTo(this.model,"change",this.render),this.render()},buildForms:function(){function e(e){return _.reduce(e,function(e,t){return e+=['<option value="',t.hasOwnProperty("value")?t.value:t,'">',t.hasOwnProperty("text")?t.text:t,"</option>"].join("")},"")}var t=this.model.toJSON();if(t.textShadowEdit&&$("#text-shadow").parent().show(),t.textAlignOpts&&t.textAlignOpts.length&&$("#text-align").append(e(t.textAlignOpts)).show(),t.fontSizeOpts&&t.fontSizeOpts.length&&$("#font-size").append(e(t.fontSizeOpts)).show(),t.fontFamilyOpts&&t.fontFamilyOpts.length&&$("#font-family").append(e(t.fontFamilyOpts)).show(),t.watermarkOpts&&t.watermarkOpts.length&&$("#watermark").append(e(t.watermarkOpts)).show(),t.overlayColorOpts&&t.overlayColorOpts.length){var a=_.reduce(t.overlayColorOpts,function(e,t){var a=t.hasOwnProperty("value")?t.value:t;return e+='<li><label><input class="m-editor__swatch" style="background-color:'+a+'" type="radio" name="overlay" value="'+a+'"></label></li>'},"");$("#overlay").show().find("ul").append(a)}},render:function(){var e=this.model.toJSON();this.$("#headline").val(e.headlineText),this.$("#credit").val(e.creditText),this.$("#watermark").val(e.watermarkSrc),this.$("#image-scale").val(e.imageScale),this.$("#font-size").val(e.fontSize),this.$("#font-family").val(e.fontFamily),this.$("#text-align").val(e.textAlign),this.$("#text-shadow").prop("checked",e.textShadow),this.$("#overlay-alpha").val(e.overlayAlpha),this.$("#overlay").find('[value="'+e.overlayColor+'"]').prop("checked",!0)},events:{"input #headline":"onHeadline","input #credit":"onCredit","input #image-scale":"onScale","change #font-size":"onFontSize","change #font-family":"onFontFamily","change #watermark":"onWatermark","change #text-align":"onTextAlign","change #text-shadow":"onTextShadow","input #overlay-alpha":"onOverlayAlpha",'change [name="overlay"]':"onOverlayColor","dragover #dropzone":"onZoneOver","dragleave #dropzone":"onZoneOut","drop #dropzone":"onZoneDrop"},onCredit:function(){this.model.set("creditText",this.$("#credit").val())},onHeadline:function(){this.model.set("headlineText",this.$("#headline").val())},onTextAlign:function(){this.model.set("textAlign",this.$("#text-align").val())},onTextShadow:function(){this.model.set("textShadow",this.$("#text-shadow").prop("checked"))},onFontSize:function(){this.model.set("fontSize",this.$("#font-size").val())},onFontFamily:function(){this.model.set("fontFamily",this.$("#font-family").val())},onWatermark:function(){this.model.set("watermarkSrc",this.$("#watermark").val()),localStorage&&localStorage.setItem("meme_watermark",this.$("#watermark").val())},onScale:function(){this.model.set("imageScale",this.$("#image-scale").val())},onOverlayAlpha:function(){this.model.set("overlayAlpha",this.$("#overlay-alpha").val())},onOverlayColor:function(e){this.model.set("overlayColor",this.$(e.target).val())},getDataTransfer:function(e){return e.stopPropagation(),e.preventDefault(),e.originalEvent.dataTransfer||null},onZoneOver:function(e){var t=this.getDataTransfer(e);t&&(t.dropEffect="copy",this.$("#dropzone").addClass("pulse"))},onZoneOut:function(){this.$("#dropzone").removeClass("pulse")},onZoneDrop:function(e){var t=this.getDataTransfer(e);t&&(this.model.loadBackground(t.files[0]),this.$("#dropzone").removeClass("pulse"))}});