import app from '../index';
import supertest from 'supertest';
import { existsSync as fsExistsSync ,promises as fsPromises } from 'fs';
import * as path from 'path';
import sharp from 'sharp';
const request = supertest(app);
describe('Api EndPoint Testing', () => {
  it('expects to respond with 200 if provided with correct filname', async done => {
    await request.get('/api/images').query('filename=fjord').query('width=300').query('height=500');
    expect(200);
    done();
  });
  it('expects to respond with 400 if provided with wrong filname', async done => {
    await request.get('/api/images').query('filename=fjosrd').query('width=300').query('height=500');
    expect(400);
    done();
  });
  it('expects to save thumb file in the thumb folder', async done => {
    await request.get('/api/images?filename=fjord&width=300&height=500');
    const fileExists = fsExistsSync(
      path.join(__dirname, `..\\..\\dist\\assets\\thumb\\fjordthumb.jpg`)
    )
    expect(
      fileExists
    ).toBeTrue;
    done();
  });
  
});
describe('Image Processing Testing',()=>{
  it('expects the image produced from the test suite before to be with the right dimentions', async () => {
    //Reading the image with fs
    const image = await fsPromises.readFile(path.join(__dirname, `..\\..\\dist\\assets\\thumb\\fjordthumb.jpg`));
    //Extracting image metadata with sharp
    const imageMetadata = await sharp(image).metadata();
    expect(imageMetadata.width).toBe(300);
    expect(imageMetadata.height).toBe(500);
  })
  it('expects sharp module to process images with right dimentions', async () => {
    //Resize the image using sharp
     sharp(path.join(__dirname, `..\\..\\dist\\assets\\full\\santamonica.jpg`))
    .resize(300,500)
    .toFile(path.join(__dirname, `..\\..\\dist\\assets\\thumb\\santamonicathumb.jpg`), err => {
      if (err) throw err;
    })
    setTimeout(() => {  console.log("World!"); }, 2000);
    //Reading the image with fs
    const image = await fsPromises.readFile(path.join(__dirname, `..\\..\\dist\\assets\\thumb\\santamonicathumb.jpg`));
    //Extracting image metadata with sharp
    const imageMetadata = await sharp(image).metadata();
    expect(imageMetadata.width).toBe(300);
    expect(imageMetadata.height).toBe(500);
  })
})
