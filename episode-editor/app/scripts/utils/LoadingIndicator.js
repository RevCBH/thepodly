// Initialize the global variable if not there
if (!window.ThePodly) {
  window.ThePodly = {}
}


window.ThePodly.LoadingIndicator = {

  getHTML: function () {
    return (
      '<!-- Create a div which will be the canvasloader wrapper -->' +
      '<div id="canvasloader-container" class="loadingDivWrapper" style="display: none">' +
        '<i class="fa fa-spinner fa-spin"></i>' +
      '</div>'
    )
  },

  hideAll: function () {
    $('.loadingDivWrapper').hide()
  },

  showAll: function () {
    $('.loadingDivWrapper').show()
  }

}
