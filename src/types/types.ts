export type TCodeList = {
  [key: string]: string
}

export type TPairs = [string, string][];

export type TRatio = {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
  success: boolean;
  timestamp: number;
};
