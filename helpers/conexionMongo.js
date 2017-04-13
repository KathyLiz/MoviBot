var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
var url = 'mongodb://localhost:27017/encuestaMovistar';

var process = require('child_process');

function conexionMongo() {
};

conexionMongo.prototype.atencion;
conexionMongo.prototype.servicio;

conexionMongo.prototype.registro = function() {
  var valorAte = this.atencion;
  var valorSer = this.servicio;

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    insertarEncuesta(db, valorAte, valorSer, function() {
      db.close();
    });

    exportarEstadisticas(db, function() {
        db.close();

        exportarResultados();
      });
  });
};

var insertarEncuesta = function(db, valorAtencion, valorServicio, callback) {
  var atencion = db.collection('atencion');
  var servicio = db.collection('servicio');

  atencion.insert({calidadAtencion: valorAtencion}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    callback(result);
  });

  servicio.insert({calidadServicio: valorServicio}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    callback(result);
  });
}

var exportarResultados = function() {
  process.exec('cd exports/ && mongoexport --db encuestaMovistar --collection atencion --out atencion.json && mongoexport --db encuestaMovistar --collection servicio --out servicio.json',function (err,stdout,stderr) {
    if (err) {
      console.log("\n"+stderr);
    }
  });
}

var exportarEstadisticas = function(db, callback) {
  var atencion = db.collection('atencion');
  var servicio = db.collection('servicio');

  process.exec('cd exports/ && echo "Estadísticas de atención para la fecha" > estadisticasAtencion.txt',function (err,stdout,stderr) {
    if (err) {
      console.log("\n"+stderr);
    }
  });

  process.exec('cd exports/ && date --rfc-2822 >> estadisticasAtencion.txt',function (err,stdout,stderr) {
    if (err) {
      console.log("\n"+stderr);
    }
  });

  atencion.find({'calidadAtencion': '1'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "\nResultados para 1:\t' + docs + '" >> estadisticasAtencion.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  atencion.find({'calidadAtencion': '2'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "Resultados para 2:\t' + docs + '" >> estadisticasAtencion.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  atencion.find({'calidadAtencion': '3'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "Resultados para 3:\t' + docs + '" >> estadisticasAtencion.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  atencion.find({'calidadAtencion': '4'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "Resultados para 4:\t' + docs + '" >> estadisticasAtencion.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  atencion.find({'calidadAtencion': '5'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "Resultados para 5:\t' + docs + '" >> estadisticasAtencion.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  atencion.count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "\nTotal de registros:\t' + docs + '" >> estadisticasAtencion.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  process.exec('cd exports/ && echo "Estadísticas de servicio para la fecha" > estadisticasServicio.txt',function (err,stdout,stderr) {
    if (err) {
      console.log("\n"+stderr);
    }
  });

  process.exec('cd exports/ && date --rfc-2822 >> estadisticasServicio.txt',function (err,stdout,stderr) {
    if (err) {
      console.log("\n"+stderr);
    }
  });

  servicio.find({'calidadServicio': '1'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "\nResultados para 1:\t' + docs + '" >> estadisticasServicio.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  servicio.find({'calidadServicio': '2'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "Resultados para 2:\t' + docs + '" >> estadisticasServicio.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  servicio.find({'calidadServicio': '3'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "Resultados para 3:\t' + docs + '" >> estadisticasServicio.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  servicio.find({'calidadServicio': '4'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "Resultados para 4:\t' + docs + '" >> estadisticasServicio.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  servicio.find({'calidadServicio': '5'}).count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "Resultados para 5:\t' + docs + '" >> estadisticasServicio.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });

  servicio.count(function(err, docs) {
    assert.equal(err, null);

    process.exec('cd exports/ && echo "\nTotal de registros:\t' + docs + '" >> estadisticasServicio.txt',function (err,stdout,stderr) {
      if (err) {
        console.log("\n"+stderr);
      }
    });

    callback(docs);
  });
}

conexionMongo.prototype.setValorAtencion = function(atencion){
    this.atencion = atencion;
};

conexionMongo.prototype.setValorServicio = function(servicio){
    this.servicio = servicio;
};

module.exports = conexionMongo;