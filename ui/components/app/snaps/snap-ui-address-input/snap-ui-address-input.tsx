import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import {
  CaipAccountId,
  CaipChainId,
  isCaipAccountId,
  parseCaipAccountId,
  parseCaipChainId,
} from '@alesaapp/utils';
import {
  Box,
  FormTextField,
  FormTextFieldProps,
  FormTextFieldSize,
  HelpText,
  HelpTextSeverity,
  Icon,
  IconName,
  Label,
  Text
} from '../../../component-library';
import { useSnapInterfaceContext } from '../../../../contexts/snaps';
import {
   AlignItems, BackgroundColor, BorderColor, BorderRadius, Display, FlexDirection, FontWeight, IconColor, TextVariant 
} from '../../../../helpers/constants/design-system';
import { SnapUIAvatar } from '../snap-ui-avatar';
import { useDisplayName } from '../../../../hooks/snaps/useDisplayName';

type MatchedAccountInfoProps = {
    value: string;
    chainId: CaipChainId;
    displayName: string;
    label?: string;
    displayAvatar?: boolean;
    handleClear: () => void;
    disabled?: boolean;
    error?: string;
};

const MatchedAccountInfo: FunctionComponent<MatchedAccountInfoProps> = ({
   label, displayAvatar, chainId, value, displayName, handleClear, disabled , error
}) => (
   <Box display={Display.Flex} flexDirection={FlexDirection.Column}>
      {label && <Label className="mm-form-text-field__label">{label}</Label>}
      <Box
         display={Display.Flex}
         backgroundColor={BackgroundColor.backgroundDefault}
         className="snap-ui-renderer__matched-account-info"
         alignItems={AlignItems.center}
         borderWidth={1}
         borderRadius={BorderRadius.LG}
         borderColor={BorderColor.borderMuted}
         paddingLeft={4}
         paddingRight={4}
         gap={2}
         style={{ height:'48px', opacity: disabled ? .5 :1 , cursor : disabled ? 'not-allowed' : 'auto' }}
      >
        {displayAvatar && <SnapUIAvatar address={`${chainId}:${value}`} size="sm" />}
        <Box display={Display.Flex} alignItems={AlignItems.center} gap ={2} style={{flex:1,minWidth:0}}>
          <Box flexDirection= {FlexDirection.Column} gap ={2} style={{minWidth :0 , flex :1}}>
            <Text fontWeight= {FontWeight.Medium}>{displayName}</Text>
            <Text variant= {TextVariant.bodyXs} ellipsis>{value}</Text>
          </Box>
        </Box>
        <Icon 
          className="snap-ui-renderer__matched-account-info__clear-button"
          onClick = {handleClear}
          name = {IconName.Close }
          color= {IconColor.infoDefault }
          style={{cursor : disabled ? 'not-allowed': 'pointer', flexShrink :0}}
        />
      </Box>
      {!!error && (
        <HelpText severity= {HelpTextSeverity.Danger } marginTop ={1}>
           {error}
        </HelpText>
      )}
   </Box>  
);

export type SnapUIAddressInputProps = {
   name:string; 
   form?:string; 
   label?:string; 
   chainId: CaipChainId; 
   displayAvatar?:boolean; 
   error?:string; 
   disabled? :boolean ;
};

export const SnapUIAddressInput:
FunctionComponent<SnapUIAddressInputProps & FormTextFieldProps<'div'>> =
({
 name , form , label ,
 chainId ,
 displayAvatar = true ,
 error ,
disabled ,
...props }) => {

const inputRef = useRef<HTMLDivElement>(null);
const {
 handleInputChange,getValue,focusedInput,setCurrentFocusedInput
}=useSnapInterfaceContext();

const initialValue = getValue(name , form) as string;

const{namespace , reference}= parseCaipChainId(chainId);

const getParsedValue =(value ?:string) =>
!value? '' :
isCaipAccountId(value)
? parseCaipAccountId(value as CaipAccountId).address :
value;

const [value,setValue] =useState(getParsedValue(initialValue));

const displayName=useDisplayName({address:value ,chain:{namespace ,reference},chainid:chainid});

useEffect(() =>{
 if (initialValue!= null){
 setValue(getParsedValue(initialValue));
 }
},[initialValue]);

useEffect(() =>{
 if(inputRef.current && focusedInput ===name){
 (inputRef.current.querySelector('input') as HTMLInputElement)?.focus();
 }
},[focusedInput]);

function handleChange(e :ChangeEvent<HTMLInputElement>) {
 setValue(e.target.value);
 const newVal=e.target.value ? `${chainid}:${e.target.value}` :''
 handleInputChange(name,newVal ,form);
}

function handleFocus(){setCurrentFocusedInput(name);}
function handleBlur(){setCurrentFocusedInput(null);}

function handleClear(){
 if(!disabled){
 setValue('');
handleInputChange(name,'',form);
 }
}

if(displayname){
 return(
<MatchedAccountInfo
 chainid ={chainid }
 label ={label }
 value ={value }
displayavatar ={displayavatar ?? false /* fallback */}
// eslint-disable-next-line react/jsx-handler-names
handleclear ={handleClear}
/* pass props */
disabled ={disabled ?? false /* fallback */}
error ={error}
/>);
}

return(
<Formtextfield ref= inputref onFocus=handleFocus onBlur=handleBlur id=name value=value onChange=handlechange label=label disabled=disabled error={
Boolean(error)} size={
Formtextfieldsize.Lg } helptext={
error??'' } textfieldprops={{
borderRadius:borderRadius.LG}} startAccessory=
{displayavatar&& value&& iscaipayaccountid(`${chainid}:${value}`)?(
<Snapuiavatar address={`${chainid}:${value}`} size='sm'/>
):null

}

endAccessory=
{
 value?(<icon classname='snap-ui-renderer__address-input_clear-button'
onClick={()=>!disabled&&handleclear()}
name={
iconname.close

}

color={
iconcolor.infodefault

}

/>):null


}


/>

);



};
