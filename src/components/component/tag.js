+(function() {
  $(document).on('click', '.si-tag-close', (e) => {
    let $tar = $(e.target).parent();
    $tar.fadeOut(() => {
      $tar.remove();
    });
  });
})();