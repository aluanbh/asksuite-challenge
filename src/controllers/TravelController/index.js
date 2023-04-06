const endpoint = process.env.ENDPOINT;
const BrowserService = require('../../services/BrowserService');
const cheerio = require('cheerio');

/**
 * Controlador para buscar acomodações de viagem em um site.
 * @class
 */
class TravelController {

    /**
     * Método que busca acomodações de viagem em um site com base em um parâmetro de pesquisa.
     * @param {Object} req - Objeto de solicitação HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     */
    static async search(req, res) {
        try {
            const { checkin, checkout } = req.body;

            const browser = await BrowserService.getBrowser();
            const page = await browser.newPage();

            await page.goto(endpoint);
            await page.type('#busca-chegada-label', ...checkin);
            await page.type('#busca-saida-label', ...checkout);
            await page.click('#busca-btn');

            await page.waitForSelector('#tblChuckNorris', { timeout: 10000 });

            const html = await page.content();
            const $ = cheerio.load(html);
            const acomodacoes = $('#tblChuckNorris');
            const rooms = acomodacoes.find('.row-quarto').map((index, element) => ({
                name: $(element).find('.quartoNome').text(),
                description: $(element).find('.quartoDescricao').text().trim(),
                price: $(element).find('.valorFinal').text(),
                image: $(element).find('.room--image').attr('data-src')
            })).get();

            // @throws {Error} Tabela de resultados não encontrada na página se a tabela de resultados não for encontrada na página.
            if (!acomodacoes.length) {
                throw new Error('Tabela de resultados não encontrada na página');
            }

            //@throws {Error} Nenhum quarto encontrado se não houver quartos encontrados na página.
            if (rooms.length === 0) {
                throw new Error('Nenhum quarto encontrado');
            }

            await browser.close();

            //@returns {Object} Objeto JSON contendo os quartos encontrados na página.
            return res.status(200).json(rooms);
        }
        //@throws {Error} A página não respondeu dentro do tempo limite se a página não responder dentro do tempo limite. 
        catch (error) {
            if (error.name === 'TimeoutError') {
                return res.status(500).json({ error: 'A página não respondeu dentro do tempo limite' });
            }
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TravelController;
