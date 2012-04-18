// By: Hans Fjällemark and John Papa
// https://github.com/KnockedUp/toast.js/
// 
// Modified to support css styling instead of inline styling
// Based on original version at https://github.com/Srirangan/notifer.js/

(function (window, $) {
    window.toast = (function () {
        var 
            $container = $("<div class=\"toast\"></div>"),
            config = {
                timeOut: 5000,
                fadeOut: 300,
                positionClass: "toast-top-right"
            },
            updateContainer = function () {
                $container.css("position", "fixed")
                $container.css("z-index", 9999)
                $container.removeClass('toast-top-right toast-bottom-right toast-bottom-left toast-top-left')
                $container.addClass(config.positionClass)
                return $container
            },
            init = function () {
                $("body").append(updateContainer())
            },
            getNewToastElement = function () {
                return $("<div>")
            },
            notify = function (message, title, iconClass, timeOut, fadeOut) {
                updateContainer()
                var $toastElement = getNewToastElement()

                timeOut = timeOut || config.timeOut
                fadeOut = fadeOut || config.fadeOut

                if (iconClass) {
                    $toastElement.addClass(iconClass)
                }

                var textElement = $("<div/>").css({
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    padding: '0 12px'
                })

                if (title) {
                    var titleElement = $("<div/>")
                    titleElement.append(document.createTextNode(title))
                    titleElement.css("font-weight", "bold")
                    textElement.append(titleElement)
                }

                if (message) {
                    var messageElement = $("<div/>")
                    messageElement.append(document.createTextNode(message))
                    textElement.append(messageElement)
                }

                $toastElement.delay(timeOut)
                    .fadeOut(config.fadeOut,function () {
                        if($toastElement.length)
                            $toastElement.remove()
                })

                $toastElement.bind("click", function () {
                    $toastElement.hide()
                })

                $toastElement.append(textElement)
                $container.prepend($toastElement)
            },
            info = function (message, title) {
                notify(message, title, 'info')
            },
            warning = function (message, title) {
                notify(message, title, 'warning')
            },
            error = function (message, title) {
                notify(message, title, 'error')
            },
            success = function (message, title) {
                notify(message, title, 'success')
            }
            init() // Initialize the config settings
        return {
            config: config,
            notify: notify,
            info: info,
            warning: warning,
            error: error,
            success: success
        }
    })()
} (window, jQuery))