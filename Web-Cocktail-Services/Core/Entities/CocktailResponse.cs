using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Web_Cocktail_Services.Core.Entities
{
    public class CocktailResponse
    {
        [JsonPropertyName("drinks")]
        public List<Bebidas> Bebidas { get; set; }
    }

    public class Bebidas
    {
        [JsonPropertyName("idDrink")]
        public string IdDrink { get; set; }

        [JsonPropertyName("strDrink")]
        public string StrDrink { get; set; }

        [JsonPropertyName("strGlass")]
        public string Vidrio { get; set; }

        [JsonPropertyName("strDrinkThumb")]
        public string Image { get; set; }

        [JsonPropertyName("strCategory")]
        public string Category { get; set; }

        [JsonPropertyName("strInstructions")]
        public string Instrucciones { get; set; }
    }
}
