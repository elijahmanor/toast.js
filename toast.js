/*
    Modified to support css styling instead of inline styling
    Original version at https://github.com/Srirangan/notifer.js/
*/

(function($) {
    var config = window.toastConfig = {
        defaultTimeOut: 50000,
        position: ["top", "right"],
        container: $("<div class=\"toast\"></div>")
    }

    $(document).ready(function() {
        config.container.css("position", "fixed")
        config.container.css("z-index", 9999)
        config.container.css(config.position[0], "12px")
        config.container.css(config.position[1], "12px")
        $("body").append(config.container)
    })

    function getToastElement() {
        return $("<div>")
    }

    var toast = window.toast = {}

    toast.notify = function(message, title, iconClass, timeOut) {
        var toastElement = getToastElement()

        timeOut = timeOut || config.defaultTimeOut

        if (iconClass) {
            toastElement.addClass(iconClass)
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

        toastElement.delay(timeOut).fadeOut(function() {
            toastElement.remove()
        })

        toastElement.bind("click", function() {
            toastElement.hide()
        })

        toastElement.append(textElement)
        config.container.prepend(toastElement)
    }

    toast.info = function(message, title) {
        toast.notify(message, title, 'info')
    }

    toast.warning = function(message, title) {
        toast.notify(message, title, 'warning')
    }

    toast.error = function(message, title) {
        toast.notify(message, title, 'error')
    }

    toast.success = function(message, title) {
        toast.notify(message, title, 'success')
    }
}(jQuery))