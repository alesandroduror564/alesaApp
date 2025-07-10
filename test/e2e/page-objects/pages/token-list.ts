import { Driver } from '../../webdriver/driver';

class TokenList {
  protected readonly driver: Driver;

  protected readonly selectors = {
    tokenName: '[data-testid="multichain-token-list-item-token-name"]',
    tokenValue: '[data-testid="multichain-token-list-item-value"]',
    tokenSecondaryValue: '[data-testid="multichain-token-list-item-secondary-value"]',
  };

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async checkTokenBalanceWithName(tokenListItemValue: string) {
    await this.driver.waitForSelector({
      css: this.selectors.tokenValue,
      text: tokenListItemValue,
    });
  }

  async checkTokenMarketValue(tokenListItemSecondaryValue: string) {
    await this.driver.waitForSelector({
      css: this.selectors.tokenSecondaryValue,
      text: tokenListItemSecondaryValue,
    });
  }

  async checkTokenName(tokenName: string) {
    await this.driver.waitForSelector({
      css: this.selectors.tokenName,
      text: tokenName,
    });
  }
}

export default TokenList;
