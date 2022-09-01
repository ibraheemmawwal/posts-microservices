import { Publisher, Subjects, TicketUpdatedEvent } from '@ibtickects/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
