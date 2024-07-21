using Microsoft.AspNetCore.SignalR;

namespace shoplist.Hubs
{
    public class ItemHub : Hub
    {
        public async Task SendItem(string user, string listName)
        {
            await Clients.Others.SendAsync("ReceiveMessage", user, listName);
        }

        public async Task SendCompletedItem(string user, string listName, string itemId,bool isCompleted){
            // yes it's weird but itemId comes across as as string
            // and is used as a string
            await Clients.Others.SendAsync("SetItemCompleted", user, listName, itemId, isCompleted);
        }
    }
}