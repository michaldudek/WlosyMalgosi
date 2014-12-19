(function(ng) {
    'use strict';

    ng.module('WlosyMalgosi')
        /**
         * Parses a date to a string day + time of day.
         * 
         * @return {Function}
         */
        .filter('washDate', [function() {
            var months = [
                'stycznia',
                'lutego',
                'marca',
                'kwietnia',
                'maja',
                'czerwca',
                'lipca',
                'sierpnia',
                'września',
                'października',
                'listopada',
                'grudnia'
            ];

            var days = [
                'w poniedziałek',
                'we wtorek',
                'w środę',
                'w czwartek',
                'w piątek',
                'w sobotę',
                'w niedzielę'
            ];

            /**
             * Output a date in locale.
             * 
             * @param  {Date} date
             * @return {String}
             */
            var formatDate = function(date) {
                return [
                    date.getDate(),
                    months[date.getMonth()],
                    date.getFullYear()
                ].join(' ');
            };

            /**
             * Gets a date's day name.
             *
             * Note: because we're night owls, the day actually changes at 4 AM :)
             * 
             * @param  {Date} date
             * @return {String}
             */
            var getDay = function(date) {
                // clone the date so we don't modify on the original
                var theDate = new Date(date.getTime());

                // day switches at 4 AM, so if hours is between midnight and 4 AM
                // then decrement the day
                if (theDate.getHours() < 4) {
                    theDate.setDate(theDate.getDate() - 1);
                }

                var now = new Date(),
                    yesterday = new Date(),
                    twoDaysAgo = new Date();

                yesterday.setDate(now.getDate() - 1);
                twoDaysAgo.setDate(yesterday.getDate() - 1);

                if (theDate.getDate() === now.getDate()) {
                    return 'dzisiaj';
                }

                if (theDate.getDate() === yesterday.getDate()) {
                    return 'wczoraj';
                }

                if (theDate.getDate() === twoDaysAgo.getDate()) {
                    return 'przedwczoraj';
                }

                // at this point we return just the day name
                return days[theDate.getDay()];
            };

            /**
             * Gets a date's time of day.
             * 
             * @param  {Date} date
             * @return {String}
             */
            var getTime = function(date) {
                var h = date.getHours();

                if (h >= 4 && h < 13) {
                    return 'rano';
                } else if (h >= 13 && h < 18) {
                    return 'w dzień';
                }

                return 'wieczorem';
            };

            /**
             * The actual filter that parses the date.
             * 
             * @param  {Date} date Date to be parsed.
             * @return {String}
             */
            return function(date) {
                var diff = parseInt((new Date().getTime() - date.getTime()) / 1000, 10) / 60; // in minutes

                if (diff < 60 * 2) {
                    return 'przed chwilą';
                }

                if (diff < 60 * 12) {
                    return 'kilka godzin temu';
                }

                if (diff > 60 * 24 * 6) {
                    return 'dnia ' + formatDate(date);
                }

                return getDay(date) + ' ' + getTime(date);
            };
        }]);

})(window.angular);