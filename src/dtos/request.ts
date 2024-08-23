import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export enum bool {
  TRUE = "true",
  FALSE = "false",
}

export enum yn {
  Y = "y",
  N = "n",
}

export class QueryParams {
  @Type(() => String)
  @IsOptional()
  @IsString()
  keyword?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  no_register?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  c_no_register?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  tahun_ajaran?: string = "";

  @Type(() => String)
  @IsOptional()
  @IsString()
  status?: string = "";

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  tingkat_kelas_id?: number = 0;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(10)
  @IsOptional()
  per_page?: number = 10;

  @IsOptional()
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  is_all_data?: boolean = false;

  @IsOptional()
  @IsEnum(yn)
  is_kerja_sama?: yn;

  @Type(() => String)
  @IsOptional()
  @IsString()
  order_by?: string;

  @IsOptional()
  @IsDateString()
  tgl_lahir?: Date;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  gedung_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  kota_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  sekolah_id?: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  status_bayar?: string;

  //   @Type(() => String)
  //   @IsOptional()
  //   @IsEnum(superapps_module)
  //   module?: superapps_module;

  //   @IsOptional()
  //   @IsBoolean()
  //   @Transform(({ obj, key }) => {
  //     return obj[key] === "true" ? true : obj[key] === "false" ? false : obj[key];
  //   })
  //   is_active?: boolean = true;

  //   @Type(() => String)
  //   @IsOptional()
  //   @IsString()
  //   kelas_ids?: string = "";

  //   @Type(() => String)
  //   @IsOptional()
  //   @IsString()
  //   gedung_ids?: string = "";

  //   constructor(
  //     keyword = "",
  //     page = 1,
  //     sort = SortOrder.DESC,
  //     order_by = "insert"
  //   ) {
  //     this.keyword = keyword;
  //     this.page = page;
  //     this.sort = sort;
  //     this.order_by = order_by;
  //   }
}
