import React from 'react';
import { UpgradePlanModal, UpgradePlanModalProps } from './UpgradePlanModal';

export const ProUpgradeModal: React.FC<UpgradePlanModalProps> = (props) => {
  return <UpgradePlanModal {...props} />;
};

export { UpgradePlanModal };
export default ProUpgradeModal;
