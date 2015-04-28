/***********************************************************************

  Modal component

  @author <702368372atqqcom> lyz

  @options
    - title   {String}   Modal title html
    - content {String}   Modal content html
    - close   {Function} Callback when modal is closed
    - scroll  {Boolean}  Can document scroll

  @usage
    modal({
      title: '<span>foo</span>',
      content: '<div>bar</div>',
      close: function() {
        console.log('Modal closed.');
      },
      scoll: false
    })
  
  @version 0.0.1

 ***********************************************************************/

define(function() {
  function modal(options){
    var defaults = {
      title: '提示',
      content: 'Hello sg-modal',
      close: null,
      scroll: true
    };

    // Costomer options
    options = options ? options : {};
    options.title = options.title === undefined ? defaults.title : options.title;
    options.content = options.content === undefined ? defaults.content : options.content; 
    options.close = options.close === undefined ? defaults.close : options.close;
    options.scroll = options.scroll === undefined ? defaults.scroll : options.scroll; 

    // Display modal
    var maskCreated = document.querySelector('.sg-modal-mask');
    maskCreated ? fillModal() : createModal();

    var modal = document.querySelector('.sg-modal');
    var dialog = document.querySelector('.sg-modal-dialog');
    var closeBtn = document.querySelector('.sg-modal-close');

    modal.style.display = 'block';

    // Center the dialog
    var clientHeight =  document.documentElement.clientHeight;
    var clientWidth =  document.documentElement.clientWidth;
    var dialogHeight = dialog.offsetHeight;
    var dialogWidth = dialog.offsetWidth;
    dialog.style.top = (clientHeight - dialogHeight) / 2 + 'px';
    dialog.style.left = (clientWidth - dialogWidth) / 2 + 'px';

    // Bind modal close
    closeBtn.addEventListener('click', closeHandler);

    // Prevent document scroll
    if (!options.scroll) {
      document.addEventListener('touchmove', preventDefault);
      document.addEventListener('mousewheel', preventDefault);
    }
    
    function closeHandler(){
      modal.style.display = 'none';
      closeBtn.removeEventListener('click', closeHandler);
      if (options.close) {
        options.close();
        options.close = null;
      }
      if (!options.scroll) {
        document.removeEventListener('touchmove', preventDefault);
        document.removeEventListener('mousewheel', preventDefault);
      }
    }

    function createModal() {
      var str, tmp;
      str =  '<div class="sg-modal" style="display:none;position:fixed;left:0;top:0;width:100%;height:100%;z-index:999999">';
      str += '<div class="sg-modal-mask" style="position:fixed;width:100%;height:100%;background:#000;opacity:0.3;"></div>';
      str += '<div class="sg-modal-dialog" style="position:absolute;backgound:#fff;">';
      str += '  <div class="sg-modal-close" style="display:block;position:absolute;right:0;top:0;font-size:28px;color:#999;">×</div>';
      str += '  <h1 class="sg-modal-title" style="height:40px;line-height:40px;padding-left:10px;background:#fff;min-width:50px">' + options.title + '</h1>';
      str += '  <div class="sg-modal-content" style="background:#fff;">' + options.content + '</div>';
      str += '</div>'
      str += '</div>';
      tmp = document.createElement('div');
      tmp.innerHTML = str;
      document.body.appendChild(tmp.firstElementChild);
    }

    function fillModal() {
      var title = document.querySelector('.sg-modal-title');
      var content = document.querySelector('.sg-modal-content');
      title.innerHTML = options.title;
      content.innerHTML = options.content;
    }

    function preventDefault(e) {
      e.preventDefault()
    }
  }

  modal.close = function() {
    var closeBtn = document.querySelector('.sg-modal-close');
    closeBtn && closeBtn.click();
  }

  return modal;
})