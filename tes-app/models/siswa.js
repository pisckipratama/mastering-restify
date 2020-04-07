'use strict';
module.exports = (sequelize, DataTypes) => {
  const Siswa = sequelize.define('Siswa', {
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    notelp: DataTypes.STRING,
    sekolah: DataTypes.STRING
  }, {});
  Siswa.associate = function(models) {
    // associations can be defined here
  };
  return Siswa;
};