import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const booking = sequelize.define(
    'booking',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      arrival: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departure: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      clientNotes: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 20000],
        }
      },
      employeeNotes: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 20000],
        }
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [[
            "booked",
            "cancelled",
            "completed",
            "progress"
          ]],
        }
      },
      cancellationNotes: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 20000],
        }
      },
      fee: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
      },
      approval: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [[
            "pending",
            "approved",
            "denied"
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

  booking.associate = (models) => {
    models.booking.belongsTo(models.user, {
      as: 'owner',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.booking.belongsTo(models.pet, {
      as: 'pet',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.booking.hasMany(models.file, {
      as: 'photos',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.booking.getTableName(),
        belongsToColumn: 'photos',
      },
    });

    models.booking.hasMany(models.file, {
      as: 'receipt',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.booking.getTableName(),
        belongsToColumn: 'receipt',
      },
    });
    
    models.booking.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.booking.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.booking.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return booking;
}
