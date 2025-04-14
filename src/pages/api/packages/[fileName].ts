import type { NextApiResponse } from "next";
import fs from 'fs/promises'
import path from "path";
import { v4 as uuidv4} from 'uuid'
import withAuth, {NextApiRequestWithAuth} from "../../../middleware/withAuth";

const dataDirectory = path.join(process.cwd(), 'src','data')

const getFilePath = (fileName: string | string[] | undefined):string | null => {
    if (typeof fileName !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(fileName)) return null;;
    return path.join(dataDirectory, `${fileName}.json`)
}

const readData = async (filePath: string)=>{
    try{ return JSON.parse(await fs.readFile(filePath, 'utf8'));}
    catch(error: any) {if (error.code === 'ENOENT') {return [];} throw new Error('Read Error');}

}

const writeData = async(filePath: string, data: any):Promise<void>=>{
    try{ await fs.writeFile(filePath, JSON.stringify(data, null,2), 'utf8');}
    catch(error){throw new Error('Write Error');}
}

const fileApiHandler = async(req: NextApiRequestWithAuth, res: NextApiResponse) =>{
    const {fileName, id} = req.query;
    const filePath =getFilePath(fileName)
    if(!filePath) return res.status(400).json({message: 'Invalid file name.'})

    console.log(`API CALL : User ${req.user?.userId} (${req.user?.role}) | Method: ${req.method} | File: ${fileName}`)

    if(req.method === 'GET'){
        try{ const data = await readData(filePath); res.status(200).json(data);}
        catch(error: any){ res.status(500).json({message: 'Read Error'});}
    }
    else if(req.method === 'POST'){
        try{
            const data = await readData(filePath)
            const newItem = {id: uuidv4(), ...req.body};
            data.push(newItem)
            await writeData(filePath, data);
            res.status(201).json(newItem)
        }catch(error: any){
            res.status(500).json({message: 'Post Error'})
        }
    }
    else if (req.method === 'PUT'){
        if(!id || typeof id !== 'string') return res.status(400).json({message: 'ID required.'})
        
        try{
            const data = await readData(filePath); const index = data.findIndex((i: any) => i.id === id);

            if(index === -1) return res.status(404).json({message: 'Not Found'});
            data[index] = {...data[index], ...req.body}; await writeData(filePath,data);
            res.status(200).json(data[index])
        }catch(error:any){
            res.status(500).json({message:'Update Error'})
        }
    }
    else if (req.method === 'DELETE'){
        if(!id || typeof id !== 'string') return res.status(400).json({message: 'ID required'})
        
        try{
            let data = await readData(filePath); const initalLength = data.length;
            data = data.filter((i:any) => i.id !== id)
            if( data.length === initalLength) return res.status(404).json({message: 'Not Found'})
            
                await writeData(filePath, data); res.status(200).json({message: 'Deleted'})
        }catch(error: any){ res.status(500).json({message: 'Delete Error'});}
    }
    else{
        res.setHeader('Allow',['GET','POST','PUT','DELETE']);
        res.status(405).end(`Method $(req.method) Not allowed`);
    }
};

export default function handler(req: NextApiRequestWithAuth, res: NextApiResponse){
    if(req.method === 'GET'){
        return withAuth(fileApiHandler)(req,res)
    }
    else if (['POST','PUT','DELETE'].includes(req.method!)){
        return withAuth(fileApiHandler, 'admin')(req,res);
    }
    else{
        res.setHeader('Allow',['GET','POST','PUT','DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}