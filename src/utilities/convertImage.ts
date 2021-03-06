import path from 'path';
import sharp from 'sharp';
import { mkdir as fsMkDir, existsSync as fsExistsSync } from 'fs';
//Creating a function with 3 inputs 1 is required and two optional
//filename(string) | required , width and height (number) | optional
//Returns A Promise of type string
//The Function converts the image file to another image with the dimentions specified
//and returns the directory of the converted image
const convertImage = (
  fileName: string,
  width: number,
  height: number
): Promise<string> => {
  // Setting Up the Input Directory and Output Directory
  const fileDir: string = path.join(
    __dirname,
    `..\\assets\\full\\${fileName}.jpg`
  );
  const outDir: string = path.join(
    __dirname,
    `..\\assets\\thumb\\${fileName}thumb.jpg`
  );
  return new Promise<string>((resolve, reject) => {
    try {
      const folderExcists = fsExistsSync(
        path.join(__dirname, `..\\assets\\thumb`)
      );
      if (!folderExcists)
        fsMkDir(path.join(__dirname, `..\\assets\\thumb`), error => {
          if (error) {
            reject();
          }
        });
      //Resize the image using sharp
      sharp(fileDir)
        .resize(width, height)
        .toFile(outDir, err => {
          if (err) throw err;
        });
      //Setting 1 second Timeout to Prevent the next method from reading the file before it converted
      setTimeout(() => resolve(outDir), 1000);
    } catch (error) {
      reject();
    }
  });
};
export default convertImage;
