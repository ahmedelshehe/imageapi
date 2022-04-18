import express from 'express';
import { promises as fsPromises, existsSync as fsExistsSync } from 'fs';
import * as path from 'path';
import convertImage from '../utilities/convertImage';
import thumbExcits from '../utilities/thumbExcits';
const routes = express.Router();
//Creating API Endpoint
routes.get('/api/images', async (req, res) => {
  //Getting fileName from the url
  const fileName = req.query.filename;
  //Checking if the File Excists
  if (fsExistsSync(path.join(__dirname, `..\\assets\\full\\${fileName}.jpg`))) {
    // Condition : The File Exists
    //Getting the width and the heght of the url
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    //Checking if the image thumbfile already excits
    const imageCached = await thumbExcits(fileName as string, width, height);
    if (imageCached) {
      //Condition : the thumbfile excits in this case we read the image with fs using thumb directory
      const thumbFile: string = path.join(
        __dirname,
        `..\\assets\\thumb\\${fileName}thumb.jpg`
      );
      const image = await fsPromises.readFile(thumbFile);
      // Responding with the image
      res
        .status(200)
        .send({
          message: 'File Excits'
        })
        .end(image);
    } else {
      // Condition : the thumbfile does not exist
      // We convert the image with the helper mehtod convertImage
      const thumbFile: string = await convertImage(
        fileName as string,
        width,
        height
      );
      const image = await fsPromises.readFile(thumbFile);
      // Responding with the image
      res
        .status(200)
        .send({
          message: 'File Excits'
        })
        .end(image);
    }
  } else {
    // Condition : The file does not exist
    console.log('Error In Loading Image : File Does not Exists ');
    // Returning Response with 400 response code and the message
    return res.status(400).send({
      message: 'File Does not exist'
    });
  }
});

export default routes;
