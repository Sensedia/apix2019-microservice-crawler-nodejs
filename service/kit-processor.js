const URL = require('../model/url');
const search = require('./kit-search');
const kitResolver = require('../resolver/kit-resolver');
const urlResolver = require('../resolver/url-resolver');
const { senderKit, senderSuggestion } = require('../pubsub/producer');
const suggestionRepository = require('../repository/suggestion-repository');
const { amazonCallback, dafitiCallback, marisaCallback, pernambucanasCallback, rennerCallback, zoomCallback } = require('./crawler');

async function processor(message) {

    try {

        if (message.content) {

            const content = JSON.parse(message.content);
            const kit = kitResolver(content);

            const data = [];

            for (const specification of kit.getSpecifications()) {

                const hasSuggestion = await suggestionRepository.has(kit.getGender(), specification.getType(), specification.getColor());
                if (hasSuggestion) {
                    console.log('Suggestion existing');
                    continue;
                }

                const amazonResource = urlResolver('/s?k=[TYPE]+[COLOR]+[GENDER]', kit.getGenderDesc(), specification);
                const amazon = new URL('https://www.amazon.com.br', amazonResource);
                data.push(... await search(amazon, amazonCallback, kit.getGender(), specification));

                const dafitiResource = urlResolver('/catalog/?q=[TYPE]+[COLOR]+[GENDER]', kit.getGenderDesc(), specification);
                const dafiti = new URL('https://www.dafiti.com.br', dafitiResource);
                data.push(... await search(dafiti, dafitiCallback, kit.getGender(), specification));

                const marisaResource = urlResolver('/busca?q=[TYPE]+[COLOR]+[GENDER]', kit.getGenderDesc(), specification);
                const marisa = new URL('https://pesquisa.marisa.com.br', marisaResource);
                data.push(... await search(marisa, marisaCallback, kit.getGender(), specification));

                const pernambucanasResource = urlResolver('/catalogsearch/result/?q=[TYPE]+[COLOR]+[GENDER]', kit.getGenderDesc(), specification);
                const pernambucanas = new URL('https://www.pernambucanas.com.br', pernambucanasResource);
                data.push(... await search(pernambucanas, pernambucanasCallback, kit.getGender(), specification));

                const rennerResource = urlResolver('/b?Ntt=[TYPE]+[COLOR]+[GENDER]', kit.getGenderDesc(), specification);
                const renner = new URL('https://www.lojasrenner.com.br', rennerResource);
                data.push(... await search(renner, rennerCallback, kit.getGender(), specification));

                const zoomResource = urlResolver('/search?q=[TYPE]+[COLOR]+[GENDER]#produtos', kit.getGenderDesc(), specification);
                const zoom = new URL('https://www.zoom.com.br', zoomResource);
                data.push(... await search(zoom, zoomCallback, kit.getGender(), specification));

                await suggestionRepository.save(kit.getGender(), specification.getType(), specification.getColor())

            }

            if (data.length) {
                senderSuggestion(data);
                senderKit(kit.getImmutableObject());
            }

        }

    } catch (err) {
        console.log('Error to process message: ', err.message, err);
    }

}

module.exports = processor;