interface IApiResponse<T> {
  status: string;
  message: string;
  statusCode: number;
  data?: T;
}
/**
 * Creates a success response object.a
 * @param statusCode - The HTTP status code.
 * @param message - The success message.
 * @param data - Optional data to include in the response.
 * @returns An object representing the success response.
 */
const success = <T>(
  message: string,
  statusCode: number,
  data?: T
): IApiResponse<T> => ({
  status: "success",
  message,
  statusCode,
  data,
});

export { success };
