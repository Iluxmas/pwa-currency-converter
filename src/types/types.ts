interface IMessage {
  type: MessageType;
}

interface IMessageOther {
  type: MessageType.getCodes | MessageType.updateRates;
}

interface IMessageGetCurrency extends IMessage {
  type: MessageType.getRate;
  value: string;
}

export type TAllMessage = IMessageGetCurrency | IMessageOther;

export enum MessageType {
  getRate = 'getRate',
  getCodes = 'getCodes',
  updateRates = 'updateRates',
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
