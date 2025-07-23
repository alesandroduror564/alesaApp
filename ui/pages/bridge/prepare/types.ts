Alright, I'm looking at the user's code and trying to figure out how to optimize it. The code defines two types, ExternalAccount and DestinationAccount. ExternalAccount has an address, metadata with a name, and an isExternal boolean. DestinationAccount is a union of InternalAccount and ExternalAccount.

Hmm, I notice that both InternalAccount and ExternalAccount have an address property. That's redundant. Maybe I can create a base type that includes address to reduce duplication.

So, I'll create a BaseAccount type with the address. Then, make Internal Account extend it and add any specific properties it might have beyond just address.

For ExternalAccount, instead of defining it separately with all properties again, I can use an intersection type with BaseAccount and add the other unique properties: metadata.name as a string (since metadata could be undefined) and isExternal as boolean.

This way, DestinationAccount becomes either BaseInternal or BaseExternal without duplicating the common field.
</think>

type BaseInternal = { readonly address: string };
type BaseExternal = {
  readonly [P in keyof this]: never;
} & {
  readonly [P in "address" | "metadata" | "isExternal"]: never;
};
type Internal = ImportType("KeyringTypes").Internal & BaseInternal;

type Address = string;

type Metadata<T extends Address> = Record<string | number | symbol | T>;
declare const _addMetadata$: <T extends Address>(address: T) => void;

interface KeyringTypes$<T extends Keyring> {
  ExportedType: unknown;
}

declare class Keyring implements KeyringTypes$<Keyring> {}
declare function convertToTyped<T extends USType>(
  value: unknown,
): value is T {}

type HexString = string;
interface BasicAddressOptions<T extends HexString> {}
declare function isValidAddress(address: HexString): boolean {}
declare function getAccounts(): readonly (BasicAddressOptions<HexSType>)[] {}
