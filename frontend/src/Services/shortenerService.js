import baseApi from './api';

class ShortenerService{
    constructor(){
        this.api = baseApi('http://localhost:3001');
    }

async getLInk(code){
    const result = await this.api.get(`link/${code}`);

    return result.data;
}
async getStats(code){
    const result = await this.api.get(`links/${code}/stats`);

    return result.data;
}

async generate(model){
    const result = await this.api.post('links', model)

    return result.data;
}

}

export default ShortenerService;