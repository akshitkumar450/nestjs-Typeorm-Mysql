import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  milaage: string;

  @Expose()
  approved: boolean;

  // add new property to show
  // obj is the original report entity
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
