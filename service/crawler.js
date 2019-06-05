const cheerio = require('cheerio');

const createSuggestion = (type, title, price, color, link, image, date, gender) =>
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
        const price = getValue($(item).find('span[class=a-offscreen]').first().text(), $(item).find('span[class=a-color-base]').first().text());
        if (price) {
            data.push(createSuggestion(specification.getType(),
                                           $(item).find('img[data-image-load]').attr('alt'),
                                           parsePrice(price),
                                           specification.getColor(),
                                           url.getHost().concat($(item).find('.a-size-base.a-link-normal.s-no-hover.a-text-normal').attr('href')),
                                           resolveImage($(item).find('img[data-image-load]').attr('src')),
                                           searchDate,
                                           gender));
        }
    });
    console.log(`[store: amazon, specification: ${specification.toString()}, count: ${data.length} suggestions]----------------`);
    return data;
};

function dafitiCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.product-box').each((index, item) => {
        const image = $(item).find('img[class=product-image]');
        if (image.attr('alt')) {
            data.push(createSuggestion(specification.getType(),
                                           image.attr('alt'),
                                           parsePrice(getValue($(item).find('.product-box-price-to').text(), $(item).find('.product-box-price-from').text())),
                                           specification.getColor(),
                                           $(item).find('a').attr('href'),
                                           resolveImage(image.attr('data-original')),
                                           searchDate,
                                           gender));
        }
    });
    console.log(`[store: dafiti, specification: ${specification.toString()}, count: ${data.length} suggestions]----------------`);
    return data;
};

function marisaCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.nm-product-item').each((index, item) => {
        data.push(createSuggestion(specification.getType(),
                                       $(item).attr('data-name'),
                                       parsePrice($(item).find('span[class=price-number]').text()),
                                       specification.getColor(),
                                       resolveLink('www', $(item).find('a').attr('href')),
                                       resolveImage(resolveLink('images2', $(item).find('img[class="nm-product-img"]').attr('src'))),
                                       searchDate,
                                       gender));
    });
    console.log(`[store: marisa, specification: ${specification.toString()}, count: ${data.length} suggestions]----------------`);
    return data;
};

function pernambucanasCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.item.product.product-item').each((index, item) => {
        data.push(createSuggestion(specification.getType(),
                                       $(item).find('img').attr('alt'),
                                       parsePrice($(item).find('span[class=price]').text()),
                                       specification.getColor(),
                                       $(item).find('.product-item-link').attr('href'),
                                       resolveImage($(item).find('img').attr('data-cfsrc')),
                                       searchDate,
                                       gender));
    });
    console.log(`[store: pernambucanas, specification: ${specification.toString()}, count: ${data.length} suggestions]----------------`);
    return data;
};

function rennerCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.item_product').each((index, item) => {
        const image = resolveLink('img', $(item).find('figure>img').attr('src'));
        if (image) {
            data.push(createSuggestion(specification.getType(),
                                           $(item).find('h4[class=name_product]').text().trim(),
                                           parsePrice($(item).find('.best_price').text().trim()),
                                           specification.getColor(),
                                           resolveLink('www', $(item).find('a[class=js-prod-link]').attr('href')),
                                           resolveImage(image),
                                           searchDate,
                                           gender));
        }
    });
    console.log(`[store: renner, specification: ${specification.toString()}, count: ${data.length} suggestions]----------------`);
    return data;
};

function zoomCallback(html, url, gender, searchDate, specification) {
    const data = [];
    const $ = cheerio.load(html);
    $('.item.tp-offer').each((index, item) => {
        data.push(createSuggestion(specification.getType(),
                                       $(item).find('a.lbt.name-link').text(),
                                       parsePrice($(item).find('a.lbt.price').text()),
                                       specification.getColor(),
                                       url.getHost().concat($(item).find('a.lbt').attr('href')),
                                       resolveImage(resolveLink('i.zst', $(item).find('img').attr('src'))),
                                       searchDate,
                                       gender));
    });
    console.log(`[store: zoom, specification: ${specification.toString()}, count: ${data.length} suggestions]----------------`);
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

const resolveImage = image => {
    if (image.startsWith('http://') || image.startsWith('https://')) {
        return image;
    }
    return `http://${image}`;
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