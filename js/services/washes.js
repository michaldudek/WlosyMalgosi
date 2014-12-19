(function(ng) {
    'use strict';

    ng.module('WlosyMalgosi')
        /**
         * Services that manages hard washes :)
         */
        .service('washes', [
            'localStorageService',
            function(storage) {
                this.lastWash = null;
                this.previousWash = null;

                var self = this;

                /**
                 * Stores the current date as last wash date
                 * and moves the old wash date as previous date.
                 */
                this.washNow = function() {
                    self.previousWash = self.lastWash;
                    self.lastWash = new Date();
                    self.save();
                };

                /**
                 * Undoes a wash by moving a previous wash to last wash.
                 */
                this.undoWash = function() {
                    self.lastWash = self.previousWash;
                    self.previousWash = null;
                    self.save();
                };

                /**
                 * Gets information about the washes.
                 * 
                 * @return {Object}
                 */
                this.get = function() {
                    self.lastWash = storage.get('lastWash');
                    self.lastWash = self.lastWash ? new Date(self.lastWash) : self.lastWash;
                    self.previousWash = storage.get('previousWash');
                    self.previousWash = self.previousWash ? new Date(self.previousWash) : self.previousWash;

                    return {
                        last : self.lastWash,
                        previous : self.previousWash
                    };
                };

                /**
                 * Saves current wash state in a storage.
                 */
                this.save = function() {
                    storage.set('lastWash', self.lastWash ? self.lastWash.toString() : '');
                    storage.set('previousWash', self.previousWash ? self.previousWash.toString() : '');
                };

                // init
                this.get();
            }
        ]);

})(window.angular);