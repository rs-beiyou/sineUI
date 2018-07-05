const fs = require('fs');

const uri = process.argv.splice(2)[0];

ls(uri);

function ls(uri) {
  const stat = fs.lstatSync(uri);
  if (stat.isDirectory()) {
    fs.readdir(uri, (err, files) => {
      if (err) {
        console.error(err);
      } else {
        files.forEach((item) => {
          ls(`${uri}/${item}`);
        });
      }
    });
  } else {
    rewrite(uri);
  }
}

function rewrite(sourse) {
  //异步读取
  fs.readFile(sourse, 'utf8', function (err, data) {
    let newData = data.replace(/(col-[a-z A-Z]{2}-)(\d+)/g, function (match, $1, $2) {
      return $1 + (+$2) * 2;
    });
    if (err) {
      console.error(err);
    } else {
      fs.writeFile(sourse, newData, error => {
        if (error) {
          console.error(error);
        } else {
          console.log(`${sourse}替换成功`);
        }
      });
    }
  });
}