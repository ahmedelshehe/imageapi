"An api using node typescript and sharp " 
#To install
npm install 
#To Start 
npm start
#Usage
The Api work by sending get request to '/api/images' url with providing three query strings
Filename : which will be located in the assets/full folder
Width and Height : The image will be processed to these numbers 
Example : `localhost:3000/api/images?filname=fjord&width400&height=500`

# Testing
Notice that I will add the assets folder in the dist folder for testing purposes.
Also sometimes one test failed because sharp module seems  to have trouble processing two images.
In this case run it one more time