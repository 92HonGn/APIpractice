function getData(da) {
    const clientID = '3g014663u091f0s2i46h7rdvceh3pl';
    const game = 'Apex%20Legends';
    const limit = 20;
    const apiUrl1 = 'https://api.twitch.tv/kraken/streams/?game=' + game + '&limit=' + limit;
    const apiUrl2 = 'https://api.twitch.tv/kraken/streams/?client_id=' + clientID + '&game=' + game + '&limit=' + limit;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl1, true);
    xhr.setRequestHeader('client-id', clientID);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let reponse = JSON.parse(this.responseText);
            console.log(reponse);
            da(null, reponse);
        }
    };
}
getData((err, data) => {

    const {
        streams
    } = data;
    const $row = document.querySelector('.row');
    for (let stream of streams) {
        $row.innerHTML += getTemplate(stream);
    }

});

function getTemplate(data) {
    return `
        <div class="grid-4">
            <div class="preview">
                <img src="${data.preview.medium}" alt="">
            </div>
            <div class="live">
                <div class="live__logo">
                    <img src="${data.channel.logo}" alt="">
                </div>
                <div class="live__desc">
                    <div class="live__desc--title">
                        ${data.channel.status}
                    </div>
                    <div class="live__desc--name">
                        ${data.channel.display_name}
                    </div>
                </div>
            </div>
        </div>
    `;
}
///JSONP原理 script標籤可以跨網域
// var src = apiUrl2 + '&callback=hello';
// var script = `<script src="${src}">
//     </script>`;

// $(document).ready(function() {
//     $('body').append(script);
// });

// function hello(data) {
//     console.log("hellow~");
//     console.log(data);
// }