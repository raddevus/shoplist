using Microsoft.AspNetCore.Mvc;
using shoplist.Models;
using System.IO;

namespace shoplist.Controllers;

public class ShopListController : Controller
{
    private readonly ILogger<ShopListController> _logger;
    private string webRootPath;
    private string contentRootPath;
    private readonly IConfiguration _config;
    
    // templateDbFile is your sqlite3 db which contains
    // all of your tables for your custom solution.
    // The name is set in the appsettings.json file.
    // You can name it anything you like.  This db will
    // be copied to each user's "file workspace" in their wwwroot/<uuid> folder
    readonly string templateDbFile;

    public ShopListController(ILogger<ShopListController> logger, 
            IConfiguration _configuration,
            IWebHostEnvironment webHostEnvironment)
    {
        _logger = logger;
        templateDbFile = _configuration["templateDbFile"];
        Console.WriteLine($"content rootPath: {webHostEnvironment.WebRootPath}");
        webRootPath = webHostEnvironment.WebRootPath;
        contentRootPath = webHostEnvironment.ContentRootPath;
    }

    [HttpPost, HttpGet]
    public ActionResult GetAll([FromQuery] string uuid){
        var userDir = Path.Combine(webRootPath,uuid);
        var userDbFile = Path.Combine(userDir,templateDbFile);

        if (!System.IO.File.Exists(userDbFile)){
            return new JsonResult(new {result="No data"});
        }
        
        ShopListContext slc = new ShopListContext(userDbFile);

        var entries = slc.ShopList;
        
        List<ShopList> allItems = new List<ShopList>();

        foreach (ShopList sl in entries.AsParallel<ShopList>()){
            Console.WriteLine($"{sl.Id} : {sl.Title}");
            allItems.Add(sl);
        }

        return new JsonResult(allItems);
    }

}