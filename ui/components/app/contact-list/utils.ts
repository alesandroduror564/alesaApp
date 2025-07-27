import { AddressBookEntry } from '@alesaapp/address-book-controller';
import { InternalAccount } from '@alesaapp/keyring-internal-api';

export const buildDuplicateContactMap = (
  addressBook: AddressBookEntry[],
  internalAccounts: InternalAccount[],
) => {
  const contactMap = new Map(
    internalAccounts.map((account) => [
      account.metadata.name.trim().toLowerCase(),
      [`account-id-${account.id}`],
    ]),
  );

  addressBook.forEach((entry) => {
    const { name, address } = entry;
    const sanitizedName = name.trim().toLowerCase();
    contactMap.set(sanitizedName, (contactMap.get(sanitizedName) || []).concat(address));
  });

  return contactMap;
};

export const hasDuplicateContacts = (
  addressBook: AddressBookEntry[],
  internalAccounts: InternalAccount[],
) => {
  const uniqueContactNames = new Set(addressBook.map(entry => entry.name.toLowerCase().trim()));
  
  return (
    uniqueContactNames.size !== addressBook.length ||
    internalAccounts.some(account =>
      uniqueContactNames.has(account.metadata.name.toLowerCase().trim())
    )
  );
};

export const isDuplicateContact = (
  addressBook: AddressBookEntry[],
  internalAccounts: InternalAccount[],
  newName: string,
) => {
  return (
    addressBook.some(entry => entry.name.toLowerCase().trim() === newName.toLowerCase().trim()) ||
    internalAccounts.some(account =>
      account.metadata.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )
   );
};
