// Load Handlebars-Template with Requirejs-Handlebars-Plugin
define(['jquery', 'hbs!templates/taskTemplate'],

// Load HTML-Template with Requirejs-Text-Plugin
//define(['jquery', 'text!templates/taskTemplate.html'],

    function ($, taskTemplate) {
    'use strict';


    function renderTasks(tasks) {
        var elementArray = $.map(tasks, _renderTask);

        $("#task-list")
            .empty()
            .append(elementArray);
    }

    function renderNew() {
        var $taskList = $("#task-list");
        $taskList.prepend(_renderTask({}));
    }

    function _renderTask(task) {
        /**
         * if using Handlebars
         *
         */
        var $task = $(taskTemplate(task));

        /**
         * if using plain html
         * @type {*|jQuery|HTMLElement}
         */
        //var $task = $(taskTemplate);
        //
        //if (task.complete) {
        //    $task.find(".complete").attr("checked", "checked");
        //}
        //$task.find(".description").val(task.description);
        /* end using plain html */

        return $task;
    }

    return {
        renderTasks: renderTasks,
        renderNew: renderNew
    };

});
