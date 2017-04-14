/**
 * Created by Huaxiang on 2017/4/14.
 */
(function () {
    var elems = [document.getElementById('el'), document.getElementById('input')];

    var data = {
        value: 'hello!'
    };

    var command = {
        text: function (str) {
            this.innerHTML = str;
        },
        value: function (str) {
            this.setAttribute('value', str);
        }
    };

    var scan = function () {
        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            elem.command = [];
            for (var j = 0, len1 = elem.attributes.length; j < len1; j++) {
                var attr = elem.attributes[j];
                if (attr.nodeName.indexOf('q-') >= 0) {
                    command[attr.nodeName.slice(2)].call(elem, data[attr.nodeValue]);
                    elem.command.push(attr.nodeName.slice(2));
                }
            }
        }
    }

    function mvSet(key, value) {
        data[key] = value;
        scan();
    }

    elems[1].addEventListener('keyup', function (e) {
        mvSet('value', e.target.value);
    }, false);

    scan();
})()