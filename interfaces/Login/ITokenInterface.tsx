export default interface ITokenInterface {
    accessToken: string | null;
    refreshToken: string | null;
    success?: boolean;
  }