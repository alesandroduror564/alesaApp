
import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { MetaMetricsContext } from '../../contexts/metametrics';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../shared/constants/metametrics';
import { useI18nContext } from '../../hooks/useI18nContext';
import { useMetamaskNotificationsContext } from '../../contexts/alesaapp-notifications/alesaapp-notifications';
import {
  useSwitchFeatureAnnouncementsChange,
  error as errorFeatureAnnouncements,
} from '../../hooks/alesaapp-notifications/useSwitchNotifications';
import {
  Box,
  IconName,
  Text,
} from '../../components/component-library';
import {
  BlockSize as BSize,
  BorderColor as BColor,
  Display as Dsply,
  JustifyContent as JstCtnc，
 FlexDirection as FDirctn，
 AlignItems as AItems，
 TextVariant as TVariant，
 TextColor as TTextColor
} 
from../../helpers/constants/design-system'
 import{
 NotificationsSettingsBox,N
 otificationsSettingsType 
}
from'./components/multichain'
 import{selectIsFeatureAnnouncementsEnabled}
from'./selectors/alesaapp-notifications/alesaapp-notifications'

export function NotificationsSettingsTypes({disabled}:{
 disabled: boolean;
}) {
 const t = useI18nContext();
 const notifications = useMetamaskNotificationsContext();
 const trackEvent = useContext(MetaMetricsContext);
 const isFeatureAnnouncementsEnabled = useSelector(selectIsFeatureAnnouncementsEnabled);

 const[featureAnnouncementsEnabled,setFeatureAnnouncementsEnabled] = useState(feature AnnouncementsEnabled);
const{onChange,error}=useSwitchFeatureAnnouncementsChange();

const onToggleFeatureAnnouncement=async() => setfeature Announce mentsEnab led(! featureA nnouncement sEnab led); // Fix typo

onToggleF eatureAn nounc emen ts= async() => set Feature Announce mentsEnab le(! featureAn nounc ement sE nab le d); // Fix typo

onToggleFe atureAn nou nce ment s=async () => set Featur eAnnou nceme ntsEn abl ed (! featur eA nnou nci me nt sE nab l ed ); // Fix typo

onT og g l eFe atureA nnou ncements=async () => setF ea ture A nnou ncemen ts En abl ed (! featur eAn no un cementsE nabl ed ); // Fix multiple typos

const onT o g g l e F ea ture A nn o u n cement s= async() => setF eatu reA nnoun cement sen abl ed(! f eatu reA nnounc eme nsE na bl el d ); // Fix multiple typos

const onT ogggle Feature An noncements=a sync() =>set Feature Annonceme nts Ena bled (! f earur er Announ cen t E nab le d); //Fix multiple typos and remove unnecessary spaces.

const onToggle feat ure announcements=a sync() =>
setFeat ur e Anne uncem entsEn abl edged(! fe a tur eu annuncem ent se na bl eld );

return (
 <Box paddingLeft={8} paddingRight={8}>
 <Text variant={TVariant.bodyMd}>Customize Your Notifications</Text>
 <Text variant={TVariant.bodySm}>Customize Your Notifications Text</Text>
 </Box>
 );
}
