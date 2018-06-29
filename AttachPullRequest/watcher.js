const chokidar = require('chokidar');
const fs = require('fs');

function callback(){
  console.log("symlink created");
};

chokidar.watch('screens/.', {
    ignored: /(^|[\/\\])\../,
    followSymlinks: false
  }).on('all', (event, path) => {

  console.log(event, path);

  var real_path = path.replace('screens', '');

  // Creating symlink
  if (event == 'add' || event == 'addDir'){
    console.log("creating symlink");
    fs.symlink('../../' + real_path, 'screens/.build/src' + real_path, callback);
  }

  // Deleting symlink
  if (event == 'unlink'){
    console.log("deleting symlink");
    fs.unlink('screens/.build/src' + real_path, (err) => {
      if (err) throw err;
      console.log('screens/.build/src' + real_path + ' was deleted');
    });
  }
});
