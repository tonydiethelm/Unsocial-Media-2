/* I need to see what's in a directory.
I need to get a list of folders
I need to get a list of pictures. 
I need to get a list of text files. 
I need to get a list of CSS files for future compatability.
I need a list of Other Stuff that I will assume is for download.
I want this in an object of arrays for easy access. 

*/

//setup stuff
//fs
//from documentation, import * as fs from 'node:fs' for callback and sync, use import * as fs from 'node:fs/promises' for promise based.
//Except these are built in and don't need to be required. 
//const fs = require('fs')


class DirectoryContents {
  constructor(directory){
      this.directories = [];
      this.pictures = [];
      this.text = [];
      this.other = [];
      this.css = [];
      this.fillTheContents(directory);
  }
  listDirectories(){  //the directories in target directory
    return this.directories;
  }
  listPictures(){     //the pictures in target directory
    return this.pictures;
  }
  listText(){         //the text files in target directory
    return this.text;
  }
  listCss(){         //the css files in target directory
    return this.css;
  }
  listOther(){ //Everything else in target directory, assumed
    return this.other;
  }  
  fillTheContents(directory){ //scans directory and sorts into directories, pictures, texts, and Others.
      const arrayOfDirectoryContents = fs.readdirSync(directory);
      for(const item of arrayOfDirectoryContents){
        if(isDirectory(`${directory}/${item}`)){
            this.directories.push(item);
        }
        if(isFile(`${directory}/${item}`)){
            if(item.endsWith('.txt') || item.endsWith('.text')){
              this.text.push(item);
            }else if(item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.png')){
              this.pictures.push(item);
            }
            else if(item.endsWith('.css')){
              this.css.push(item);
            }else{
              this.other.push(item);
            }
        }
      }
  }
}  


function isFile(path){
    return fs.statSync(path).isFile();
}

function isDirectory(path){
    return fs.statSync(path).isDirectory();
}




/* TESTING and notes

https://nodejs.org/api/fs.html#synchronous-example

asynchronous
fs.readdir()        returns an array containing an array containing file names in the directory you've specified. 

fsPromises.readdir(path[, options])

synchronous
fs.readdirSync()    

fsPromises.stat(path[, options])
Can get stats to see what is a directory and what is a file. 
fs.fstat(fd[, options], callback)
*/

/*
if (require.main === module) {
    const fs = require('fs'); //not strictly needed in node? 

    const testDir = '/home/tony/Codesmith/unsocial-media/test';

    //test, does it properly read the test dir? Does it see two cat pics and a directory? 
    test = fs.readdirSync(testDir);
    console.log(test);
    //yes

    //test, can I see if it's a file or a dir?
    console.log(fs.statSync(`${testDir}/${test[0]}`).isFile());
    console.log(fs.statSync(`${testDir}/${test[2]}`).isDirectory());

    //attempting to build my object. {directories:[one, two], pictures:[1.jpg, 2.png], text:one.txt}
    const contentsOfCurrentDirectory = {directories: [], pictures:[], text:[], downloadable:[]};
    for(const item of test){
        console.log(item);
        if(isDirectory(`${testDir}/${item}`)){
            contentsOfCurrentDirectory.directories.push(item);
        }
        if(isFile(`${testDir}/${item}`)){
            if(item.endsWith('.txt') || item.endsWith('.text')){
                contentsOfCurrentDirectory.text.push(item);
            }else if(item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.png')){
                contentsOfCurrentDirectory.pictures.push(item);
            }else{
                contentsOfCurrentDirectory.downloadable.push(item);
            }
        }
    }
    console.log(contentsOfCurrentDirectory);

  const testDirectoryContents = new DirectoryContents('/home/tony/Codesmith/unsocial-media/test')
  console.log(testDirectoryContents);
  console.log(testDirectoryContents.listPictures());
}
*/

module.exports = DirectoryContents;