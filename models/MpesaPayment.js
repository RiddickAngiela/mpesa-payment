module.exports = (sequelize, DataTypes) => {
  const MpesaPayment = sequelize.define('MpesaPayment', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    }
  });

  return MpesaPayment;
};
