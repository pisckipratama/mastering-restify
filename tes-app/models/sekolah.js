'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sekolah = sequelize.define('Sekolah', {
    nama: DataTypes.STRING
  }, {});
  Sekolah.associate = function(models) {
    // associations can be defined here
    Sekolah.hasMany(models.Siswa)
  };
  return Sekolah;
};