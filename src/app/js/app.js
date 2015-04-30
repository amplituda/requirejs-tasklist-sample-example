/* register event handlers */
define(['jquery', 'tasks'], function ($, tasks) {
    'use strict';

    function _addTask() {
        tasks.add();
    }

    function _deleteAllTasks() {
        tasks.clear();
    }

    function _saveChanges() {
        tasks.save();
    }

    function _cancelChanges() {
        tasks.cancel();
    }

    function _deleteTasks(clickEvent) {
        tasks.remove(clickEvent);
    }

    function _registerEventHandlers() {
        $("#new-task-button").on("click", _addTask);
        $("#delete-all-button").on("click", _deleteAllTasks);
        $("#save-button").on("click", _saveChanges);
        $("#cancel-button").on("click", _cancelChanges);
        $("#task-list").on("click", ".delete-button", _deleteTasks);
    }

    return {
        init: function () {
            _registerEventHandlers();
            tasks.render();
        }
    };
});
