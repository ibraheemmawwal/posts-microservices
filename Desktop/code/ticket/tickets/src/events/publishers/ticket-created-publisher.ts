import { Publisher, Subjects, TicketCreatedEvent } from '@ibtickects/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
