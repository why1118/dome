// 移动 web 1px 边框解决方案
// 在移动端web页面开发中，为了使css中使用的尺寸与设计稿一致，通常会采用 rem 单位配合 lib-flexible 来实现移动端的适配，在IOS设备上 flexible.js 会根据设备的分辨率动态的调整 viewport 的 width 和 scale 来达到目的。

// 但是，现在很多的安卓手机也是高分辨率的屏幕，有些1px边框的按钮和列表会显得特别粗，flexible.js 只处理了IOS的手机，所以安卓手机需要我们自己处理。

// JS处理
// 首先，可以通过 window.devicePixelRatio 拿到设备的像素比，然后给 html 标签加上的相应的样式。

function retina () { // 高分辨率屏幕处理
    if (navigator.userAgent.toUpperCase().indexOf('IPHONE OS') !== -1) return; // IOS会缩放，不处理
    var classNames = [];
    var pixelRatio = window.devicePixelRatio || 1;
    classNames.push('pixel-ratio-' + Math.floor(pixelRatio));
    if (pixelRatio >= 2) {
        classNames.push('retina');
    }

    var html = document.getElementsByTagName('html')[0];

    classNames.forEach(function (className) {
        html.classList.add(className);
    });
}
// 这样一来我们可以通过, html.pixel-ratio-2 给不同分辨率的屏幕加上特殊的样式处理。

// 单个边的1px方案
// 由于andorid不能设置0.5px像素的边框，所以需要通过伪元素来模拟边框，先使伪元素的高度为1px，然后使用transform: scale(.5)缩小相应的大小即可。具体实现代码如下：

.item {
    position: relative;
    &:before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: auto;
        right: auto;
        width: 1px;
        height: 100%;
        background-color: @color;
        display: block;
        z-index: 1;
        html.pixel-ratio-2 & {
          .transform(scaleX(0.5));
        }
        html.pixel-ratio-3 & {
          .transform(scaleX(0.33));
        }
    }
}
// 然后不同方向的边框，只需要跳转伪元素的位置和缩放位置即可。该实现方案来自Framework7

// 边框按钮的1px方案
// 除了当个方向的边框外，还有一种全边框的按钮，如果不做处理会显得特别粗，但是伪元素只有 before 和 after 显然刚才的单边的方案不能用，所以只能采用其他方案。

// 当然还是利用伪元素画边框然后通过缩小，达到边框变细的目的。首先我们使用伪元素画四条边，在将宽高调整到200%,最后再缩小50%，由于边框是1px不会因宽高的改变而改变，所以我们缩小时边框也会跟着变细。

.block-line {
    position: relative;
    border: 1px solid #000;  // 正常情况下
    html.pixel-ratio-2 & {
        border-color: rgba(0, 0, 0, 0);
        &:before {
            content: "";
            width: 200%;
            height: 200%;
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid #000;
            transform: scale(0.5);
            transform-origin: 0 0;
            padding: 1px;
            box-sizing: border-box;
            pointer-events: none;
        }
    }

    html.pixel-ratio-3 & {
        border-color: rgba(0, 0, 0, 0);
        &:before {
            content: "";
            width: 300%;
            height: 300%;
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid #000;
            transform: scale(0.33);
            transform-origin: 0 0;
            padding: 1px;
            box-sizing: border-box;
            pointer-events: none;
        }
    }
}