using Microsoft.AspNetCore.SignalR;

namespace shoplist.Hubs
{
    public class ItemHub : Hub
    {
        public async Task SendItem(string user, string message)
        {
            await Clients.Others.SendAsync("ReceiveMessage", user, message);
        }
    }
}