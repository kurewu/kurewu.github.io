/*
https://www.codeproject.com/Tips/755421/Using-the-jQuery-unobtrusive-validator-with-Twitte
$('.taskTooltip').tooltip({trigger: 'manual'}).tooltip('show');
*/
(function ($) {
    var classes = { groupIdentifier: ".form-group", error: 'has-error', invalid : 'is-invalid', success: null }; //success: 'has-success' 
    function updateClasses(inputElement, toAdd, toRemove) {
        var group = inputElement.closest(classes.groupIdentifier);
        if (group.length > 0) {
            group.addClass(toAdd).removeClass(toRemove);
        }
    }
    function onError(inputElement, message) {
        updateClasses(inputElement, classes.error, classes.success);

        var options = { 
                        html: true, title: '<div>' + message + '</div>',
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                };
        inputElement.tooltip("dispose")
            .addClass(classes.invalid)
            .tooltip(options);
    }
    function onSuccess(inputElement) {
        updateClasses(inputElement, classes.success, classes.error);
        inputElement.tooltip("dispose").removeClass(classes.invalid);
    }

    function onValidated(errorMap, errorList) {
        $.each(errorList, function () {
            onError($(this.element), this.message);
        });

        if (this.settings.success) {
            $.each(this.successList, function () {
                onSuccess($(this));
            });
        }
    }

    $(function () {
        $('form').each(function () {
            var validator = $(this).data('validator');
            if (typeof validator !== 'undefined') {
                validator.settings.showErrors = onValidated;
            }
        });
    });
}(jQuery)); 