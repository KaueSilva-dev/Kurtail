import {Request, Response} from 'express';
import {Link} from '../models/links';
import linkRepository from '../models/linkRepository';

const links : Link[] = [];
let proxId =1;

function generateCode(){
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    for(let i=0; i<5; i++){
        text += possible.charAt(Math.floor(Math.random()*possible.length));

    }
    return text;
}

async function postlink(req:Request, res:Response){
    const link = req.body as Link;
    link.code = generateCode();
    link.hits = 0;
    const result = await linkRepository.add(link);
    if(!result.id) return res.sendStatus(400);
    link.id = result.id;
    res.status(201).json(link);
}

async function getlink(req:Request, res:Response){
    const code = req.params.code as string;
    const link = await linkRepository.findByCode(code);
    if(!link)
        res.sendStatus(404);
    else
        res.json(link);
}

async function hitlink(req:Request, res:Response){
    const code = req.params.code as string;
    const link = await linkRepository.hit(code);

    if(!link)
        res.sendStatus(404)
    else
        res.json(link);
}

export default{
    postlink,
    getlink,
    hitlink
}