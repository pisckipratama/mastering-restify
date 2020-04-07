'use strict';
module.exports = (sequelize, DataTypes) => {
  const Siswa = sequelize.define('Siswa', {
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    notelp: DataTypes.STRING,
    SekolahId: DataTypes.INTEGER,
    isedited: DataTypes.BOOLEAN
  }, {});
  Siswa.associate = function(models) {
    // associations can be defined here
    Siswa.belongsTo(models.Sekolah)
  };
  return Siswa;
};