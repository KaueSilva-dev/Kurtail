import linkMoldels, {ILinkModel} from './linkMoldels';
import {Link} from './links';


function findByCode(code: string){
    return linkMoldels.findOne<ILinkModel>({where: {code}});
}

function add(link: Link){
    return linkMoldels.create<ILinkModel>(link);
}

async function hit(code: string){
    const link = await findByCode(code);
    if(!link)return null;

    link.hits!++;
    await link.save();
    return link;
}

export default{
    findByCode,
    add,
    hit
}