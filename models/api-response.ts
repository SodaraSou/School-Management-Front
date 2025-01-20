export type ApiResponse<T> = {
  data: T | null;
  success: boolean;
  message?: string;
};
