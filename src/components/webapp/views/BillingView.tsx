import React from 'react';
import { SubscriptionsPage } from '../../../pages/SubscriptionsPage';

interface BillingViewProps {
  onOpenUpgradeModal?: () => void;
}

export const BillingView: React.FC<BillingViewProps> = () => {
  return <SubscriptionsPage />;
};

export default BillingView;
