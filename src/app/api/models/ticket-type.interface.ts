// https://api.dev.2ticket.pt/tickets/types/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba

export interface TicketType {
  id: number;
  name: string;
  name_es: string | null;
  name_en: string | null;
  color: string;
  validateQuota: boolean;
  validateAccess: boolean;
  isInvite: boolean;
  isUnavailable: boolean;
  kioskOnly: boolean;
  defaultType: boolean;
  categorySpecific: boolean;
  active: boolean;
  parentId: number | null;
  ticketTypeCategoryId: number | null;
  ticketTypeCategoryName: string | null;
}
