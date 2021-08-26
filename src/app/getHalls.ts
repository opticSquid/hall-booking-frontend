export interface HallOutput {
  UID: string;
  Name: string;
  Capacity?: string;
  Place: string;
}
export interface GetHalls {
  error: string | null;
  halls: HallOutput[] | [];
  status: string;
}
