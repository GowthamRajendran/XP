using SignalR.Hubs;

namespace Mvc3SignalR.Models
{
    public class TicketHub : Hub
    {
        static int TotalTickets = 10;

        public int GetTicketCount()
        {
            return 10; // Clients.updateTicketCount(TotalTickets);
        }

        public void BuyTicket()
        {
            if (TotalTickets > 0)
                TotalTickets -= 1;
            Clients.updateTicketCount(TotalTickets);
        }
    }

    public class TestHub : Hub
    {
        static int TotalTickets = 10;

        public void GetTicketCount()
        {
            Clients.updateTicketCount(TotalTickets);
        }

        public void BuyTicket()
        {
            if (TotalTickets > 0)
                TotalTickets -= 1;
            Clients.updateTicketCount(TotalTickets);
        }
    }
}
