import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const pet = sequelize.define(
    'pet',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
          notEmpty: true,
        }
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [[
            "cat",
            "dog",
            "bird"
          ]],
        }
      },
      breed: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
          notEmpty: true,
        }
      },
      size: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [[
            "small",
            "medium",
            "large"
          ]],
        }
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  pet.associate = (models) => {
    models.pet.belongsTo(models.user, {
      as: 'owner',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.pet.hasMany(models.booking, {
      as: 'bookings',
      constraints: false,
      foreignKey: 'petId',
    });


    
    models.pet.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.pet.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.pet.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return pet;
}
