import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Latihan } from './latihan.entity';
import { Like, Repository } from 'typeorm';
import { ResponseSuccess } from 'src/utils/interface.response';

@Injectable()
export class LatihanService {
  constructor(
    @InjectRepository(Latihan)
    private readonly latihanRepository: Repository<Latihan>,
  ) {}

  async deleteLatihan(id: number): Promise<ResponseSuccess> {
    const res = await this.latihanRepository.delete(id);

    if (!res.affected) {
      throw new NotFoundException(`Produk dengan id ${id} tidak di temukan`);
    }

    return {
      status: 'Success',
      message: 'DELETE berhasil',
      data: res,
    };
  }

  async createLatihan(payload: any): Promise<ResponseSuccess> {
    try {
      const res = await this.latihanRepository.save({
        title: payload.title,
        name: payload.name,
        umur: payload.umur,
        alamat: payload.alamat,
        hobi: payload.hobi,
        pekerjaan: payload.pekerjaan,
        kelas: payload.kelas,
        status: payload.status,
      });

     

      return {
        status: 'Success',
        message: 'Berhasil menambahkan',
        data: res,
      };
    } catch (err) {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async getLatihan(query): Promise<ResponseSuccess> {
    const {
      title,
      name,
      kelas,
      alamat,
      umur,
      pekerjaan,
      hobi,
      status,
      keyword,
    } = query;

    const filterQuery: any = {};
    const keywordQuery: any = [];

    if (keyword) {
      keywordQuery.push(
        {
          title: Like(`%${keyword}%`),
        },
        {
          name: Like(`%${keyword}%`),
        },
        {
          kelas: Like(`%${keyword}%`),
        },
        {
          alamat: Like(`%${keyword}%`),
        },
        {
          umur: Like(`%${keyword}%`),
        },
        {
          pekerjaan: Like(`%${keyword}%`),
        },
        {
          hobi: Like(`%${keyword}%`),
        },
        {
          status: Like(`%${keyword}%`),
        },
      );
    }

    if (title) {
      filterQuery.title = Like(`%${title}%`);
    }

    if (name) {
      filterQuery.name = Like(`%${name}%`);
    }

    if (kelas) {
      filterQuery.kelas = Like(`%${kelas}%`);
    }

    if (alamat) {
      filterQuery.alamat = Like(`%${alamat}%`);
    }

    if (umur) {
      filterQuery.umur = Like(`%${umur}%`);
    }

    if (pekerjaan) {
      filterQuery.pekerjaan = Like(`%${pekerjaan}%`);
    }

    if (hobi) {
      filterQuery.hobi = Like(`%${hobi}%`);
    }

    if (status) {
      filterQuery.status = Like(`%${status}%`);
    }

    const res = await this.latihanRepository.find({
      where: keyword ? keywordQuery : filterQuery,
    });

    return {
      status: 'Success',
      message: 'list',
      data: res,
    };
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const res = await this.latihanRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!res) {
      throw new NotFoundException(`Produk dengan id ${id} tidak di temukan`);
    }

    return {
      status: 'Success',
      message: 'list',
      data: res,
    };
  }

  async updateLatihan(id: number, payload: any): Promise<ResponseSuccess> {
    const update = await this.latihanRepository.update(
      {
        id: id,
      },
      {
        ...payload,
        updated_at: new Date(),
      },
    );

    const detail = await this.latihanRepository.findOne({
      where: {
        id,
      },
    });

    return {
      status: 'Success',
      message: 'UPDATE berhasil',
      data: detail,
    };
  }

  async createBulkLatihan(payload: any): Promise<any> {
    try {
      let berhasil = 0;
      let gagal = 0;

      await Promise.all(
        payload.data.map(async (item) => {
          try {
            await this.latihanRepository.save(item);
            berhasil = berhasil + 1;
          } catch (error) {
            gagal = berhasil + 1;
          }
        }),
      );

      return {
        statusCode: 'Success',
        message: `Data berhasil di tambahkan sebanyak ${berhasil}, dan data gagal sebanyak ${gagal}`,
      };
    } catch (err) {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }
}
