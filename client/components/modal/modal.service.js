'use strict';

angular.module('crowdpollApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass, controller) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      var config = {
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope,
      };

      if (controller) {
        config.controller = controller;
        config.bindToController = true;
      }

      return $modal.open(config);
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        },

        save: function(sav) {
          sav = sav || angular.noop;

          return function() {
            var args = Array.prototype.slice(arguments),
                saveModal;

            saveModal = openModal({
              modal: {
                dismissable: true,
                title: 'Create Poll',
                include: 'components/modal/pollmodal.html',
                buttons: [{
                  classes: 'btn-default pull-left',
                  text: 'Add Option',
                  click: function(e) {
                    var scope = angular.element(e.currentTarget).scope();
                    scope.addOption();
                  }
                }, {
                  classes: 'btn-primary',
                  text: 'Save',
                  click: function(e) {
                    var scope = angular.element(e.currentTarget).scope();
                    scope.savePoll();
                    saveModal.close(e);
                  }
                }]
              }
            }, 'modal-primary', 'PollModalController as PollModalCtrl');

            saveModal.result.then(function(event) {
              sav.apply(event, args);
            });
          };
        }

      }
    };
  });
