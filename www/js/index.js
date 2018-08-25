$(document).ready(function() { 
      // jQuery is properly loaded at this point
      // so proceed to bind the Cordova's deviceready event
      $(document).bind("deviceready", function() {
         // Now Cordova is loaded
         // its great JS API can be used to access low-level
         // features as accelerometer, contacts and so on

            $(".messages").animate({ scrollTop: $(document).height() }, "fast");

            $(".expand-button").click(function() {
              $("#profile").toggleClass("expanded");    
            });


            function newMessage() {
                message = $(".message-input input").val();
                if($.trim(message) == '') {
                    return false;
                }
                var senderChat = $('<li/>',{'class':'sent'});
                $('<img/>', {'src':'img/rem.png'}).appendTo(senderChat)
                $('<p/>',{'text':message}).appendTo(senderChat)                                                

                senderChat.appendTo($('.messages ul'));
                $('.message-input input').val(null);    
                $(".messages").animate({ scrollTop: $(document).height() }, "fast");

                $.ajax({
                    'url':'http://localhost:5000',
                    'type':'POST',                    
                    'dataType':'json',
                    'contentType':'application/json',
                    'data':JSON.stringify({'input':message}),
                    'success':function(result){
                        var receiverChat = $('<li/>',{'class':'replies'});
                        $('<img/>', {'src':'img/ram.png'}).appendTo(receiverChat)
                        $('<p/>',{'text':result.response}).appendTo(receiverChat)
                        $('.message-input input').val(null);    
                        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
                        receiverChat.appendTo($('.messages ul'));
                        
                    },
                    'error':function(err){
                         var receiverChat = $('<li/>',{'class':'replies'});
                        $('<img/>', {'src':'img/ram.png'}).appendTo(receiverChat)
                        $('<p/>',{'text':'error connecting to server','class':'danger'}).appendTo(receiverChat)
                        $('.message-input input').val(null);    
                        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
                        receiverChat.appendTo($('.messages ul'));
                    }
                })
            };

            $('.submit').click(function() {
              newMessage();
            });

            $(window).on('keydown', function(e) {
              if (e.which == 13) {
                newMessage();
                return false;
              }
            });
      }); 
   });