var fs = require("fs"), 
path = require('path');

checkDIR = path => {
    if (fs.existsSync(path)) {
        return true
    }
    return false
}

createDIR = path => {
    fs.mkdir(`${path}`, { recursive: true }, (err) => {
        if (err) throw err;
    });
    return true
} 

readFilesfromDir = folder => {
    return fs.readdirSync(folder, (err, files) => {
        return files
    });
}

getStats = async folder => {
    var stats = fs.lstatSync(folder)
    // var size = stats.size // Only gets the size of files
    var size = await getSize(folder)
    
    return {
        folder: stats.isDirectory(),
        size,
        ctime: new Date(stats.ctime.getTime()),
        mtime: new Date(stats.mtime.getTime())
    }
}

async function getSize(dirPath){      
    return getStat(dirPath).then(function(stat){  
      if(stat.isFile()){  // if file return size directly
        return stat.size;
      }else{
        return getFiles(dirPath).then(function(files){    // getting list of inner files
          var promises = files.map(function(file){
            return path.join(dirPath, file);  
          }).map(getSize);    // recursively getting size of each file
          return Promise.all(promises);   
        }).then(function(childElementSizes){  // success callback once all the promise are fullfiled i. e size is collected 
            var dirSize = 0;
            childElementSizes.forEach(function(size){ // iterate through array and sum things
                dirSize+=size;
            });
            return dirSize;
        });
      }    
    });
}

// promisified get stats method
function getStat(filePath){
    return new Promise(function(resolve, reject){
      fs.lstat(filePath, function(err, stat){
        if(err) return reject(err);
        resolve(stat);
      });
    });
}
  
// promisified get files method
function getFiles(dir){
    return new Promise(function(resolve, reject){
      fs.readdir(dir, function(err, stat){
        if(err) return reject(err);
        resolve(stat);
      });
    });  
}
module.exports = {
    checkDIR,
    createDIR,
    readFilesfromDir,
    getStats
}