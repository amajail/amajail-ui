export declare function amountsHidden(): boolean;
export declare function setAmountsHidden(hidden: boolean): void;
export declare function maskedMoney(currency?: string): string;
export declare function bindPrivacyToggle(
  button: Element | null,
  options?: { reloadOnToggle?: boolean },
): void;
