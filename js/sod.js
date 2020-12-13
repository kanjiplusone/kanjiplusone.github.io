(function () {
    window.kanji = {
        initialize: function () {
            return $('.ksvg svg').each(function () {
                var delay, i, len, length, path, paths, previousStrokeLength, results, speed;
                paths = $('path', this);
                delay = 0;
                results = [];
                for (i = 0, len = paths.length; i < len; i += 1) {
                    path = paths[i];
                    length = path.getTotalLength();
                    previousStrokeLength = speed || 0;
                    speed = 450;
                    delay += previousStrokeLength + 100;
                    results.push($(path).css('transition', 'none')
                        .attr('data-length', length)
                        .attr('data-speed', speed)
                        .attr('data-delay', delay)
                        .attr('stroke-dashoffset', length)
                        .attr('stroke-dasharray', length + ',' + length));
                }
                return results;
            });
        },
        animate: function () {
            return $('.ksvg svg').each(function () {
                var delay, i, len, length, path, paths, results, speed;
                paths = $('path', this);
                results = [];
                for (i = 0, len = paths.length; i < len; i += 1) {
                    path = paths[i];
                    length = $(path).attr('data-length');
                    speed = $(path).attr('data-speed');
                    delay = $(path).attr('data-delay');
                    results.push($(path).css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear').attr('stroke-dashoffset', '0'));
                }
                return results;
            });
        }
    };
    $(document).ready(function () {
        /* ひらがな \u3040-\u309f */
        /* カタカナ \u30a0-\u30ff */
        /* var inputregex = /^[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]+$/; */
        var inputregex = /^[\u3400-\u4dbf\u4e00-\u9faf]+$/;
        /*
        $.validator.addMethod("kanjiInput", function (value, element) {
            return this.optional(element) || inputregex.test(value);
        });
        $.validator.setDefaults({
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent().parent());
                } else {
                    error.insertAfter(element.parent());
                }
            }
        });
        */
        $('.sodform').submit(function(e) {
           e.preventDefault();
           var k = $('input[name=kanji]').val(),
               ucs = k.charCodeAt(0).toString(16);
           $.ajax({
               type: 'GET',
               url: '/kanji/0' + ucs + '.svg',
               dataType: 'xml'
           }).done(function (data) {
               $('.ksvg svg').empty();
               $('.ksvg svg').append($('svg', data).children());
               window.kanji.initialize();
               return setTimeout(function () {
                   return window.kanji.animate();
               }, 750);
           });
        });	
        /*
 *         $('.addkanji').on('click', function () {
 *                         $('#genkouyoushi').append('<div class="kgkys"> <span></span></div>');
 *                                 });
 *                                         */
        return $('.redraw').on('click', function () {
            window.kanji.initialize();
            return setTimeout(function () {
                return window.kanji.animate();
            }, 500);
        });
    });
}.call(this));
