import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getWeightedPermissions } from '../../../helpers/utils/permission';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { getSnapsMetadata } from '../../../selectors';
import { getSnapName } from '../../../helpers/utils/util';
import PermissionCell from '../permission-cell';

function PermissionsConnectPermissionList({
  isRequestApprovalPermittedChains,
  permissions,
  subjectName,
  accounts = [],
  requestedChainIds = [],
}) {
  const t = useI18nContext();
  const snapsMetadata = useSelector(getSnapsMetadata);

  return (
    <>
      {getWeightedPermissions({
        t,
        isRequestApprovalPermittedChains,
        permissions,
        getSubjectName: () => getSnapName(snapsMetadata),
        subjectName,
      }).map((permission, index) => (
        <PermissionCell
          key={`${permission.permissionName}-${index}`}
          permissionName={permission.name}
          title={permission.label}
          description={permission.description}
          weight={permission.weight}
          avatarIcon={permission.leftIcon}
          accounts={accounts}
          chainIds={requestedChainIds}
        />
      ))}
    </>
  );
}

PermissionsConnectPermissionList.propTypes = {
  permissions: PropTypes.object.isRequired,
  subjectName: PropTypes.string.isRequired,
  requestedChainIds: PropTypes.arrayOf(PropTypes.string),
  accounts: PropTypes.arrayOf(PropTypes.object),
};
```
*Note: Removed `Box` and `isRequestApprovalPermittedChains` type since it should be a bool (not boolean), but if not used as a prop, consider removing or correcting the prop type. If you need to keep Box, add import and wrap as needed.*
