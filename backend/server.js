import express from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";
import { productModel } from "./product-model.js";
import {connectToDB} from "./db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
try {
    await connectToDB();
    app.listen(process.env.PORT, ()=>{
console.log(`Running on ${process.env.PORT} Successfully...!`);
});
}
catch(err){
    console.log(err);
}

const client = new S3Client({ region: process.env.REGION , credentials : {
    accessKeyId : process.env.AWS_ACCESS_KEY,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
}});

const createPresignedUrlWithClient = ({bucket, key }) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

app.post("/api/get-presigned-url", async (req,res)=>{
    const {mime} = req.body;
    const fileName = uuidv4();
    const finalName = `${fileName}.${mime}`;

    const url = await createPresignedUrlWithClient({
            bucket : process.env.S3_BUCKET_NAME,
            key :finalName,
    });

    res.json({
        url,finalName
    });
});

app.post("/api/products", async (req,res) => {
    const {name,description,price,filename} = req.body;

    if(!name || !description || !price || !filename){
        res.json({message : 'All fields are Mandatory..!'});
        return;
    }

    const product = await productModel.create({
        name,description,price,filename
    });

    console.log('product : ' , product);

    res.json({message : 'Success'});
});

app.get('/api/products', async (req,res) => {
    const response = await productModel.find();
    res.json(response);
})







