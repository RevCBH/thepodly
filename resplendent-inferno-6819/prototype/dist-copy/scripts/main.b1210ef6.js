$(document).ready(function(){var a="sky-jump-run.firebaseIO.com/",b=(new Firebase(a),"https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/"),c=new Firebase(b),d="000";sessionStorage.setItem("newEpisodeNumber",d);var e="",f="",g="",h='<button class="btn btn-default" type="submit" role="button" id="episodeEditButton">Edit Episode Info</button>',i='<h4>Enter Episode Info</h4><div class="row"><!-- Episode # --><div class="col-xs-2"><label for="newEpisodeNum">Episode #</label><input type="text" class="form-control" id="inputEpisodeNumber" placeholder="?" ></div><!-- Episode Name --> <div class="col-xs-3"><label for="episodeName">Episode Name </label><input type="text" class="form-control" placeholder="episode name?" id="episodeNameField"></div><!-- Episode Description --><div class="col-xs-4"><label for="episodeDescription">Episode Description</label> (Optional)<input type="text" class="form-control" placeholder="" id="episodeDescription"></div><!-- Update Button --> <div class="col-xs-2"></br><label>&nbsp;</label><button type="submit" class="btn btn-default" id="submitButton">Update</button></div><!--End "row" class--> </div>',j='<hr><h4>Enter Podcast URL</h4><input type="url" class="form-control" placeholder="your podcast url" id="podcastUrlField"><button type="submit" class="btn btn-default" id="podcastUrlButton">Enter</button>',k='<button type="submit" class="btn btn-default" id="podcastUrlEditButton">Edit URL</button>',l="<hr><h4>Add Show Notes</h4>",m=function(){$(".episodeEditButtonArea").append(h)},n=function(){$(".enterEpisodeInfo").append(i)},o=function(){$(".podcastUrlForm").append(j)},p=function(){$(".podcastUrlEditButton").append(k)},q=function(){$(".showEpisodeNotes").append(l)},r=function(){$(".episodeInfoAdd").empty(),e="",$(".episodeDescriptionAdd").empty(),f=""},s=function(){$(".episodeInfoAdd").empty(),$(".episodeDescriptionAdd").empty()},t=function(a){c.child(a).once("value",function(b){var c=b.val();$(".episodeInfoAdd").append("<h4>Episode "+a+" - "+c.episodeName+"</h4>"),$(".episodeDescriptionAdd").append(c.episodeDescription),$(".episodeEditButtonArea").show()},function(a){console.log("The read failed: "+a.code)}),c.child(a).on("child_changed",function(){$(".episodeInfoAdd").empty(),$(".episodeDescriptionAdd").empty()}),c.child(a).on("child_removed",function(){r(),$(".episodeInfoAdd").append("<hr>Episode "+a+" was deleted by an admin of your account")})};n(),m(),$(".episodeEditButtonArea").hide(),o(),$(".podcastUrlForm").hide(),p(),$(".podcastUrlEditButton").hide(),q(),$(".showEpisodeNotes").hide(),(d="000")&&s(),$("#submitButton").click(function(){d=$("input[id=inputEpisodeNumber]").val(),e=$("input[id=episodeNameField]").val(),f=$("input[id=episodeDescription]").val();var a=c.child(d);a.set({episodeName:e,episodeDescription:f,episodeNotes:""}),$(".enterEpisodeInfo").hide(),t(d),$(".podcastUrlForm").show()}),$("#episodeEditButton").click(function(){s(),$(".episodeEditButtonArea").hide(),$(".enterEpisodeInfo").show(),$("#inputEpisodeNumber").val(d),$("#episodeNameField").val(e),$("#episodeDescription").val(f),$(".podcastUrlEditButton").hide(),$(".podcastUrl").empty(),$(".podcastUrlForm").show()}),$("#podcastUrlButton").click(function(){g=$("input[id=podcastUrlField]").val();var a=c.child(d);a.update({podcastUrl:g}),$(".podcastUrlEditButton").show(),$(".podcastUrl").prepend("<hr><h5> Podcast URL: "+g+"</h5>"),$(".podcastUrlForm").hide(),$(".showEpisodeNotes").show()}),$("#podcastUrlEditButton").click(function(){$(".podcastUrl").empty(),$(".podcastUrlEditButton").hide(),$(".podcastUrlForm").show()})}),$(document).ready(function(){$("#header-nav li a").click(function(a){a.preventDefault(),$(this).tab("show")})});