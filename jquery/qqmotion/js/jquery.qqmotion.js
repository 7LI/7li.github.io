;(function($){
	$(function(){
		$('[data-qqmotion-input]').each(function(){
			var qm = new qqmotion(this);
		})
		
	})

	var qqmotion = function(e){
		var $e = $(e);
		var $parent = $e.parent();
		this.$icon = $e;
		//初始化皮肤
		$parent.css('position', 'relative');
		var skin = this.generateSkin();
		$parent.append(skin);
		this.$input = $('#'+$e.attr('data-qqmotion-input'));
		this.$panel = $parent.find('.qq-motion-panel');
		this.$motionItem = this.$panel.find('.qq-motion-list').find('li');
		this.$closeBtn = this.$panel.find('.qq-motion-close');
		

		this.addAction();
	}
	//打开或者表情面板
	qqmotion.prototype.toggle = function(){
		if(!this.$icon.hasClass('qq-motion-on')){
			this.$panel.show();
			this.$icon.addClass('qq-motion-on');
		}else{
			this.$panel.hide();
			this.$icon.removeClass('qq-motion-on');
		}
		
	}
	//点击表情输入
	qqmotion.prototype.input = function(index){
		var text = '';
		switch(index){
			case 0:text='[微笑]';break;
			case 1:text='[撇嘴]';break;
			case 2:text='[色]';break;
			case 3:text='[发呆]';break;
			case 4:text='[得意]';break;
			case 5:text='[流泪]';break;
			case 6:text='[害羞]';break;
			case 7:text='[闭嘴]';break;
			case 8:text='[睡]';break;
			case 9:text='[大哭]';break;
			case 10:text='[尴尬]';break;
			case 11:text='[发怒]';break;
			case 12:text='[调皮]';break;
			case 13:text='[呲牙]';break;
			case 14:text='[惊讶]';break;

			case 15:text='[难过]';break;
			case 16:text='[酷]';break;
			case 17:text='[冷汗]';break;
			case 18:text='[抓狂]';break;
			case 19:text='[酷]';break;
			case 20:text='[偷笑]';break;
			case 21:text='[可爱]';break;
			case 22:text='[白眼]';break;
			case 23:text='[傲慢]';break;
			case 24:text='[饥饿]';break;
			case 25:text='[困]';break;
			case 26:text='[惊恐]';break;
			case 27:text='[流汗]';break;
			case 28:text='[憨笑]';break;
			case 29:text='[大兵]';break;

			case 30:text='[奋斗]';break;
			case 31:text='[咒骂]';break;
			case 32:text='[疑问]';break;
			case 33:text='[嘘]';break;
			case 34:text='[晕]';break;
			case 35:text='[折磨]';break;
			case 36:text='[衰]';break;
			case 37:text='[骷髅]';break;
			case 38:text='[敲打]';break;
			case 39:text='[再见]';break;
			case 40:text='[擦汗]';break;
			case 41:text='[抠鼻]';break;
			case 42:text='[鼓掌]';break;
			case 43:text='[糗大了]';break;
			case 44:text='[坏笑]';break;

			case 45:text='[左哼哼]';break;
			case 46:text='[右哼哼]';break;
			case 47:text='[哈欠]';break;
			case 48:text='[鄙视]';break;
			case 49:text='[委屈]';break;
			case 50:text='[快哭了]';break;
			case 51:text='[阴险]';break;
			case 52:text='[亲亲]';break;
			case 53:text='[吓]';break;
			case 54:text='[可怜]';break;
			case 55:text='[菜刀]';break;
			case 56:text='[西瓜]';break;
			case 57:text='[啤酒]';break;
			case 58:text='[篮球]';break;
			case 59:text='[乒乓]';break;

			case 60:text='[咖啡]';break;
			case 61:text='[饭]';break;
			case 62:text='[猪头]';break;
			case 63:text='[玫瑰]';break;
			case 64:text='[凋谢]';break;
			case 65:text='[示爱]';break;
			case 66:text='[爱心]';break;
			case 67:text='[心碎]';break;
			case 68:text='[蛋糕]';break;
			case 69:text='[闪电]';break;
			case 70:text='[炸弹]';break;
			case 71:text='[刀]';break;
			case 72:text='[足球]';break;
			case 73:text='[瓢虫]';break;
			case 74:text='[便便]';break;

			case 75:text='[月亮]';break;
			case 76:text='[太阳]';break;
			case 77:text='[礼物]';break;
			case 78:text='[拥抱]';break;
			case 79:text='[强]';break;
			case 80:text='[弱]';break;
			case 81:text='[握手]';break;
			case 82:text='[胜利]';break;
			case 83:text='[抱拳]';break;
			case 84:text='[勾引]';break;
			case 85:text='[拳头]';break;
			case 86:text='[差劲]';break;
			case 87:text='[爱你]';break;
			case 88:text='[NO]';break;
			case 89:text='[OK]';break;
		}
		insertText(this.$input[0], text);
		this.toggle();
	}
	
	// 生成表情皮肤
	qqmotion.prototype.generateSkin = function(){
		var imgpath = this.$icon.attr('data-qqmotion-imgpath');
		var str = '<div class="qq-motion-panel">';
		str    += '<h1><span class="qq-motion-close"><a href="javascript:;">x</a></span></h1>';
		str	   += '<ul class="qq-motion-list">';
		for(var i = 1; i <= 90; i++){
			str	+= '<li><img src="'+imgpath+i+'.gif" /></li>';
		}
		
		str	   += '</ul></div>';
		return str;
	}

	//绑定动作
	qqmotion.prototype.addAction = function(){
		// 点击图标显示panel
		this.$icon.on('click', function(){
			_this.toggle();
		});
		// 点击关闭按钮关闭表情
		var _this = this;
		this.$closeBtn.on('click', function(){
			_this.toggle();
		});
		// 添加表情hover样式
		this.$motionItem.on('mouseover', function(){
			$(this).addClass('qq-motion-hover');
		})
		this.$motionItem.on('mouseleave', function(){
			$(this).removeClass('qq-motion-hover');
		})
		// 点击表情为输入框加入文字
		this.$motionItem.on('click', function(){
			var index  = $(this).index();
			_this.input(index);
		});
	}
	
	
	// 在textarea的光标处插入文字
	function insertText(myField, myValue) {
		//IE support
		if (document.selection) {
			myField.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
			sel.select();
		}
		//MOZILLA/NETSCAPE support
		else if (myField.selectionStart || myField.selectionStart == '0') {
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			// save scrollTop before insert www.keleyi.com
			var restoreTop = myField.scrollTop;
			myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
			if (restoreTop > 0) {
				myField.scrollTop = restoreTop;
			}
			myField.focus();
			myField.selectionStart = startPos + myValue.length;
			myField.selectionEnd = startPos + myValue.length;
		} else {
			myField.value += myValue;
			myField.focus();
		}
	}
})(jQuery);