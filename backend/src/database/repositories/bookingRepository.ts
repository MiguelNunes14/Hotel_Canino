import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';import UserRepository from './userRepository';
import FileRepository from './fileRepository';
import { IRepositoryOptions } from './IRepositoryOptions';

const Op = Sequelize.Op;

class BookingRepository {

  static async create(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await options.database.booking.create(
      {
        ...lodash.pick(data, [
          'arrival',
          'departure',
          'notes',
          'employeeNotes',
          'status',
          'cancellationNotes',
          'fee',          
          'importHash',
        ]),
        ownerId: data.owner || null,
        petId: data.pet || null,
        tenantId: tenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    
  
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.booking.getTableName(),
        belongsToColumn: 'photos',
        belongsToId: record.id,
      },
      data.photos,
      options,
    );
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.booking.getTableName(),
        belongsToColumn: 'receipt',
        belongsToId: record.id,
      },
      data.receipt,
      options,
    );
  
    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );


    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let record = await options.database.booking.findOne(      
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    record = await record.update(
      {
        ...lodash.pick(data, [
          'arrival',
          'departure',
          'notes',
          'employeeNotes',
          'status',
          'cancellationNotes',
          'fee',          
          'importHash',
        ]),
        ownerId: data.owner || null,
        petId: data.pet || null,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );



    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.booking.getTableName(),
        belongsToColumn: 'photos',
        belongsToId: record.id,
      },
      data.photos,
      options,
    );
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.booking.getTableName(),
        belongsToColumn: 'receipt',
        belongsToId: record.id,
      },
      data.receipt,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let record = await options.database.booking.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [
      {
        model: options.database.user,
        as: 'owner',
      },
      {
        model: options.database.pet,
        as: 'pet',
      },
    ];

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const record = await options.database.booking.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        include,
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(record, options);
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    const where = {
      id: {
        [Op.in]: ids,
      },
      tenantId: currentTenant.id,
    };

    const records = await options.database.booking.findAll(
      {
        attributes: ['id'],
        where,
      },
    );

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    return options.database.booking.count(
      {
        where: {
          ...filter,
          tenantId: tenant.id,
        },
        transaction,
      },
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [];
    let include = [
      {
        model: options.database.user,
        as: 'owner',
      },
      {
        model: options.database.pet,
        as: 'pet',
      },      
    ];

    whereAnd.push({
      tenantId: tenant.id,
    });

    if (filter) {
      if (filter.id) {
        whereAnd.push({
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        });
      }

      if (filter.owner) {
        whereAnd.push({
          ['ownerId']: SequelizeFilterUtils.uuid(
            filter.owner,
          ),
        });
      }

      if (filter.pet) {
        whereAnd.push({
          ['petId']: SequelizeFilterUtils.uuid(
            filter.pet,
          ),
        });
      }

      if (filter.arrivalRange) {
        const [start, end] = filter.arrivalRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            arrival: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            arrival: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.departureRange) {
        const [start, end] = filter.departureRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            departure: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            departure: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.status) {
        whereAnd.push({
          status: filter.status,
        });
      }

      if (filter.feeRange) {
        const [start, end] = filter.feeRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            fee: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            fee: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.lte]: end,
            },
          });
        }
      }
    }

    const where = { [Op.and]: whereAnd };

    let {
      rows,
      count,
    } = await options.database.booking.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, options: IRepositoryOptions) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [{
      tenantId: tenant.id,
    }];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query) },

        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.booking.findAll(
      {
        attributes: ['id', 'id'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['id', 'ASC']],
      },
    );

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

  static async _createAuditLog(
    action,
    record,
    data,
    options: IRepositoryOptions,
  ) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
        photos: data.photos,
        receipt: data.receipt,
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'booking',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(record, options: IRepositoryOptions) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    output.owner = UserRepository.cleanupForRelationships(output.owner);

    output.photos = await FileRepository.fillDownloadUrl(
      await record.getPhotos({
        transaction,
      }),
    );

    output.receipt = await FileRepository.fillDownloadUrl(
      await record.getReceipt({
        transaction,
      }),
    );

    return output;
  }
}

export default BookingRepository;
