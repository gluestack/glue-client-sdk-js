interface IAPIResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}
