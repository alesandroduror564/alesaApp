import { strict as assert } from 'assert';
import FixtureBuilder from '../../fixture-builder';
import { WINDOW_TITLES, withFixtures } from '../../helpers';
import TestDapp from '../../page-objects/pages/test-dapp';
import { loginWithoutBalanceValidation } from '../../page-objects/flows/login.flow';
import { switchToNetworkFlow } from '../../page-objects/flows/network.flow';

describe('Request Queueing', function () {
  it('should keep subscription on dapp network when switching different mm network', async function () {
    const port = 8546;
    const chainId = 1338;
    await withFixtures(
      {
        dapp: true,
        fixtures: new FixtureBuilder().withNetworkControllerDoubleNode().build(),
        localNodeOptions: [
          { type: 'anvil' },
          { type: 'anvil', options: { port, chainId } },
        ],
        title: this.test?.fullTitle(),
      },
      async ({ driver, localNodes }) => {
        await loginWithoutBalanceValidation(driver);

        const testDapp = new TestDapp(driver);
        await testDapp.openTestDappPage();
        await testDapp.check_pageIsLoaded();
        await testDapp.connectAccount({});
        await driver.switchToWindowWithTitle(WINDOW_TITLES.TestDApp);

        const subscribeRequest = JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_subscribe',
          params: ['newHeads'],
        });

        await driver.executeScript(`return window.ethereum.request(${subscribeRequest})`);

        await driver.executeScript(`
          window.messages = [];
          window.ethereum.on('message', (message) => {
            if (message.type === 'eth_subscription') window.messages.push(message.data.result);
          });
        `);

        await driver.switchToWindowWithTitle(WINDOW_TITLES.ExtensionInFullScreenView);
        
				await switchToNetworkFlow(driver, 'Localhost 8546');

				await driver.switchToWindowWithTitle(WINDOW_TITLES.TestDApp);

				const messagesBeforeMining = await driver.executeScript('return window.messages;');

				await localNodes[0].mineBlock();

				await driver.delay(5000);

				const messagesAfterMining = await driver.executeScript('return window.messages;');

				assert.ok(messagesBeforeMining.length < messagesAfterMining.length);
			},
		);
	});
});
