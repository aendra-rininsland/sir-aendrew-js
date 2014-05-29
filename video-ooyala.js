/**
 * Ooyala Video block
 * 2014 Ændrew Rininsland <aendrew.rininsland@the-times.co.uk>
 * Allows you to add Ooyala videos via embedcode.
 *
 * Configuration:
 *   » Add "VideoOoyala" to the `blockTypes` array
 *   » When instantiating Sir Trevor, pass the following value as an option:
 *      ooyala_player_id: "<your_ooyala_player_id>"
 */


SirTrevor.Blocks.VideoOoyala = (function(){

  return SirTrevor.Block.extend({

    type: 'video_ooyala',
    title: 'Ooyala Video',

    pastable: true,

    icon_name: 'video',

    onBlockRender: function() {
      if (typeof OO === "undefined") {
        $('body').append("<script src='//player.ooyala.com/v3/" + window.editor.options.ooyala_player_id + "'></script>");
      }
    },

    loadData: function(data){
      var container_id = makeid();
      var embed_string = "<div id='" + container_id + "' style='width:1280px;height:720px; margin-bottom: 30px;'></div><script>OO.ready(function() { OO.Player.create('" + container_id + "', '" + data.embedcode + "'); });</script><noscript><div>Please enable Javascript to watch this video</div></noscript>";
      this.$editor.html(embed_string);
      this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-caption-input', name: 'caption', placeholder: 'Caption', style: 'width: 100%; margin-top:10px; text-align: center;', value: data.caption}));
      this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-source-input', name: 'source', placeholder: 'Source', style: 'width: 100%; margin-top:10px; text-align: center;', value: data.source}));
    },

    onContentPasted: function(event){
      if ($(event.target).val().match(/\s/)) {
        return;
      }

      data = {
        embedcode: $(event.target).val()
      }
      this.setAndLoadData(data);
    }

  });


  function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

})();
