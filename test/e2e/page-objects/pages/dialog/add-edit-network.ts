import { strict as assert } from 'assert';
import { Driver } from '../../../webdriver/driver';

class AddEditNetworkModal {
  private driver: Driver;

  private readonly selectors = {
    addExplorerUrlButton: { text: 'Add a block explorer URL', tag: 'button' },
    addExplorerUrlInput: { testId: 'explorer-url-input' },
    addExplorerUrlTitle: { text: 'Add a block explorer URL', tag: 'h4' },
    addRpcUrlButton: { text: 'Add RPC URL', tag: 'button' },
    chainIdInputField:
      '#network-form-chain-id',
    chainIdInputError:
      '[data-testid="network-form-chain-id-error"]',
    confirmAddExplorerUrlButton:
      { text:'Add URL', tag:'button'},
    currencySymbolInputField:
      '#nativeCurrency',
    currencySymbolWarning:
      '[data-testid="network-form-ticker-suggestion"]',
     editModalRpcDropDownButton:
       '[data-testid="test-add-rpc-drop-down"]',
     editModalSaveButton:{
       text:'Save',tag:'button'},
     explorerUrlInputDropDownButton:{
       testId:"test-explorer-drop-down"},
     networkNameInputField:{testId:"network-form-network-name"}
  };

  constructor(driver) {
   this.driver = driver;
 }

 async check_pageIsLoaded(): Promise<void> {
   try {
     await this.driver.waitForMultipleSelectors([
        this.selectors.networkNameInputField,
        this.selectors.editModalRpcDropDownButton,
        this.selectors.editModalSaveButton]);
   }
   catch(e) {
     console.log('Timeout while waiting for dialog to be loaded:', e);
     throw e;
   }
 }

 async check_chainIdIsEnabled(shouldBeEnabled=true): Promise<void>{
   const chainIdElement = await this.driver.findElement(this.selectors.chainId);
   assert.equal(await chainIdElement.isEnabled(), shouldBeEnabled, "Chain ID input field is not enabled.");
 }

 async fillTextFields(fieldSelector, value):Promise<void>{
 if(!fieldSelector.test){
 throw new Error(`Invalid field selector provided.`);
 }
 await this.driver.fill(fieldSelector, value);
}

async fillFormFields(formData):Promise<void>{
 for(const [fieldKey, value] of Object.entries(formData)){
 const fieldSelector=this[`selectors.${fieldKey}`];
 if(!fieldSelector){
 throw new Error(`Invalid form data key provided.`);
 }
 await fillTextFields.call(this, fieldSelector,value);
}
}

async openAndFillFormFormData(formData={}):Promise<void>{
await check_pageIsLoaded();
await fillFormFields.call(this.formData)
}

async saveChanges():Promise<void>{
console.log("Saving changes");
await driver.clickAndWaitToDisappear(this.editModalSaveButtons);

/** Additional functions can be added here as required */
export default AddEditNetworkModal;
