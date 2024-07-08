using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    [HttpPost]
    public ActionResult Save([FromForm] String uuid,[FromForm] ShopList shopList){
        
        Console.WriteLine(shopList.Title);
        
        var userDir = Path.Combine(webRootPath,uuid);
        var userDbFile = Path.Combine(userDir,templateDbFile);
        if (!System.IO.File.Exists(userDbFile)){
            return new JsonResult(new {success=false,error="The supplied UUID is not valid."});
        }
        
        try{
            ShopListContext slc = new ShopListContext(userDbFile);
            // id = 0 indicates a new shopList
            if (shopList.Id == 0){
                slc.Add(shopList);
            }
            slc.SaveChanges();
            
        }
        catch (Exception ex){
            // It's possible that the user has attempted to save an Entry
            // but has never registered the UUID they see in their text box.
            return new JsonResult(new {success=false,error=$"{ex.Message}"});
        }

        return new JsonResult(new {success=true,shopList=shopList});
    }

    public IQueryable<UuidInfo> GetUuids(DbContext dbcontext)
    {
        return dbcontext.Set<UuidInfo>();    
    }
}