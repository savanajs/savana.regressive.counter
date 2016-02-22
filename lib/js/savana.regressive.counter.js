/*
Savana Regressive Counter
Created By Yorname
Contact: youremail@gmail.com
Version: 0.0.1
Release: 00/00/2016
Plugin
Brazil, São Paulo
*/

/*
The MIT License (MIT)
Copyright (c) 2016 Savana JS
......................................................................................................

Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


!(function($savana, undefined) {

    'use strict';

    $savana.fn.regressiveCounter = function(date, time) {

        var target = this[0]; // Selector

        var config = {
            date: date,
            time: time
        }

        // Overall control of the form, which is called in your startup
        // Your code here
        // Use simple singleton

        var controlGeneral = {
            init: function() {
                var self = this;
                self.countDown(config.date, config.time);
            },

            // countDown - $savana(selector).countDown()
            // -----------------------------------------------
            // You need a value at least.
            // Example of use:
            // $savana(selector).countDown('DD/MM/YY', 'HH:MM:SS'); - It can be used "today" at the first parameter.

            countDown: function(date, hours) {

                var clock = target;
                var endtime, time, yearval, monthval, dayval, hoursval, minutesval, secondsval = null;

                endtime = new Date();

                if (date) {
                    if (date != 'today') {
                        date = date.split('/');

                        dayval = date[0];
                        monthval = date[1] - 1;
                        yearval = date[2];
                    } else {
                        dayval = endtime.getDate();
                        monthval = endtime.getMonth();
                        yearval = endtime.getFullYear();
                        if (!hours) {
                            dayval = endtime.getDate() + 1;
                            hours = '00:00';
                        }
                    }
                }

                if (hours) {
                    hours = hours.split(':');

                    hoursval = parseInt(hours[0]) || null;
                    minutesval = parseInt(hours[1]) || null;
                    secondsval = parseInt(hours[2]) || null;
                }

                if (date && hours) {
                    endtime.setDate(dayval);
                    endtime.setMonth(monthval);
                    endtime.setYear(yearval);
                    endtime.setHours(hoursval);
                    endtime.setMinutes(minutesval);
                    endtime.setSeconds(secondsval);
                } else {
                    if (date) {
                        endtime.setDate(dayval);
                        endtime.setMonth(monthval);
                        endtime.setYear(yearval);
                    } else {
                        if (hours) {
                            endtime.setHours(endtime.getHours() + hoursval);
                            endtime.setMinutes(endtime.getMinutes() + minutesval);
                            endtime.setSeconds(endtime.getSeconds() + secondsval);
                        } else {
                            console.error('You do not put parameters for the countdown!');
                        }
                    }
                }

                if (date || hours) {
                    if (new Date(yearval, monthval, dayval, hoursval, minutesval, secondsval) < new Date()) {
                        console.info('The date is less than the current date.');
                    }
                }

                time = Date.parse(endtime) - Date.parse(new Date());

                if (time > 0) clock.style.display = 'block';

                var timeinterval = setInterval(function() {

                    time = Date.parse(endtime) - Date.parse(new Date());
                    var days = Math.floor(time / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
                    var minutes = Math.floor((time / 1000 / 60) % 60);
                    var seconds = Math.floor((time / 1000) % 60);

                    if (time < 0) {
                        clock.style.display = 'none';
                        clearInterval(timeinterval);
                    } else {
                        if (days < 10) days = '0' + days;
                        if (hours < 10) hours = '0' + hours;
                        if (minutes < 10) minutes = '0' + minutes;
                        if (seconds < 10) seconds = '0' + seconds;
                    }

                    clock.innerHTML = '<div class="js-days"><span class="js-number js-number-days">' + days + '</span><span class="js-label js-label-days">Days</span></div><span class="js-divider js-divider-first">:</span><div class="js-hours"><span class="js-number js-number-hours">' + hours + '</span><span class="js-label js-label-hours">Hours</span></div><span class="js-divider js-divider-second">:</span><div class="js-minutes"><span class="js-number js-number-minutes">' + minutes + '</span><span class="js-label js-label-minutes">Minutes</span></div><span class="js-divider js-divider-third">:</span><div class="js-seconds"><span class="js-number js-number-seconds">' + seconds + '</span><span class="js-label js-label-seconds">Seconds</span></div>';

                }, 1000);

                return null;

            },

        };

        controlGeneral.init();

    };

})($savana);