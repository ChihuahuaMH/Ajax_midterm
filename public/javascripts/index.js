let columnHeights = [];
// let 
let cards = [];
let currentCardMargin;
let appendCardIndex = 0;
const container = $("#container");
const containerPadding = 20;
const cardWidth = 330;
const cardMinMargin = 25;
const vacancyMaxHeight = 300;

const create_card = card_info => $(`
<div class="rounded-md shadow-lg bg-white absolute card" style="width: ${cardWidth}px;">
    <!-- card head -->
    <div class="p-4 bg-white flex justify-between">
        <div class="font-bold text-lg text-teal-800">${card_info.username}</div>
        <a href="#" class="text-lg text-blue-500">FOLLOW</a href="#">
    </div>

    <img class="w-full" src="/images/${card_info.id}.jpg" />

    <!-- description -->
    <div class="px-4 py-6">
        <p class="text-gray-700 text-base">${card_info.description}</p>
    </div>

    <!-- tag -->
    <div class="px-2">
        ${card_info.tag.map(v => `
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
            <span>${card_info.reply}</span>
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

const getRandomImage = () => {
    let appendColumn = getMinHeightColumn();
    if (columnHeights[appendColumn] < container.prop('scrollHeight') - vacancyMaxHeight) {
        $.ajax({
            type: "GET",
            url: `/random?_=${Math.random()}`,
            success: function (response) {
                let card = create_card(response);
                cards.push(card);
                card.css({
                    left: containerPadding + (currentCardMargin + cardWidth) * appendColumn,
                    top: columnHeights[appendColumn] + cardMinMargin
                });
                container.append(card);
                setTimeout(() => {
                    columnHeights[appendColumn] += cardMinMargin + card.height();
                    getRandomImage();
                }, 50);
            }
        });
    }
};

const getMinHeightColumn = () => columnHeights.indexOf(Math.min(...columnHeights));

const appendImages = () => {
    for (; appendCardIndex < cards.length; appendCardIndex++) {
        let appendColumn = getMinHeightColumn();
        cards[appendCardIndex].css({
            left: containerPadding + (currentCardMargin + cardWidth) * appendColumn,
            top: columnHeights[appendColumn] + cardMinMargin
        });
        columnHeights[appendColumn] += cardMinMargin + cards[appendCardIndex].height();
    }
    getRandomImage();
};

const reRender = () => {
    const containerWidth = container.width();
    let maxColumnNumer = Math.max(Math.floor((containerWidth + cardMinMargin - containerPadding * 2) / (cardWidth + cardMinMargin)), 1);
    currentCardMargin = (containerWidth - containerPadding * 2 - cardWidth * maxColumnNumer) / Math.max(maxColumnNumer - 1, 1);
    columnHeights = [];
    for (let i = 0; i < maxColumnNumer; i++) columnHeights[i] = 0;
    appendCardIndex = 0;
    appendImages();
};

window.addEventListener("resize", reRender);

window.onload = () => {
    reRender();
    // container.append(create_card(1).css("left", 20));
    // container.append(create_card(0).css("left", 20 + (330 + 30) * 1));
    // container.append(create_card(2).css("left", 20 + (330 + 30) * 2));
    // container.append(create_card(3).css("left", 20 + (330 + 30) * 3));
    // container.append(create_card(4).css("left", 20 + (330 + 30) * 4));
    // container.append(create_card(5).css("left", 20).css("top", 650));
    // container.append(create_card(6).css("left", 20 + (330 + 30) * 1).css("top", 650));
    // container.append(create_card(7).css("left", 20 + (330 + 30) * 2).css("top", 650));
    // container.append(create_card(8).css("left", 20 + (330 + 30) * 3).css("top", 650));
    // container.append(create_card(9).css("left", 20 + (330 + 30) * 4).css("top", 650));

}