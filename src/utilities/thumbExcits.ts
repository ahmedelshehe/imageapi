import { promises as fsPromises, existsSync as fsExistsSync } from 'fs';
import * as path from 'path';
import sharp from 'sharp';
//Creating a function with 3 inputs 1 is required and two optional
//filename(string) | required , width and height (number) | optional
//Returns A Promise of type boolean
//The Function returns true if the the thumb of an image is cached and return false if not
const thumbExcits = async (
  fileName: string,
  width?: number,
  height?: number
): Promise<boolean> => {
  //Setting Up the thumb file name and its directory
  const thumbName = fileName + 'thumb.jpg';
  const thumbDir = path.join(__dirname, `..\\assets\\thumb\\${thumbName}`);
  //Check if the file exists
  if (fsExistsSync(thumbDir)) {
    //Condition : The thumb exists
    //Reading the image with fs
    const image = await fsPromises.readFile(thumbDir);
    //Extracting image metadata with sharp
    const imageMetadata = await sharp(image).metadata();
    //Comparing the height and width of the image with the imputs provided
    if (imageMetadata.width == width && imageMetadata.height == height) {
      // Condition :Metadata Matched returns true
      return true;
    } else {
      // Condition :Metadata does not match returns false
      return false;
    }
  } else {
    // Condition : The thumb file does not excits return false
    return false;
  }
};
export default thumbExcits;
