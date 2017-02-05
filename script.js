document.addEventListener('DOMContentLoaded', function() {

    var closebutton = document.getElementById('close');
    var parent = closebutton.parentElement;

    closebutton.addEventListener('click', function (e) {
        e.preventDefault();
        if (parent.classList.contains('hidden')) {
            parent.classList.remove('hidden');
            parent.classList.add('shown');
        } else {
            parent.classList.remove('shown');
            parent.classList.add('hidden');
        }
    });

    document.getElementById('submit').addEventListener('click', function (e) {
        e.preventDefault();
        var form = document.getElementById('form');
        form.classList.add('loading')
        var xmlhttp = new XMLHttpRequest();
        var url = 'https://sheetsu.com/apis/v1.0/0364606eb776';

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                showResults(myArr);
            }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.send();

        function showResults(arr) {
            var dns = Math.round(arr[0].dns_time);
            var connection = Math.round(arr[0].connection_time);
            var wait = Math.round(arr[0].wait_time);
            var total = dns + connection + wait;
            var under = Math.ceil(total/100)*100;

            document.getElementById('dns').innerHTML = dns + 'ms';
            document.getElementById('connection').innerHTML = connection + 'ms';
            document.getElementById('wait').innerHTML = wait + 'ms';
            document.getElementById('total').innerHTML = total + 'ms';
            document.getElementById('under').innerHTML = under;
            document.getElementById('bar__dns').style.width = dns/total * 100 + '%';
            document.getElementById('bar__connection').style.width = connection/total * 100 + '%';
            document.getElementById('bar__wait').style.width = wait/total * 100 + '%';
            document.getElementById('marker__two').innerHTML = total/2;
            document.getElementById('marker__three').innerHTML = total;

            parent.classList.add('shown');
            parent.classList.remove('hidden');
            form.classList.remove('loading');
        }
    });
});
