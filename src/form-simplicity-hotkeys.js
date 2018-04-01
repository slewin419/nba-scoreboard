/**
 * Form Simplicity Hot Keys
 * @author Shaun Lewin
 * @date 10/26/2017
 */

(function FormSimplicityHotKeys(){
    
    //Plugin for listening for key double presses
    $.fn.dblkeydown = function(keyCode, callback) {
        return $(this).keydown(function(e) {
            if (e.which == keyCode) {
                var lastTime = $(this).data('dblkeydown_' + keyCode);
                var curTime = new Date().getTime();
                if (lastTime && (curTime - lastTime < $.fn.dblkeydown.maxInterval)) {
                    $(this).data('dblkeydown_' + keyCode, null);
                    callback.call(this);
                } else {
                    $(this).data('dblkeydown_' + keyCode, curTime);
                }                
            }
        });
    };
    $.fn.dblkeydown.maxInterval = 300;
    
    //This plugin requires boostrap tooltip.
    if(typeof $.fn.tooltip !== 'function') {
        return false;
    }   
    
    var CTRL_KEY_CODE =  17;
    
    var $body = $(document.body);
    var $hotKeyElements = $body.find('[data-fs-hotkey]');
    var hintsShown = false;
    var hotKeyInput = '<input id="hotKeyCommand" type="text" name="hotKeyCommand" aria-hidden="true"/>';      
    
    $body.append(hotKeyInput);
    $('#hotKeyCommand').css({
       position: 'fixed',
       top: '-999px',           
       width: '1px',
       height: '1px'
    });
    
    var $command = $('input[name="hotKeyCommand"]');
    $command.on('input', function(e){       
       var command =  e.currentTarget.value.toUpperCase(),
           button = $('[data-fs-hotkey="' + command + '"]:eq(0)');
       
       button[0].click();
       $(this).blur();
    });
    
    $command.on('blur', function(e) {
        $(this).val('');
        hideHotKeyHints();
    });
    
    $hotKeyElements.each(function(i,e){
        $(e).attr('tabIndex', 0);
    });
    
    //Show hot key shortcuts when buttons held down
    $body.dblkeydown(CTRL_KEY_CODE, function(){ 
        if(!hintsShown){
            $command.focus();
            showHotKeyHints();
        } else {
            $command.blur();
            hideHotKeyHints();
        }        
    });
    
    function showHotKeyHints() {                     
        $hotKeyElements.each(function(i,e) {
            var hotKey = $(e).data('fs-hotkey');
            var title = $(e).attr('title');            
            
            $(e).data('attr-title', title);
            $(e).attr('title', hotKey);
        });
        
        $hotKeyElements.each(function(){
            var placement = $(this).data('placement');
            $(this).tooltip({
                trigger: 'manual', 
                placement: placement || 'bottom'
            }).tooltip('show');
        });
        hintsShown = true;
    }
    
    function hideHotKeyHints() {
        if(!hintsShown) return;
        
        $hotKeyElements.each(function(i,e) {
            $(e).attr('title', $(e).data('attr-title'));
        });

        $hotKeyElements.tooltip('destroy');
        hintsShown = false;
    }
    
    window.addEventListener('resize', hideHotKeyHints);       
})();


