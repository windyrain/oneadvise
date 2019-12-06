/**
 * Rain (From The Matrix 黑客帝国)
 * @author fengyu
 */
// Prosperity, democracy, civilization, harmony, freedom, equality, justice, rule of law, patriotism, dedication, integrity and friendship
// this is socialist core values in china
const rainStr = '富强 民主 文明 和谐 自由 平等 公正 法治 爱国 敬业 诚信 友善';

class Rain {

    constructor(config) {
        const { container, rainStr, fontSize, speed } = config;
        this.container = container;
        this.rainStr = rainStr;
        this.fontSize = fontSize;
        this.speed = speed;
        this.docEl = document.documentElement;
    }

    // rain drop drop drop ~ ~ ~, a famous song by zhangyu (https://music.163.com/#/song?id=190495&market=baiduqk), try listen
    drop() {
        let rainCanvas = document.querySelector('#rain');

        if (!rainCanvas) {
            rainCanvas = document.createElement('canvas');
            rainCanvas.id = 'rain';
            rainCanvas.width = this.container.clientWidth; // style.width not work, please pay attention
            rainCanvas.height = this.container.clientHeight; // also
            rainCanvas.style.width = this.container.clientWidth; // style.width not work, please pay attention
            rainCanvas.style.height = this.container.clientHeight; // style.width not work, please pay attention
            this.container.appendChild(rainCanvas);
        }

        const cxt = rainCanvas.getContext('2d');
        this.draw(cxt);
    }

    // ok let we draw down~down animate
    draw(cxt) {
        clearInterval(this.inter);

        const { docEl, fontSize, rainStr } = this;
        const { clientWidth, clientHeight } = docEl;

        const arr = rainStr.split('');

        // | | | | | | | | | | | | , compute cols
        const cols = Math.floor(clientWidth / fontSize);
        // random start position every col
        const down = [];
        for (let i = 0; i < cols; i++) {
            down.push(Math.floor(Math.random() * -100));
        }

        this.inter = setInterval(() => {
            // when rain is not show, clear this.inter
            if (document.querySelector('#rain').style.width === '0px') {
                clearInterval(this.inter);
            }

            // set background
            cxt.fillStyle = 'rgba(0, 0, 0, .3)';
            cxt.fillRect(0, 0, clientWidth, clientHeight);

            // set amazing green
            cxt.fillStyle = '#00ff00';

            for (var i = 0; i < down.length; i++) {
                var randomNum = Math.random();
                // draw text
                cxt.fillText(arr[Math.floor(randomNum * arr.length)], i * fontSize, down[i] * fontSize);

                // if out screen, go back to initial position
                if (down[i] * fontSize > clientHeight && randomNum > 0.9) {
                    down[i] = 0;
                }

                // down ~ down
                down[i]++;
            }
        }, this.speed);
    }

}

// new Rain
new Rain({
    container: document.querySelector('.content'),
    rainStr,
    fontSize: 14,
    speed: 30
}).drop();
