const cheerio = require('cheerio');

const createRecommendation = (type, title, price, color, link, image, date, gender) =>
    ({
        type: type,
        title: title,
        price: price,
        color: color,
        link: link,
        image: image,
        date: date,
        gender: gender
    });

function amazonCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('div[data-index]').each((index, item) => {
        data.push(createRecommendation(specification.getType(),
                                       $(item).find('img[data-image-load]').attr('alt'),
                                       parsePrice(getValue($(item).find('span[class=a-offscreen]').first().text(), $(item).find('span[class=a-color-base]').first().text())),
                                       specification.getColor(),
                                       url.getHost().concat($(item).find('.a-size-base.a-link-normal.s-no-hover.a-text-normal').attr('href')),
                                       $(item).find('img[data-image-load]').attr('src'),
                                       searchDate,
                                       gender));
    });
    console.log('[store: amazon, count: %s recommendations]----------------', data.length);
    return data;
};

function dafitiCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.product-box').each((index, item) => {
        const image = $(item).find('img[class=product-image]');
        if (image.attr('alt')) {
            data.push(createRecommendation(specification.getType(),
                                           image.attr('alt'),
                                           parsePrice(getValue($(item).find('.product-box-price-to').text(), $(item).find('.product-box-price-from').text())),
                                           specification.getColor(),
                                           $(item).find('a').attr('href'),
                                           image.attr('data-original'),
                                           searchDate,
                                           gender));
        }
    });
    console.log('[store: dafiti, count: %s recommendations]----------------', data.length);
    return data;
};

function marisaCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.nm-product-item').each((index, item) => {
        data.push(createRecommendation(specification.getType(),
                                       $(item).attr('data-name'),
                                       parsePrice($(item).find('span[class=price-number]').text()),
                                       specification.getColor(),
                                       resolveLink('www', $(item).find('a').attr('href')),
                                       resolveLink('images2', $(item).find('img[class="nm-product-img"]').attr('src')),
                                       searchDate,
                                       gender));
    });
    console.log('[store: marisa, count: %s recommendations]----------------', data.length);
    return data;
};

function pernambucanasCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.item.product.product-item').each((index, item) => {
        data.push(createRecommendation(specification.getType(),
                                       $(item).find('img').attr('alt'),
                                       parsePrice($(item).find('span[class=price]').text()),
                                       specification.getColor(),
                                       $(item).find('.product-item-link').attr('href'),
                                       $(item).find('img').attr('src'),
                                       searchDate,
                                       gender));
    });
    console.log('[store: pernambucanas, count: %s recommendations]----------------', data.length);
    return data;
};

function rennerCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.item_product').each((index, item) => {
        const image = resolveLink('img', $(item).find('figure>img').attr('src'));
        if (image) {
            data.push(createRecommendation(specification.getType(),
                                           $(item).find('h4[class=name_product]').text().trim(),
                                           parsePrice($(item).find('.best_price').text().trim()),
                                           specification.getColor(),
                                           resolveLink('www', $(item).find('a[class=js-prod-link]').attr('href')),
                                           image,
                                           searchDate,
                                           gender));
        }
    });
    console.log('[store: renner, count: %s recommendations]----------------', data.length);
    return data;
};

function zoomCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.item.tp-offer').each((index, item) => {
        data.push(createRecommendation(specification.getType(),
                                       $(item).find('a.lbt.name-link').text(),
                                       parsePrice($(item).find('a.lbt.price').text()),
                                       specification.getColor(),
                                       url.getHost().concat($(item).find('a.lbt').attr('href')),
                                       resolveLink('i.zst', $(item).find('img').attr('src')),
                                       searchDate,
                                       gender));
    });
    console.log('[store: zoom, count: %s recommendations]----------------', data.length);
    return data;
};

const resolveLink = (prefix, text) => {
    if (text) {
        const index = text.indexOf(prefix);
        return text.slice(index, text.length);
    }
    return text;
}

const parsePrice = price => {
    const parsed = price.toUpperCase()
                        .replace('R$', '')
                        .replace(' ', '')
                        .replace(',', '.');
    return parseFloat(parsed);
}

const getValue = (...elements) => {
    for (const element of elements) {
        if (element) {
            return element;
        }
    }
    return null;
}

module.exports = {
    amazonCallback,
    dafitiCallback,
    marisaCallback,
    pernambucanasCallback,
    rennerCallback,
    zoomCallback
};