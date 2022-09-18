(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["apiUrl"]='$API_URL';
    window["env"]["infoApplicationVersion"]='$infoApplicationVersion';
    window["env"]["stompConnectionEndpoint"]='$stompConnectionEndpoint';
    window["env"]["debug"]=$DEBUG;
    window['env']['userManualURL'] = '$userManualURL';
  })(this);
  