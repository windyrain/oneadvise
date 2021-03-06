/**
 * Blackhole 黑洞
 * @author fengyu
 * learn from baidu.com website
 */

// wow, $10000 dollar
const animation = '15s linear 0s infinite normal running rotates';

// pic from baidu, when you search blackhole in chinese(黑洞)
// http://s1.bdstatic.com/r/www/cache/yunying/blackhole/img/blackhole2019_pc.png
const url = './assets/blackhole.png'

// yes, I'm cute here
class Blackhole {

    constructor(config) {
        const { animation, url, maxScale } = config;

        this.body = document.body;
        this.docEl = document.documentElement;
        this.animation = animation;
        this.url = url;
        this.maxScale = maxScale;
        this.onStart = config.onStart;
        this.onEnd = config.onEnd;
    }

    // first time know suction (吸)
    suction() {
        // hihi I'm here
        let blackhole = document.querySelector('.blackhole');

        if (!blackhole) {
            // find me
            blackhole = document.createElement('img');
            blackhole.alt = `I'm a `; // you know why this sentence is not over, blackhole ~ ~ ~ 
            blackhole.src = this.url;

            // easy js style, $0 free
            blackhole.style.position = 'fixed';
            blackhole.style.width = 0;
            blackhole.style.height = 0;
            // expensive style
            blackhole.style.animation = this.animation;
            // 666 in chinese means great
            blackhole.style.zIndex = 666;

            // DOM
            this.body.appendChild(blackhole);
        }

        // first compute window size
        const maxWidth = this.docEl.clientWidth;
        const maxHeight = maxWidth;

        const maxMe = (maxWidth > maxHeight ? maxHeight : maxWidth) * this.maxScale;

        // now, put it center-center and make it bigger-bigger
        this.tween(blackhole, maxMe);
    }

    // eat and eat, eat enough. I guess is tween
    tween(ele, maxMe) {
        const { docEl, px } = this;

        clearInterval(this.inter); // I like clear inter before start

        // 开始旋转回调
        this.onStart();

        this.inter = setInterval(() => {
            // more and more faster
            let step = (ele.clientWidth + 1200) / 100;
            
            // stop it
            if (maxMe - ele.clientWidth - step < 0) {
                ele.style.width = px(maxMe);
                ele.style.height = px(maxMe);
                ele.style.left = px((docEl.clientWidth - maxMe) / 2);
                ele.style.top = px((docEl.clientHeight - maxMe) / 2);
                
                setTimeout(() => {
                    clearInterval(this.inter);
                    // too bigger to be none (物极必反 in chinese)
                    this.tweenNone(ele, maxMe);
                }, 1000);

                return;
            }

            // set style
            step = Math.floor(step);
            ele.style.width = px(ele.clientWidth + step);
            ele.style.height = px(ele.clientWidth + step);
            ele.style.left = px((docEl.clientWidth - (ele.clientWidth + step)) / 2);
            ele.style.top = px((docEl.clientHeight - (ele.clientWidth + step)) / 2);
        }, 30);
    }

    // became none
    tweenNone(ele, maxMe) {
        const { docEl, px } = this;

        clearInterval(this.inter); // I like clear inter before start

        this.inter = setInterval(() => {
            // more and more slower
            let step = ((maxMe - ele.clientWidth) + 1000) / 100;

            // stop it
            if (ele.clientWidth - step < 0) {
                ele.style.width = px(0);
                ele.style.height = px(0);
                ele.style.left = px(docEl.clientWidth / 2);
                ele.style.top = px(docEl.clientHeight / 2);
                ele.style.display = 'none';
                clearInterval(this.inter);
                this.onEnd();
            }

            // set style
            step = Math.floor(step);
            ele.style.width = px(ele.clientWidth - step);
            ele.style.height = px(ele.clientWidth - step);
            ele.style.left = px((docEl.clientWidth - (ele.clientWidth - step)) / 2);
            ele.style.top = px((docEl.clientHeight - (ele.clientWidth - step)) / 2);
        }, 30);
    }

    // px
    px(number) {
        return `${number}px`;
    }
}

if (location.protocol === 'file:') {
    // jump begin animation, though it beautiful, but i see too many time
    const rain = document.getElementById('rain');
    const welcome = document.querySelector('.welcome');
    
    rain.className = 'transparent';
    welcome.style.display = 'block';
    welcome.classList.add('welcome-message');
    Chat.preMessages.push('开发者大大，你好！');
    Chat.initPreMessages();
    Chat.showPreMessages();
} else {
    setTimeout(() => {
        new Blackhole({
            animation, 
            url, 
            maxScale: document.documentElement.clientWidth < 800 ? 2.5 : 1,
            // blackhole start rotate
            onStart: () => {
                // I don't know why 2500, but exactly good
                setTimeout(() => {
                    const rain = document.getElementById('rain');
    
                    rain.className = 'transparent';
    
                    // yeah, brother welcome to my website
                    setTimeout(() => {
                        document.querySelector('.welcome').style.display = 'block';
                    });
                }, 2000);
            },
            onEnd: () => {
                setTimeout(() => {
                    document.querySelector('.welcome').classList.add('welcome-message');
    
                    setTimeout(() => {
                        Chat.initPreMessages();
                        Chat.showPreMessages();
                    }, 1300);
                }, 500);
            }
        }).suction();
    }, 3000);
}
