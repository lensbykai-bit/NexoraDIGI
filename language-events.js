(function(){
  document.addEventListener('promptstudio:languagechange',function(event){
    window.dispatchEvent(new CustomEvent('promptstudio:languagechange',{detail:event.detail||{}}));
  });
})();