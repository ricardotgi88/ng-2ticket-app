// https://api.dev.2ticket.pt/customers/options/basic/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba
export interface CustomerOptions {
  newMemberStatus: string;
  photoRatio: number | null;
  defaultEventBannerFilename: string;
  participantId: number;
  privacyUrl: string;
  conditionsUrl: string;

  widgetRequiresAuth: boolean;
  widgetAllowSocials: boolean;
  widgetAllowSignup: boolean;
  widgetCardAssociatedText: string;
  widgetOnlineMembers: boolean;

  mbWayWaitTime: number;
  mbRefWaitTime: number;
  cardsWaitTime: number;
  paypalWaitTime: number;
  stripeWaitTime: number;

  widgetPrimaryColor: string;
  widgetSecondaryColor: string;
  widgetVersion: string;

  ticketPaymentProvider: string;

  ticketPaymentIfThenMBWayActive: boolean;
  ticketPaymentIfThenMBWayFeeFixedValue: number;
  ticketPaymentIfThenMBWayFeePercentage: number;

  ticketPaymentIfThenMBRefActive: boolean;
  ticketPaymentIfThenMBRefFeeFixedValue: number;
  ticketPaymentIfThenMBRefFeePercentage: number;

  ticketPaymentIfThenCCardActive: boolean;
  ticketPaymentIfThenCCardFeeFixedValue: number;
  ticketPaymentIfThenCCardFeePercentage: number;

  ticketPaymentPaypalActive: boolean;
  ticketPaymentPaypalFeeFixedValue: number;
  ticketPaymentPaypalFeePercentage: number;

  ticketPaymentStripeActive: boolean;
  ticketPaymentStripeFeeFixedValue: number;
  ticketPaymentStripeFeePercentage: number;

  ticketPaymentEasypayActive: boolean;
  ticketPaymentEasypayFeeFixedValue: number;
  ticketPaymentEasypayFeePercentage: number;

  ticketPaymentSIBSMBWayActive: boolean;
  ticketPaymentSIBSMBWayFeeFixedValue: number;
  ticketPaymentSIBSMBWayFeePercentage: number;

  ticketPaymentSIBSMBRefActive: boolean;
  ticketPaymentSIBSMBRefFeeFixedValue: number;
  ticketPaymentSIBSMBRefFeePercentage: number;

  ticketPaymentSIBSCardsActive: boolean;
  ticketPaymentSIBSCardsFeeFixedValue: number;
  ticketPaymentSIBSCardsFeePercentage: number;

  ticketPaymentMaxFee: number;

  quotaPaymentWaitTime: number;
  quotaPaymentProvider: string;

  quotaPaymentIfThenMBWayActive: boolean;
  quotaPaymentIfThenMBWayFeeFixedValue: number;
  quotaPaymentIfThenMBWayFeePercentage: number;

  quotaPaymentIfThenMBRefActive: boolean;
  quotaPaymentIfThenMBRefFeeFixedValue: number;
  quotaPaymentIfThenMBRefFeePercentage: number;

  quotaPaymentPaypalActive: boolean;
  quotaPaymentStripeActive: boolean;

  quotaPaymentEasypayActive: boolean;
  quotaPaymentEasypayFeeFixedValue: number;
  quotaPaymentEasypayFeePercentage: number;

  quotaPaymentSIBSMBWayActive: boolean;
  quotaPaymentSIBSMBWayFeeFixedValue: number;
  quotaPaymentSIBSMBWayFeePercentage: number;

  quotaPaymentSIBSMBRefActive: boolean;
  quotaPaymentSIBSMBRefFeeFixedValue: number;
  quotaPaymentSIBSMBRefFeePercentage: number;

  quotaPaymentSIBSCardsActive: boolean;
  quotaPaymentSIBSCardsFeeFixedValue: number;
  quotaPaymentSIBSCardsFeePercentage: number;

  quotaPaymentMaxFee: number;

  captivePaymentWaitTime: number;
  captivePaymentProvider: string;

  whatsappEnabled: boolean;

  minQuotasSignup: number;
  minQuotasSignupDaily: number | null;
  minQuotasSignupMonthly: number | null;
  minQuotasSignupTrimesterly: number | null;
  minQuotasSignupSemesterly: number | null;
  minQuotasSignupYearly: number;

  widgetInviteURI: string;
  widgetCartURI: string;
  widgetURI: string;

  widgetAllowPaymentRetry: boolean;
  marketingCheckbox: string;

  memberValidationType: string;
  countMemberCaptives: boolean;
  onlineTicketDownload: boolean;

  widgetAccessCodeLabel: string;
  widgetAccessCodeCheckLabel: string;
}
