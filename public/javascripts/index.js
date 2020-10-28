let columnHeights = [];
let containerSurpass = [];
let cards = [];
let appendCardIndex = 0;
const container = $("#container");
const containerPadding = 20;
const cardWidth = 330;
const cardMinMargin = 25;
const vacancyMaxHeight = 300;
let appending = false;

/**判斷是否滑到最底 */
const isFooter = () => document.documentElement.clientHeight + document.documentElement.scrollTop == document.documentElement.scrollHeight;

/**
 * 建立Card JQuery物件
 * @param {object} cardInfo Card相關資訊
 * @returns {object} Card JQuery物件
 */
const create_card = cardInfo => $(`
<div class="rounded-md shadow-lg bg-white absolute card" style="width: ${cardWidth}px;">
    <!-- card head -->
    <div class="p-4 bg-white flex justify-between">
        <div class="font-bold text-lg text-teal-800">${cardInfo.username}</div>
        <a href="#" class="text-lg text-blue-500">FOLLOW</a href="#">
    </div>

    <img class="w-full" src="/images/${cardInfo.id}.${cardInfo.type || "jpg"}" />

    <!-- description -->
    <div class="px-4 py-6">
        <p class="text-gray-700 text-base">${cardInfo.description}</p>
    </div>

    <!-- tag -->
    <div class="px-2">
        ${cardInfo.tag.map(v => `
        <button
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
            #${v}
        </button>
        `).join("")}
    </div>

    <!-- card footer -->
    <div class="px-2 py-4 flex justify-between">
        <!-- reply -->
        <div class="flex">
            <a href="#">
                <img src="/images/reply.svg" alt="reply" class="w-6 h-6 mr-1">
            </a>
            <span>${cardInfo.reply}</span>
        </div>

        <!-- like and share -->
        <div class="flex">
            <a href="#">
                <img src="/images/share.svg" alt="share" class="w-6 h-6 mr-2">
            </a>
            <a href="#">
                <img src="/images/like.svg" alt="like" class="w-6 h-6">
            </a>
            <a href="#">
                <img src="/images/more.svg" alt="more" class="w-6 h-6">
            </a>
        </div>
    </div>
</div>
`);

/**
 * 取得Container資訊
 * @returns {object} ContainerInfo Container資訊
 * @returns {number} ContainerInfo.containerWidth Container寬度
 * @returns {number} ContainerInfo.containerHeight Container高度
 * @returns {number} ContainerInfo.maxColumnNumer 單行最大數量
 * @returns {number} ContainerInfo.currentCardMargin card間隔
 */
const getContainerInfo = () => {
    const containerWidth = container.width();
    const maxColumnNumer = Math.max(Math.floor((containerWidth + cardMinMargin - containerPadding * 2) / (cardWidth + cardMinMargin)), 1);
    const currentCardMargin = (containerWidth - containerPadding * 2 - cardWidth * maxColumnNumer) / Math.max(maxColumnNumer - 1, 1);
    return {
        containerWidth,
        containerHeight: container.height(),
        maxColumnNumer,
        currentCardMargin
    };
}

/**
 * 取得最小高度欄
 * @returns {number|true} minHeightColumn 最小高度欄的index
 */
const getMinHeightColumn = () => {
    const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    return containerSurpass[columnIndex] || columnIndex;
};

/**
 * 計算Image位置
 * @param {number} appendColumn Image放在第幾欄
 * @param {number} margin card間距
 * @returns {object} imageCSS Card 樣式
 * @returns {number} imageCSS.left Card left樣式
 * @returns {number} imageCSS.top Card top樣式
 */
const calcImageCSS = (appendColumn, margin) => {
    return {
        left: containerPadding + (margin + cardWidth) * appendColumn,
        top: columnHeights[appendColumn] + cardMinMargin
    }
}

/**
 * 取得隨機圖片資訊
 * @returns {Promise} ajax request物件
 */
const getRandomImageInfo = async () => {
    return await $.ajax({
        type: "GET",
        url: `/random?_=${Math.random()}`
    });
}

/**
 * 新增Card填滿畫面
 */
const fillContainer = async () => {
    appending = true;
    const {
        currentCardMargin,
        containerHeight
    } = getContainerInfo();
    let columnIndex;
    while (isFooter()) {
        while ((columnIndex = getMinHeightColumn()) !== true) {
            console.assert(typeof columnIndex == "number", "columnIndex's type is not number");
            const card = create_card(await getRandomImageInfo());
            cards.push(card);
            card.css(calcImageCSS(columnIndex, currentCardMargin));
            container.append(card);
            await new Promise(resolve => setTimeout(resolve, 50));
            columnHeights[columnIndex] += cardMinMargin + card.height();
            containerSurpass[columnIndex] = columnHeights[columnIndex] > containerHeight;
        }
        containerSurpass = [];
    }
    appending = false;
}

/**
 * 重新渲染瀑布流畫面
 */
const reRender = () => {
    const {
        maxColumnNumer,
        currentCardMargin
    } = getContainerInfo();
    columnHeights = [];
    for (let i = 0; i < maxColumnNumer; i++) columnHeights[i] = 0;
    appendCardIndex = 0;
    for (; appendCardIndex < cards.length; appendCardIndex++) {
        let columnIndex = getMinHeightColumn();
        cards[appendCardIndex].css(calcImageCSS(columnIndex, currentCardMargin));
        columnHeights[columnIndex] += cardMinMargin + cards[appendCardIndex].height();
    }
};

$(window).resize(reRender);

$(window).on("scroll", async () => !appending && isFooter() && await fillContainer());

window.onload = () => {
    reRender();
    fillContainer();
}