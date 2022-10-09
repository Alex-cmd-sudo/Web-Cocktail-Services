using Web_Cocktail_Services.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Web_Cocktail_Services.Models;
using Web_Cocktail_Services.Repository;

namespace Web_Cocktail_Services.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IClientService _client;

        public HomeController(ILogger<HomeController> logger, IClientService client)
        {
            _logger = logger;
            _client = client;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("ByName/{name}")]
        public async Task<JsonResult> ByName(string name)
        {
            CocktailResponse result = new CocktailResponse();

            try
            {
                result = await _client.GetBebidasByName(name);


            }
            catch (Exception)
            {
            }
            return Json(result);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
